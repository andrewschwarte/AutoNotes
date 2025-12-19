import { useState } from "react";
import ServiceRecord from "./ServiceRecord";

export default function Column({
  title,
  color,
  services,
  onMove,
  onAdd,
  onRemove,
  onRemoveVehicle,
  vehicleId,
}) {
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    serviceType: "",
    customServiceType: "",
    mileage: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const serviceTypes = [
    "Oil and Filter Changes",
    "Tire Rotation",
    "Brake Service",
    "Transmission Service",
    "Air Filter Replacement",
    "Other",
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("service"));
    onMove(data.from, vehicleId, data.service);
  };

  const handleAdd = () => {
    // Determine the final service type
    const finalServiceType =
      serviceForm.serviceType === "Other"
        ? serviceForm.customServiceType
        : serviceForm.serviceType;

    if (!finalServiceType || !serviceForm.mileage) {
      alert("Please select/enter a service type and enter mileage");
      return;
    }

    onAdd(vehicleId, {
      ...serviceForm,
      serviceType: finalServiceType,
    });

    // Reset form
    setServiceForm({
      serviceType: "",
      customServiceType: "",
      mileage: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
    });
    setIsAddingService(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      className="flex flex-col"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Vehicle Header */}
      <div
        className={`${color} p-4 border-2 border-black w-full min-h-[500px]`}
      >
        {/* Header with delete button */}
        <div className="flex justify-between items-center mb-4 border-b-2 border-black pb-2">
          <h2 className="text-lg font-bold text-black text-center flex-1">
            {title}
          </h2>
          <button
            onClick={() => onRemoveVehicle(vehicleId)}
            className="text-black hover:text-red-600 text-lg font-bold ml-2"
            title="Delete vehicle"
          >
            ✖
          </button>
        </div>

        {/* Services */}
        <div className="flex-1 space-y-2 mb-3">
          {services.length === 0 ? (
            <p className="text-sm text-gray-600 text-center italic mt-8">
              No maintenance records yet
            </p>
          ) : (
            services.map((service) => (
              <ServiceRecord
                key={service.id}
                service={service}
                from={vehicleId}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        {/* Add Service Section */}
        {!isAddingService ? (
          <button
            onClick={() => setIsAddingService(true)}
            className="w-full bg-black text-white text-sm px-3 py-2 border-2 border-black hover:bg-gray-800 transition"
          >
            + Add Service
          </button>
        ) : (
          <div className="bg-white p-3 border-2 border-black">
            {/* Service Type Dropdown */}
            <div className="mb-2">
              <label className="block text-xs font-semibold text-black mb-1">
                Service Type
              </label>
              <select
                name="serviceType"
                value={serviceForm.serviceType}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border-2 border-black"
              >
                <option value="">Select service...</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Service Type Input (only shows when "Other" is selected) */}
            {serviceForm.serviceType === "Other" && (
              <div className="mb-2">
                <label className="block text-xs font-semibold text-black mb-1">
                  Custom Service Type
                </label>
                <input
                  type="text"
                  name="customServiceType"
                  value={serviceForm.customServiceType}
                  onChange={handleChange}
                  placeholder="e.g., Spark Plugs, Battery Replacement"
                  className="w-full px-2 py-1 text-sm border-2 border-black"
                />
              </div>
            )}

            {/* Mileage */}
            <div className="mb-2">
              <label className="block text-xs font-semibold text-black mb-1">
                Mileage
              </label>
              <input
                type="number"
                name="mileage"
                value={serviceForm.mileage}
                onChange={handleChange}
                placeholder="e.g., 45000"
                className="w-full px-2 py-1 text-sm border-2 border-black"
              />
            </div>

            {/* Date */}
            <div className="mb-2">
              <label className="block text-xs font-semibold text-black mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={serviceForm.date}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm border-2 border-black"
              />
            </div>

            {/* Notes */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-black mb-1">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={serviceForm.notes}
                onChange={handleChange}
                placeholder="Any additional notes..."
                rows="2"
                className="w-full px-2 py-1 text-sm border-2 border-black resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setIsAddingService(false)}
                className="flex-1 bg-white text-black text-sm px-3 py-1 border-2 border-black hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 bg-black text-white text-sm px-3 py-1 border-2 border-black hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
