"use client" 
// /Photocard.tsx
import { useState, useEffect } from "react";
import { NewsTypes } from "@/types/photoType";
import loadData from "@/services/LoadData";

interface PhotocardProps {
  query: string;
}

const Photocard = ({ query }: PhotocardProps) => {
  const [photos, setPhotos] = useState<NewsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función que carga las fotos al cambiar el query
    const fetchData = async () => {
      try {
        setLoading(true); // Inicia el estado de carga
        const data = await loadData(query);
        if (data.length === 0) {
          setError("No photos found");
        } else {
          setPhotos(data);
        }
      } catch (err) {
        setError("Error fetching photos");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Llamada a la API cuando el query cambie
  }, [query]); // Solo se ejecutará si el query cambia

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo: NewsTypes) => (
        <div key={photo.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={photo.urls.small}
            alt={photo.alt_description || "No description"}
            className="w-full h-56 object-cover"
            width={500}
            height={300}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {photo.alt_description || "No description"}
            </h3>
            <p className="text-sm text-gray-500">By {photo.user.name}</p>
            <div className="mt-2 flex justify-between items-center">
              <a
                href={photo.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Photo
              </a>
              <span className="text-gray-400 text-xs">
                {photo.created_at.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Photocard;
