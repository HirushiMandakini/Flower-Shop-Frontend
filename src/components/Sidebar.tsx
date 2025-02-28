import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // ✅ Dispatch logout action
    navigate("/login"); // ✅ Redirect to login page after logout
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-4">Flower Shop</h2>
        <ul>
          <li className="mb-2">
            <Link to="/customers" className="hover:text-gray-300">Customers</Link>
          </li>
          <li className="mb-2">
            <Link to="/employees" className="hover:text-gray-300">Employees</Link>
          </li>
          <li className="mb-2">
            <Link to="/flowerboquets" className="hover:text-gray-300">Flower Bouquets</Link>
          </li>
          <li className="mb-2">
            <Link to="/orders" className="hover:text-gray-300">Orders</Link>
          </li>
          <li className="mb-2">
            <Link to="/orderdetails" className="hover:text-gray-300">Order Details</Link>
          </li>
          <li className="mb-2">
            <Link to="/suppliers" className="hover:text-gray-300">Suppliers</Link>
          </li>
        </ul>
      </div>

      {/* ✅ Logout Button at the Bottom */}
      <button 
        onClick={handleLogout} 
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
