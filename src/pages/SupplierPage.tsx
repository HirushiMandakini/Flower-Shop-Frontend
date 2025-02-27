import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSuppliersThunk, addSupplierThunk, updateSupplierThunk, deleteSupplierThunk } from "../redux/slices/supplierSlice";
import { Supplier } from "../types/types";

const SupplierPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { suppliers, status } = useSelector((state: RootState) => state.supplier);

  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplier, setSupplier] = useState<Omit<Supplier, "id">>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch customers on component mount
    useEffect(() => {
      dispatch(fetchSuppliersThunk());
    }, [dispatch]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  // Handle form submission for Add or Update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      dispatch(updateSupplierThunk({ ...supplier, id: editingSupplier.id }));
    } else {
      dispatch(addSupplierThunk(supplier)); // ✅ No ID passed, backend generates it
    }
    resetForm();
  };

  // Set the form for editing
  const handleEdit = (supplier: any) => {
    setEditingSupplier(supplier);
    setSupplier({ ...supplier });
  };

  // Handle delete with confirmation
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      dispatch(deleteSupplierThunk(id));
    }
  };

  // Reset the form after submit or cancel
  const resetForm = () => {
    setEditingSupplier(null);
    setSupplier({ name: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Supplier Management</h1>

      {/* Supplier Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input
          type="text"
          name="name"
          value={supplier.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 m-2"
          required
        />
        <input
          type="email"
          name="email"
          value={supplier.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 m-2"
          required
        />
        <input
          type="text"
          name="phone"
          value={supplier.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 m-2"
          required
        />
        <input
          type="text"
          name="address"
          value={supplier.address}
          onChange={handleChange}
          placeholder="Address"
          className="border p-2 m-2"
          required
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingSupplier ? "Update" : "Add"}
          </button>
          {editingSupplier && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Supplier Table */}
<table className="w-full border-collapse border">
  <thead>
    <tr className="bg-gray-200">
      <th className="border p-2 text-center">ID</th>
      <th className="border p-2 text-center">Name</th>
      <th className="border p-2 text-center">Email</th>
      <th className="border p-2 text-center">Phone</th>
      <th className="border p-2 text-center">Address</th>
      <th className="border p-2 text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {suppliers?.length > 0 ? (
      suppliers.map((supplier) => (
        <tr key={supplier.id} className="border-b hover:bg-gray-100">
          <td className="border p-2 text-center">{supplier.id}</td> {/* Auto-increment ID */}
          <td className="border p-2 text-center">{supplier.name}</td>
          <td className="border p-2 text-center">{supplier.email}</td>
          <td className="border p-2 text-center">{supplier.phone}</td>
          <td className="border p-2 text-center">{supplier.address}</td>
          <td className="border p-2">
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => handleEdit(supplier)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(supplier.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={6} className="border p-4 text-center text-gray-500">
          No suppliers found.
        </td>
      </tr>
    )}
  </tbody>
</table>


    </div>
  );
};

export default SupplierPage;