import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
    toast.success("Address deleted");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId ? { ...formData, id: editingId } : addr,
        ),
      );
      toast.success("Address updated");
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
      toast.success("Address added");
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({
      label: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Addresses</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({
                label: "",
                street: "",
                city: "",
                state: "",
                zipCode: "",
                isDefault: false,
              });
            }
          }}
          className="btn-primary flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Address
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="card p-6 mb-6 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Label (e.g., Home, Work)"
              value={formData.label}
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
              className="input-field"
              required
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="mr-2"
              />
              <span>Set as default address</span>
            </label>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="btn-primary">
              {editingId ? "Update Address" : "Add Address"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  label: "",
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  isDefault: false,
                });
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-6 flex justify-between items-start"
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-primary-500 mr-2" />
                <h3 className="font-semibold text-lg">{address.label}</h3>
                {address.isDefault && (
                  <span className="ml-4 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs px-3 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                {address.street}, {address.city}, {address.state}{" "}
                {address.zipCode}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(address)}
                className="text-primary-500 hover:text-primary-600 p-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteAddress(address.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-12 card">
          <FaMapMarkerAlt className="text-4xl text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">
            No saved addresses yet. Add one to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default Addresses;
