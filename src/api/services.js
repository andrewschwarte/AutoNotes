const API_URL = "http://localhost:4000/api";

// Vehicle API calls
export async function getVehicles() {
  const res = await fetch(`${API_URL}/vehicles`);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

export async function addVehicle(vehicleData) {
  const res = await fetch(`${API_URL}/vehicles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicleData),
  });
  if (!res.ok) throw new Error("Failed to create vehicle");
  return res.json();
}

export async function deleteVehicle(id) {
  const res = await fetch(`${API_URL}/vehicles/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete vehicle");
  return res.json();
}

// Service API calls
export async function getServices() {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function addService(serviceData) {
  const res = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
}

export async function updateService(id, updates) {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update service");
  return res.json();
}

export async function deleteService(id) {
  const res = await fetch(`${API_URL}/services/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete service");
  return res.json();
}
