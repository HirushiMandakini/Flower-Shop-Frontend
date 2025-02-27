import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
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
  );
};

export default Sidebar;