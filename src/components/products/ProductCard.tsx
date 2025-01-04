import { Product } from "@/lib/models/product";
import defaultProductImg from "@/assets/images/default_product.jpg";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/features/cart";
import { FiPlus, FiMinus } from "react-icons/fi";
import {Button} from "@/components/ui/button.tsx";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-sky-300 ">
      <Link className="block cursor-pointer" to={`/products/${product.id}`}>
        <div className="h-96 border bg-gray-200 overflow-hidden">
          <img
            src={product?.images[0] || defaultProductImg}
            alt=""
            className="object-contain"
          />
        </div>
        <div className="mt-4 p-6 h-40">
          <h4 className="text-xl font-semibold mb-1 text-sky-400">
            {product.title}
          </h4>
          <p className="my-1">
            <span className="font-semibold pr-1">Category:</span>
            {product.category.name}
          </p>
          <p>
            <span className="font-semibold pr-1">Price: $</span>{product.price}
          </p>
        </div>
      </Link>
      <div className="py-5 flex justify-center">
        {quantity ? (
          <div className="border p-2 rounded bg-gray-200 ">
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
  );
};