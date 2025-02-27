import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store"; // ✅ Import `AppDispatch`
import { fetchCustomersThunk, addCustomerThunk, updateCustomerThunk, deleteCustomerThunk } from "../redux/slices/customerSlice";
import { Customer } from "../types/types";

const CustomerPage = () => {
  const dispatch: AppDispatch = useDispatch(); // ✅ Ensure `dispatch` is correctly typed
  const { customers, status } = useSelector((state: RootState) => state.customer);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customer, setCustomer] = useState<Omit<Customer, "id">>({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  // Fetch customers on component mount
  useEffect(() => {
    dispatch(fetchCustomersThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      dispatch(updateCustomerThunk({ ...customer, id: editingCustomer.id }));
    } else {
      dispatch(addCustomerThunk(customer)); // ✅ No ID passed, backend generates it
    }
    resetForm();
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomer({ ...customer });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomerThunk(id));
    }
  };

  const resetForm = () => {
    setEditingCustomer(null);
    setCustomer({ firstName: "", lastName: "", phone: "", address: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      {/* Customer Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input type="text" name="firstName" value={customer.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 m-2" required />
        <input type="text" name="lastName" value={customer.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 m-2" required />
        <input type="text" name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone" className="border p-2 m-2" required />
        <input type="text" name="address" value={customer.address} onChange={handleChange} placeholder="Address" className="border p-2 m-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingCustomer ? "Update" : "Add"}
        </button>
      </form>

      {/* Customer Table */}
<table className="w-full border-collapse border">
  <thead>
    <tr>
      <th className="border p-2">ID</th><th className="border p-2">First Name</th>
      <th className="border p-2">Last Name</th><th className="border p-2">Phone</th>
      <th className="border p-2">Address</th><th className="border p-2">Actions</th> {/* ✅ Fixed Whitespace */}
    </tr>
  </thead>
  <tbody>
    {customers.map((customer) => (
      <tr key={customer.id}>
        <td className="border p-2">{customer.id}</td><td className="border p-2">{customer.firstName}</td>
        <td className="border p-2">{customer.lastName}</td><td className="border p-2">{customer.phone}</td>
        <td className="border p-2">{customer.address}</td>
        <td className="border p-2 text-center"> {/* ✅ Fixed Button Alignment */}
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => handleEdit(customer)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>
            <button 
              onClick={() => handleDelete(customer.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default CustomerPage;