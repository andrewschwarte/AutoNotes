import "./App.css";
import MaintenanceTracker from "./components/MaintenanceTracker";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold text-black mb-6">!AutoNotes</h1>
      <h2 className="mb-6">
        A minimalist vehicle service tracker. Add a vehicle to get started.{" "}
      </h2>

      <MaintenanceTracker />
    </div>
  );
}
