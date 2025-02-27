import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CustomerPage from "./pages/CustomerPage";
import EmployeePage from "./pages/EmployeePage";
import FlowerBoquetPage from "./pages/FlowerBoquetPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import SupplierPage from "./pages/SupplierPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/employees" element={<EmployeePage />} />
            <Route path="/flowerboquets" element={<FlowerBoquetPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/orderdetails" element={<OrderDetailPage />} />
            <Route path="/suppliers" element={<SupplierPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;