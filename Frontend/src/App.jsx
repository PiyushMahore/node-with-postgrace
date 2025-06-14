import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:8080/users", form);
      alert("User added!");
    } catch (err) {
      alert("Error adding user");
    }
  };

  const handleGetUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      setUsers(res.data);
    } catch (err) {
      alert("Error fetching users");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">User Registration</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <input
          className="mb-4 p-2 w-full border rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="mb-4 p-2 w-full border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="mb-4 p-2 w-full border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </button>

        <button
          onClick={handleGetUsers}
          className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Users
        </button>
      </div>

      {users.length > 0 && (
        <div className="w-full max-w-2xl bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">User List</h2>
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{u.name}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
