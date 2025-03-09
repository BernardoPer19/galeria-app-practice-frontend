"use client"
import { useAppContext } from "@/context/AppContext";
import Photocard from "./Photocard";

const PhotoList =  () => {
  const { query } = useAppContext();


  return (
    <div className="">
      <Photocard query={query}/>
    </div>
  );
};

export default PhotoList;
