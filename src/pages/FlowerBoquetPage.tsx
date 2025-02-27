import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchFlowerBoquetsThunk, addFlowerBoquetThunk, updateFlowerBoquetThunk, deleteFlowerBoquetThunk } from "../redux/slices/flowerBoquetSlice";
import { FlowerBoquet } from "../types/types";

const FlowerBoquetPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { flowerBoquets } = useSelector((state: RootState) => state.flowerBoquet);

  const [editingFlowerBoquet, setEditingFlowerBoquet] = useState<FlowerBoquet | null>(null);
  const [flowerBoquet, setFlowerBoquet] = useState<Omit<FlowerBoquet, "id">>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    supplierId: "",
  });

  useEffect(() => {
    dispatch(fetchFlowerBoquetsThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlowerBoquet({
      ...flowerBoquet,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFlowerBoquet) {
      dispatch(updateFlowerBoquetThunk({ ...flowerBoquet, id: editingFlowerBoquet.id }));
    } else {
      dispatch(addFlowerBoquetThunk(flowerBoquet));
    }
    resetForm();
  };

  const handleEdit = (flowerBoquet: FlowerBoquet) => {
    setEditingFlowerBoquet(flowerBoquet);
    setFlowerBoquet({ ...flowerBoquet });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this flower bouquet?")) {
      dispatch(deleteFlowerBoquetThunk(id));
    }
  };

  const resetForm = () => {
    setEditingFlowerBoquet(null);
    setFlowerBoquet({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      supplierId: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Flower Bouquet Management</h1>

      {/* Flower Bouquet Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input type="text" name="name" value={flowerBoquet.name} onChange={handleChange} placeholder="Name" className="border p-2 m-2" required />
        <input type="text" name="description" value={flowerBoquet.description} onChange={handleChange} placeholder="Description" className="border p-2 m-2" required />
        <input type="number" name="price" value={flowerBoquet.price} onChange={handleChange} placeholder="Price" className="border p-2 m-2" required />
        <input type="number" name="stock" value={flowerBoquet.stock} onChange={handleChange} placeholder="Stock" className="border p-2 m-2" required />
        <input type="text" name="supplierId" value={flowerBoquet.supplierId} onChange={handleChange} placeholder="Supplier ID" className="border p-2 m-2" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">{editingFlowerBoquet ? "Update" : "Add"}</button>
      </form>

      {/* Flower Bouquet Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Supplier ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flowerBoquets.map((flowerBoquet) => (
            <tr key={flowerBoquet.id}>
              <td className="border p-2">{flowerBoquet.id}</td>
              <td className="border p-2">{flowerBoquet.name}</td>
              <td className="border p-2">{flowerBoquet.description}</td>
              <td className="border p-2">{flowerBoquet.price}</td>
              <td className="border p-2">{flowerBoquet.stock}</td>
              <td className="border p-2">{flowerBoquet.supplierId}</td>
              <td className="border p-2 flex space-x-2">
                <button 
                  onClick={() => handleEdit(flowerBoquet)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDelete(flowerBoquet.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlowerBoquetPage;