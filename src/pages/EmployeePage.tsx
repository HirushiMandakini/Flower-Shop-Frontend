import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchEmployeesThunk, addEmployeeThunk, updateEmployeeThunk, deleteEmployeeThunk } from "../redux/slices/employeeSlice";
import { Employee } from "../types/types";

const EmployeePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employee);

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employee, setEmployee] = useState<Omit<Employee, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    salary: 0,
  });

  useEffect(() => {
    dispatch(fetchEmployeesThunk());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      dispatch(updateEmployeeThunk({ ...employee, id: editingEmployee.id, salary: parseFloat(employee.salary.toString()) }));
    } else {
      dispatch(addEmployeeThunk(employee)); // Backend generates ID
    }
    resetForm();
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setEmployee({ ...employee });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployeeThunk(id));
    }
  };

  const resetForm = () => {
    setEditingEmployee(null);
    setEmployee({ firstName: "", lastName: "", email: "", phone: "", position: "", salary: 0 });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

      {/* Employee Form */}
      <form onSubmit={handleSubmit} className="p-4 border rounded-md mb-4">
        <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 m-2" required />
        <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 m-2" required />
        <input type="email" name="email" value={employee.email} onChange={handleChange} placeholder="Email" className="border p-2 m-2" required />
        <input type="text" name="phone" value={employee.phone} onChange={handleChange} placeholder="Phone" className="border p-2 m-2" required />
        <input type="text" name="position" value={employee.position} onChange={handleChange} placeholder="Position" className="border p-2 m-2" required />
        <input type="number" name="salary" value={employee.salary.toString()} onChange={handleChange} placeholder="Salary" className="border p-2 m-2" required />
        <div className="flex space-x-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">
            {editingEmployee ? "Update" : "Add"}
          </button>
          {editingEmployee && <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2">Cancel</button>}
        </div>
      </form>

      {/* Employee Table */}
      <table className="w-full border-collapse border">
  <thead>
    <tr>
      <th className="border p-2">ID</th>
      <th className="border p-2">First Name</th>
      <th className="border p-2">Last Name</th>
      <th className="border p-2">Email</th>
      <th className="border p-2">Phone</th>
      <th className="border p-2">Position</th>
      <th className="border p-2">Salary</th>
      <th className="border p-2">Actions</th> {/* ✅ Added Actions Column */}
    </tr>
  </thead>
  <tbody>
    {employees.map((employee) => (
      <tr key={employee.id}>
        <td className="border p-2">{employee.id}</td>
        <td className="border p-2">{employee.firstName}</td>
        <td className="border p-2">{employee.lastName}</td>
        <td className="border p-2">{employee.email}</td>
        <td className="border p-2">{employee.phone}</td>
        <td className="border p-2">{employee.position}</td>
        <td className="border p-2">{employee.salary}</td>
        <td className="border p-2 text-center"> {/* ✅ Actions */}
          <div className="flex justify-center space-x-2">
            <button 
              onClick={() => handleEdit(employee)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Update
            </button>
            <button 
              onClick={() => handleDelete(employee.id)}
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

export default EmployeePage;