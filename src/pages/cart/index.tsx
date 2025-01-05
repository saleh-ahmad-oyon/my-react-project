import { useAppDispatch, useAppSelector } from "@/redux";
import { CartItem } from '@/lib/models/cart';
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsTrash3 } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  removeAll
} from "@/redux/features/cart";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useCookies } from "react-cookie";
import {Button} from "@/components/ui/button.tsx";

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart);

  const calcTotal = (items: CartItem[]) => (
    items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    )
  )

  const totalAmount = calcTotal(cartItems);

  const checkout = () => {
    if (cookies.token) {
      toast.success('Successfully Checked Out.')
      setTimeout(() => {
        dispatch(removeAll())
        navigate('/')
      }, 2500)

    } else {
      navigate("/login", { state: { from: location.pathname } });
    }
  }

  return (
    <div className="page-container pt-10">
      <h2 className="text-2xl mb-4">Cart List</h2>

      <div>
        {cartItems.length > 0 ? (
          <>
            <Table className="w-full">
              <TableCaption>List of your recently added items in the cart.</TableCaption>
              <TableHeader className="bg-sky-200">
                <TableRow>
                  <TableHead className="text-black font-bold">ID</TableHead>
                  <TableHead className="text-black font-bold">Title</TableHead>
                  <TableHead className="text-right text-black font-bold">Price</TableHead>
                  <TableHead className="text-black font-bold text-center">Quantity</TableHead>
                  <TableHead className="text-right text-black font-bold">Sub Total</TableHead>
                  <TableHead className="text-center text-black font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.quantity * item.price}</TableCell>
                    <TableCell className="text-center">
                      <button
                        className="px-2 bg-red-500 p-2 rounded text-white"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        <BsTrash3 />
                      </button>
                      <button
                        className="px-2 border border-red-600 p-2 rounded text-red-600 mx-4"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        <FiMinus />
                      </button>
                      <button
                        className="px-2 bg-green-700 p-2 rounded text-white"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        <FiPlus />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="text-black font-bold" colSpan={4}>Total</TableCell>
                  <TableCell className="text-right text-black font-bold">${totalAmount}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <div className="mt-10 flex justify-end">
              <Button className="bg-sky-700 hover:bg-sky-900 text-white" onClick={ checkout }>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div>
            <p>Please add some products.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;