import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchOrderDetailsThunk, addOrderDetailThunk, updateOrderDetailThunk, deleteOrderDetailThunk } from "../redux/slices/orderDetailSlice";
import { OrderDetail } from "../types/types";

const OrderDetailPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orderDetails } = useSelector((state: RootState) => state.orderDetail);

  const [editingOrderDetail, setEditingOrderDetail] = useState<OrderDetail | null>(null);
  const [orderDetail, setOrderDetail] = useState<Omit<OrderDetail, "id">>({
    orderId: "",
    flowerBouquetId: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    dispatch(fetchOrderDetailsThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetail({
      ...orderDetail,
      [name]: name === "quantity" || name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrderDetail) {
      dispatch(updateOrderDetailThunk({ ...orderDetail, id: editingOrderDetail.id }));
    } else {
      dispatch(addOrderDetailThunk(orderDetail)); // Backend generates ID
    }
    resetForm();
  };

  const handleEdit = (orderDetail: OrderDetail) => {
    setEditingOrderDetail(orderDetail);
    setOrderDetail({ ...orderDetail });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this order detail?")) {
      dispatch(deleteOrderDetailThunk(id));
    }
  };

  const resetForm = () => {
    setEditingOrderDetail(null);
    setOrderDetail({
      orderId: "",
      flowerBouquetId: "",
      quantity: 0,
      price: 0,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Detail Management</h1>

      {/* Order Detail Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input type="text" name="orderId" value={orderDetail.orderId} onChange={handleChange} placeholder="Order ID" className="border p-2 m-2" required />
        <input type="text" name="flowerBouquetId" value={orderDetail.flowerBouquetId} onChange={handleChange} placeholder="Flower Bouquet ID" className="border p-2 m-2" required />
        <input type="number" name="quantity" value={orderDetail.quantity} onChange={handleChange} placeholder="Quantity" className="border p-2 m-2" required />
        <input type="number" name="price" value={orderDetail.price} onChange={handleChange} placeholder="Price" className="border p-2 m-2" required />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingOrderDetail ? "Update" : "Add"}
          </button>
          {editingOrderDetail && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2">Cancel</button>}
        </div>
      </form>

      {/* Order Detail Table */}
      <table className="w-full border-collapse border">
  <thead>
    <tr>
      <th className="border p-2">ID</th>
      <th className="border p-2">Order ID</th>
      <th className="border p-2">Flower Bouquet ID</th>
      <th className="border p-2">Quantity</th>
      <th className="border p-2">Price</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {orderDetails.map((detail) => (
      <tr key={detail.id}>
        <td className="border p-2">{detail.id}</td>
        <td className="border p-2">{detail.orderId}</td>
        <td className="border p-2">{detail.flowerBouquetId}</td>
        <td className="border p-2">{detail.quantity}</td>
        <td className="border p-2">{detail.price}</td>
        <td className="border p-2 text-center">
          <div className="flex justify-center space-x-2">
            {/* Update Button */}
            <button
              onClick={() => handleEdit(detail)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(detail.id)}
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

export default OrderDetailPage;