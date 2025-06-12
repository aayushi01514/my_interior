// components/ui/LoaderSpinner.tsx
export default function LoaderSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-lg font-medium text-blue-600">Loading...</p>
    </div>
  );
}
