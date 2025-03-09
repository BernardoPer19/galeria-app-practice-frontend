"use client";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";  

const FormSearch = () => {
  const { setQuery, search, setSearch } = useAppContext(); 
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") {
      setError(true); 
    } else {
      setError(false);
      setQuery(search);  
      setSearch("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setSearch(currentValue);  
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={search} 
          onChange={handleChange}
          type="text"
          placeholder="Busca un tipo de imagen!"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="text-red-500">Hubo un error al buscar la foto. El campo está vacío.</p>}
    </div>
  );
};

export default FormSearch;
