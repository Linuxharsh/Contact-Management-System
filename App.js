import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  // Fetch all contacts
  const getContacts = async () => {
    const res = await axios.get("http://localhost:5000/contact");
    setContacts(res.data);
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/contact", formData);
    setFormData({ name: "", phone: "", email: "", address: "" });
    getContacts();
  };

  // Delete contact
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/contact/${id}`);
    getContacts();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-6">Contact Management System</h1>

      {/* Add Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto mb-8"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded text-black"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
        >
          Add Contact
        </button>
      </form>

      {/* Contact List */}
      <div className="max-w-2xl mx-auto">
        {contacts.length === 0 ? (
          <p className="text-center text-gray-400">No contacts found</p>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{contact.name}</h3>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                  <p className="text-gray-400">{contact.address}</p>
                </div>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="bg-purple-700 hover:bg-blue-700 px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

