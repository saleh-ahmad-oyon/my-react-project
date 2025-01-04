import { Product } from "@/lib/models/product";
import { getData } from "@/lib/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cart";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {Button} from "@/components/ui/button.tsx";
import {ClipLoader} from 'react-spinners'

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    id && getProduct(id);
  }, [id]);

  const getProduct = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await getData<Product>(`products/${id}`);
      if (res.success && res.data) {
        setProduct(res.data);
      } else {
        setError(res.message || "Failed to fetch products.");
      }
    } finally {
      setLoading(false);
    }
  };

  const quantity = cart.find((item) => item.id === product?.id)?.quantity || 0;

  return (
    <div className="page-container">
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

      {!loading && !error && !product && (
        <div>
          <p>No Product found</p>
        </div>
      )}

      {!loading && !error && product && (

        <div className="flex gap-6 pt-20">
          {/*<div className="w-96 rounded overflow-hidden">*/}
          <div className="w-96">
            {/*<img src={product.images[0]} alt="" />*/}
            <Carousel className="w-full max-w-xs">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img src={image} alt=""/>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious/>
              <CarouselNext/>
            </Carousel>
          </div>
          <div className="flex-1 pt-3">
            <h4 className="text-3xl font-semibold text-sky-500 mb-2">
              {product.title}
            </h4>
            <p className="mb-4 text-base">{product.description}</p>
            <p>
              <span className="font-semibold pr-1">Category: </span>{" "}
              {product.category.name}
            </p>
            <p className="my-2">
              <span>Price: $</span>{product.price}
            </p>

            <div className="py-5">
              {quantity ? (
                <div className="border p-2 rounded bg-gray-200 w-40">
                  <button
                    className="px-2"
                    onClick={() => dispatch(decrementQuantity(product.id))}
                  >
                    <FiMinus className="text-xl relative top-1"/>
                  </button>
                  <span className="p-2 px-6 bg-white rounded font-semibold">
                  {quantity}
                </span>
                  <button
                    className="px-2"
                    onClick={() => dispatch(incrementQuantity(product.id))}
                  >
                    <FiPlus className="text-xl relative top-1"/>
                  </button>
                </div>
              ) : (
                <Button
                  className="bg-sky-700 hover:bg-sky-900 text-white h-11 w-40"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        title: product.title,
                        image: product.images[0],
                        price: product.price,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;