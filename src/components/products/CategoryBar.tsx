import { useSearchParams } from "@/hooks";
import { Category } from "@/lib/models/category";
import {useEffect, useState} from "react";
import {getData} from "@/lib/services";
import {ClipLoader} from 'react-spinners'

export const CategoryBar = () => {
 const [categories, setCategories] = useState<Category[]>([]);
 const { categoryId, setCategoryId } = useSearchParams();
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string>("");

 useEffect(() => {
   getCategories();
 }, []);

 const getCategories = async () => {
   setLoading(true);
   setError("");

   try {
     const res = await getData<Category[]>('categories');
     if (res.success && res.data) {
       setCategories(res.data);
     } else {
       setError(res.message || "Failed to fetch products.");
     }
   } catch (err) {
     setError("An unexpected error occurred.");
   } finally {
     setLoading(false);
   }
 };

 const searchByCategory = (id: number) => {
   setCategoryId(id);
 };
 return (
   <div className="pl-10">
     <h4 className="text-xl font-semibold">Categories</h4>

     {loading && (
       <div className="flex justify-center">
         <ClipLoader  size={100} color="#0284c7"  />
       </div>
     )}

     {!loading && error && (
       <div>
         <p>Error: {error}</p>
       </div>
     )}

     {!loading && !error && categories.length === 0 && (
       <div>
         <p>No Category Found.</p>
       </div>
     )}

     {!loading && !error && categories.length > 0 && (
       <div>
         <div className="flex flex-col items-start mt-5">
           <div className={`flex gap-2 items-center mb-4 w-full cursor-pointer ${
             (categoryId === 0) ? "bg-white border p-2 w-full rounded text-sky-700" : ''
           }`}
                onClick={() => searchByCategory(0)}
           >
             <button
               className="block"
             >
               All
             </button>
           </div>
           {categories.map((category) => (
             <div
               key={category.id}
               className={`flex gap-2 items-center mb-4 w-full cursor-pointer ${
                 category.id === categoryId ? "bg-white border p-2 w-full rounded text-sky-700" : ''
               }`}
               onClick={() => searchByCategory(category.id)}
             >
               <button
                 className="block"
               >
                 {category.name}
               </button>
             </div>
           ))}
         </div>
       </div>
     )}
   </div>
 );
};