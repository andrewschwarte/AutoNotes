import { useState } from "react";

export default function VehicleModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    color: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.make || !formData.model || !formData.year) {
      alert("Please fill in Make, Model, and Year");
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      make: "",
      model: "",
      year: "",
      vin: "",
      licensePlate: "",
      color: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white border-4 border-black p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-black">Add New Vehicle</h2>

        <form onSubmit={handleSubmit}>
          {/* Make */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Make <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="e.g., Toyota, Honda, Ford"
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          {/* Model */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Model <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g., Camry, Civic, F-150"
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          {/* Year */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              Year <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="e.g., 2020"
              min="1900"
              max={new Date().getFullYear() + 1}
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
              required
            />
          </div>

          {/* VIN (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              VIN (Optional)
            </label>
            <input
              type="text"
              name="vin"
              value={formData.vin}
              onChange={handleChange}
              placeholder="17-character VIN"
              maxLength="17"
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
            />
          </div>

          {/* License Plate (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-black mb-1">
              License Plate (Optional)
            </label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              placeholder="e.g., ABC-1234"
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
            />
          </div>

          {/* Color (Optional) */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black mb-1">
              Color (Optional)
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Black, White, Red"
              className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:border-gray-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-black text-black hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-black text-white border-2 border-black hover:bg-gray-800 transition"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
