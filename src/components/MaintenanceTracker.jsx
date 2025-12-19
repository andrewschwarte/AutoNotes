import { useEffect, useState } from "react";
import Column from "./Column";
import VehicleModal from "./VehicleModal";
import {
  getVehicles,
  addVehicle as addVehicleAPI,
  addService as addServiceAPI,
  updateService,
  deleteService,
  deleteVehicle,
} from "../api/services";

export default function MaintenanceTracker() {
  const [vehicles, setVehicles] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load vehicles and services from backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const vehiclesData = await getVehicles();

        // Transform to the format our UI expects
        const vehiclesMap = {};
        vehiclesData.forEach((vehicle) => {
          vehiclesMap[vehicle.id] = {
            info: {
              make: vehicle.make,
              model: vehicle.model,
              year: vehicle.year,
              vin: vehicle.vin,
              licensePlate: vehicle.licensePlate,
              color: vehicle.color,
            },
            services: vehicle.services || [],
          };
        });

        setVehicles(vehiclesMap);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    }

    loadData();
  }, []);

  // Add a new vehicle
  const addVehicle = async (vehicleInfo) => {
    const vehicleId = `vehicle-${Date.now()}`;

    try {
      await addVehicleAPI({
        id: vehicleId,
        ...vehicleInfo,
      });

      setVehicles((prev) => ({
        ...prev,
        [vehicleId]: {
          info: vehicleInfo,
          services: [],
        },
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding vehicle:", err);
    }
  };

  // Add a new service to a vehicle
  const addService = async (vehicleId, serviceData) => {
    if (!serviceData.serviceType || !serviceData.mileage) return;

    // Check if this exact service already exists (prevent duplicates)
    const exists = vehicles[vehicleId]?.services.some(
      (s) =>
        s.serviceType === serviceData.serviceType &&
        s.mileage === parseInt(serviceData.mileage) &&
        s.date === serviceData.date
    );

    if (exists) {
      console.log("Duplicate service prevented");
      return;
    }

    try {
      const newService = await addServiceAPI({
        vehicleId,
        serviceType: serviceData.serviceType,
        mileage: parseInt(serviceData.mileage),
        date: serviceData.date || new Date().toISOString().split("T")[0],
        notes: serviceData.notes || "",
      });

      setVehicles((prev) => {
        const updated = { ...prev };
        updated[vehicleId].services = [
          ...updated[vehicleId].services,
          newService,
        ];
        return updated;
      });
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  // Move service between vehicles
  const moveService = async (fromVehicle, toVehicle, service) => {
    if (fromVehicle === toVehicle) return;

    try {
      await updateService(service.id, {
        ...service,
        vehicleId: toVehicle,
      });

      setVehicles((prev) => {
        const updated = { ...prev };
        updated[fromVehicle].services = updated[fromVehicle].services.filter(
          (s) => s.id !== service.id
        );
        updated[toVehicle].services = [...updated[toVehicle].services, service];
        return updated;
      });
    } catch (err) {
      console.error("Error moving service:", err);
    }
  };

  // Remove service
  const removeService = async (vehicleId, serviceId) => {
    try {
      await deleteService(serviceId);
      setVehicles((prev) => {
        const updated = { ...prev };
        updated[vehicleId].services = updated[vehicleId].services.filter(
          (s) => s.id !== serviceId
        );
        return updated;
      });
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // Remove vehicle
  const removeVehicle = async (vehicleId) => {
    if (
      !confirm(
        "Are you sure you want to delete this vehicle and all its service records?"
      )
    ) {
      return;
    }

    try {
      await deleteVehicle(vehicleId);
      setVehicles((prev) => {
        const updated = { ...prev };
        delete updated[vehicleId];
        return updated;
      });
    } catch (err) {
      console.error("Error deleting vehicle:", err);
    }
  };

  return (
    <div className="w-full max-w-7xl">
      {/* Add Vehicle Button */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-6 py-3 border-2 border-black hover:bg-gray-800 transition text-lg font-semibold"
        >
          + Add Vehicle
        </button>
      </div>

      {/* Vehicle Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(vehicles).map(([vehicleId, vehicleData]) => (
          <Column
            key={vehicleId}
            title={`${vehicleData.info.year} ${vehicleData.info.make} ${vehicleData.info.model}`}
            color="bg-white"
            services={vehicleData.services}
            onMove={moveService}
            onAdd={addService}
            onRemove={removeService}
            onRemoveVehicle={removeVehicle}
            vehicleId={vehicleId}
          />
        ))}
      </div>

      {/* Vehicle Modal */}
      <VehicleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addVehicle}
      />
    </div>
  );
}
