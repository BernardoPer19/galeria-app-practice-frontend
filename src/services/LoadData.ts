



const loadData = async (query:string) => {

const API = `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${process.env.NEXT_PUBLIC_API_KEY}`;

  if (!process.env.NEXT_PUBLIC_API_KEY) {
    console.error("NEXT_PUBLIC_API_KEY no está definida en las variables de entorno.");
    return [];
  }

  try {
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error(`Error al obtener los datos! Status: ${res.status}`);
    }
    const data = await res.json();

    return data.results || []; 
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    return [];
  }
};

export default loadData;
