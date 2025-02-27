import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchOrdersThunk, addOrderThunk, updateOrderThunk, deleteOrderThunk } from "../redux/slices/orderSlice";
import { Order } from "../types/types";

const OrderPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useSelector((state: RootState) => state.order);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [order, setOrder] = useState<Omit<Order, "id">>({
    totalAmount: 0,
    date: "",
    customerId: "",
  });

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: name === "totalAmount" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      dispatch(updateOrderThunk({ ...order, id: editingOrder.id }));
    } else {
      dispatch(addOrderThunk(order)); // Backend generates ID
    }
    resetForm();
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setOrder({ ...order });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrderThunk(id));
    }
  };

  const resetForm = () => {
    setEditingOrder(null);
    setOrder({
      totalAmount: 0,
      date: "",
      customerId: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {/* Order Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input type="number" name="totalAmount" value={order.totalAmount} onChange={handleChange} placeholder="Total Amount" className="border p-2 m-2" required />
        <input type="date" name="date" value={order.date} onChange={handleChange} className="border p-2 m-2" required />
        <input type="text" name="customerId" value={order.customerId} onChange={handleChange} placeholder="Customer ID" className="border p-2 m-2" required />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingOrder ? "Update" : "Add"}
          </button>
          {editingOrder && (
            <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Order Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Customer ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.totalAmount}</td>
              <td className="border p-2">{order.date}</td>
              <td className="border p-2">{order.customerId}</td>
              <td className="border p-2 text-center">
              <div className="flex justify-center space-x-2">
            {/* Update Button */}
            <button
              onClick={() => handleEdit(order)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(order.id)}
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

export default OrderPage;