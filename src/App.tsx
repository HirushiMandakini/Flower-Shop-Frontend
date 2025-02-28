// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import CustomerPage from "./pages/CustomerPage";
// import EmployeePage from "./pages/EmployeePage";
// import FlowerBoquetPage from "./pages/FlowerBoquetPage";
// import OrderPage from "./pages/OrderPage";
// import OrderDetailPage from "./pages/OrderDetailPage";
// import SupplierPage from "./pages/SupplierPage";
// // import SignUpPage from "./pages/SignupPage";

// function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 p-4">
//           <Routes>
//             <Route path="/customers" element={<CustomerPage />} />
//             <Route path="/employees" element={<EmployeePage />} />
//             <Route path="/flowerboquets" element={<FlowerBoquetPage />} />
//             <Route path="/orders" element={<OrderPage />} />
//             <Route path="/orderdetails" element={<OrderDetailPage />} />
//             <Route path="/suppliers" element={<SupplierPage />} />
//             {/* <Route path="/signup" element={<SignUpPage />} /> */}
            
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Sidebar from "./components/Sidebar";
import CustomerPage from "./pages/CustomerPage";
import EmployeePage from "./pages/EmployeePage";
import FlowerBoquetPage from "./pages/FlowerBoquetPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import SupplierPage from "./pages/SupplierPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
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
                    <Route path="*" element={<Navigate to="/customers" />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
