import { NavLink, useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import { useAppSelector } from "@/redux";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, _, removeCookie] = useCookies(["token"]);

  // Take the cart value from redux
  // const carts = useAppSelector(({ cart }) => cart);
  const carts = useAppSelector((state) => state.cart);

  // Count Total Quantity in the Cart
  const totalQuantity = carts.reduce(
      (sum, cart) => sum + cart.quantity, 0
  );

  // After clicking
  const handleLogout = () => {
    removeCookie("token");
    navigate("/");
  };

  return (
    <nav className=" bg-sky-800 text-white shadow-md py-4 px-10 fixed top-0 w-full">
      <div className="flex justify-between items-center gap-10 ">
        <div className="flex items-center gap-16">
          <div>
            <BiCart className="text-gray-50 text-5xl" />
          </div>
          <ul className="flex items-center gap-6">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="relative">
              {totalQuantity ? (
                <span className="absolute -top-5 left-8 text-xs bg-red-700 text-white w-8 py-2 text-center rounded-full">
                  {totalQuantity}
                </span>
              ) : (
                ""
              )}
              <NavLink to="/cart">Cart</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <ul className="flex gap-3">
            <li>
              {cookies.token ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};