'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useState } from 'react';

export default function DesignProjectForm() {

  const [frontImgPreview, setFrontImgPreview] = useState<string | null>(null);
  const [variationPreviews, setVariationPreviews] = useState<string[]>([]);

  const { register, control, handleSubmit, reset, watch, setValue, } = useForm<{
    title: string;
    description: string;
    frontimg: FileList;
    frontimgalt: string;
    style: string;
    location: string;
    budget: number;
    slug: string;
    variations: { image: string; price: number;variationtitle: string }[];
  }>({
    defaultValues: {
      title: '',
      description: '',
      frontimgalt: '',
      style: '',
      location: '',
      budget: 0,
      slug: '',
      variations: [],
    },
  });

  const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
    control,
    name: 'variations',
  });
  const title = watch('title'); // 👀 Watch the title field

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const onSubmit = async (data: any) => {
    try {
      const frontimgFile = data.frontimg[0];
      const frontimgBase64 = await toBase64(frontimgFile);
      const variationImages = await Promise.all(
        variationFields.map((_, i) => {
          const input = document.getElementById(`variation-image-${i}`) as HTMLInputElement;
          return input?.files?.[0] ? toBase64(input.files[0]) : Promise.resolve('');
        })
      );

      const variationsWithImages = data.variations.map((variation: any, index: number) => ({
        ...variation,
        image: variationImages[index],
      }));

      const payload = {
        ...data,
        frontimg: frontimgBase64,
        // images: imageBase64s,
        variations: variationsWithImages,
      };
      const res = await fetch('/api/design-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Project submitted!');
        reset();
      } else {
        alert('Something went wrong.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Create Design Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <label className='font-bold text-xl'> Title</label>
          <input {...register('title')} placeholder="Title" className="w-full border p-2" />

          <label className='font-bold text-xl'>Description</label>
          <textarea {...register('description')} placeholder="Description" className="w-full border p-2" />

          <label className='font-bold text-xl'>Front Image:</label>
          <input
            type="file"
            {...register('frontimg')}
            accept="image/*"
            className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFrontImgPreview(URL.createObjectURL(file));
                setValue('frontimgalt', `${title} main image`);
              }
            }}
          />
          {frontImgPreview &&
            <div className="flex gap-2 mt-3 flex-wrap">
              <img src={frontImgPreview} alt="Front Preview" className="w-24 h-24 object-cover rounded-md border" />
            </div>
          }
          <input {...register('style')} placeholder="Style" className="w-full border p-2" />
          <input {...register('location')} placeholder="Location" className="w-full border p-2" />
          <input type="number" {...register('budget')} placeholder="Budget" className="w-full border p-2" />
          <label className='font-bold text-xl'>Variations : </label>
          {variationFields.map((field, index) => (
            <div key={field.id} className="border p-2 space-y-2">
              <input
                type="file"
                accept="image/*"
                id={`variation-image-${index}`}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const updated = [...variationPreviews];
                    updated[index] = URL.createObjectURL(file);
                    setVariationPreviews(updated);
                  }
                }}
              />
              {variationPreviews[index] &&
                <div className="flex gap-2 mt-3 flex-wrap">
                  <img src={variationPreviews[index]} alt="Variation Preview" className="w-24 h-24 object-cover rounded-md border" />
                </div>
              }
              <input type="number" {...register(`variations.${index}.price`)} placeholder="Price" className="w-full border p-2" />
              <input {...register(`variations.${index}.variationtitle`)} placeholder="Variation Title" className="w-full border p-2" />
              <button type="button" onClick={() => removeVariation(index)}>Remove Variation</button>
            </div>
          ))}
          <button className="font-bold text-blue-600 px-2 py-2 rounded" type="button" onClick={() => appendVariation({ image: '', price: 0, variationtitle: '' })}>
            + Add Variation
          </button>

          <br />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </main>
  );
}

