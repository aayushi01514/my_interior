'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function UpdateProjectPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [project, setProject] = useState({
    title: '',
    slug: '',
    style: '',
    budget: 0,
    frontimg: '',
    frontimgalt: '',
    location: '',
    variations: [],
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [variations, setVariations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/design-project/${id}`);
        const data = await res.json();
        setProject(data);
        setPreviewUrl(data.frontimg);
        setVariations(data.variations || []);
      } catch (err) {
        console.error('Failed to fetch project:', err);
      }
    }
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      const slugified = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setProject(prev => ({
        ...prev,
        title: value,
        slug: slugified,
      }));
    } else {
      setProject(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const base64 = await toBase64(file);
      setPreviewUrl(base64 as string);
      setProject(prev => ({ ...prev, frontimg: base64 as string }));
    }
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const handleVariationChange = (index: number, field: string, value: string | number) => {
    const updated = [...variations];
    updated[index][field] = value;
    setVariations(updated);
  };

  const handleVariationImageChange = async (index: number, file: File) => {
    const base64 = await toBase64(file);
    const updated = [...variations];
    updated[index].image = base64;
    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([...variations, { image: '', price: 0, variationtitle: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProject = {
        ...project,
        variations,
      };

      await axios.put(`/api/design-project/${id}`, updatedProject);
      alert('✅ Project updated successfully');
      router.push('/admin/projects');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update project');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={project.title} onChange={handleChange} placeholder="Title" className="w-full border p-2" required />
        <input name="slug" value={project.slug} onChange={handleChange} placeholder="Slug" className="w-full border p-2" required />
        <input name="style" value={project.style} onChange={handleChange} placeholder="Style" className="w-full border p-2" />
        <input name="budget" type="number" value={project.budget} onChange={handleChange} placeholder="Budget" className="w-full border p-2" />
        <input name="location" value={project.location} onChange={handleChange} placeholder="Location" className="w-full border p-2" />
        <input name="frontimgalt" value={project.frontimgalt} onChange={handleChange} placeholder="Front Image Alt" className="w-full border p-2" />

        <div>
          <label className="block mb-1">Front Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2" />
          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 rounded w-48 border" />}
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Variations</h3>
          {variations.map((v, i) => (
            <div key={i} className="border p-3 mb-3 rounded space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleVariationImageChange(i, e.target.files[0]);
                }}
                className="w-full border p-2"
              />
              {v.image && <img src={v.image} alt={`Variation ${i + 1}`} className="w-32 h-auto rounded border" />}
              <input
                type="number"
                placeholder="Price"
                value={v.price}
                onChange={(e) => handleVariationChange(i, 'price', Number(e.target.value))}
                className="w-full border p-2"
              />
              <input
                type="text"
                placeholder="Variation Title"
                value={v.variationtitle}
                onChange={(e) => handleVariationChange(i, 'variationtitle', e.target.value)}
                className="w-full border p-2"
              />
            
              <button
                type="button"
                onClick={() => {
                  const updatedVariations = [...variations];
                  updatedVariations.splice(i, 1);
                  setVariations(updatedVariations);
                }}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                ✕ Remove Variation
              </button>

            </div>
          ))}
          <button type="button" onClick={addVariation} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mt-2">
            + Add Variation
          </button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}
