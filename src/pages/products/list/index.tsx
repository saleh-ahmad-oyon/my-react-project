import { useState, useEffect } from "react";
import { Product } from "@/lib/models/product";
import { getData } from "@/lib/services";
import { ProductCard, CategoryBar } from "@/components/products";
import { useDebounce } from 'use-debounce'
import { useSearchParams } from "@/hooks";
import { useForm } from 'react-hook-form';
import {ClipLoader} from 'react-spinners'

const ProductList = () => {
  const { categoryId, title, setTitle } = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getProducts(categoryId, title);
  }, [categoryId, title]);

  const getProducts = async (categoryId: number, title: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await getData<Product[]>(`products?categoryId=${categoryId}&title=${title}`);
      if (res.success && res.data) {
        setProducts(res.data);
      } else {
        setError(res.message || "Failed to fetch products.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const {register, watch} = useForm({
    defaultValues: {
      search: ''
    }
  })

  const watchSearch = watch('search')

  const [value] = useDebounce(watchSearch, 1000);

  useEffect(() => {
    setTitle(value)
  }, [value])

  return (
    <div>
      <div className="w-80 border-r bg-sky-100 pt-[45px] fixed h-full">
        <CategoryBar />
      </div>
      <div className="pt-5 w-[calc(100%-320px)] ml-[320px]">
        <div className="page-container">
          <div className="mb-6">
            <input className="border w-full p-3 rounded" type="text" placeholder="Search Here..." {...register('search')} />
          </div>
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

          {!loading && !error && products.length === 0 && (
            <div>
              <p>No Product found</p>
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;