export default function ServiceRecord({ service, from, onRemove }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("service", JSON.stringify({ from, service }));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white p-3 border-2 border-black cursor-grab hover:bg-gray-100 transition"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Service Type */}
          <p className="font-semibold text-black text-sm mb-1">
            {service.serviceType}
          </p>

          {/* Mileage - Most Important */}
          <p className="text-lg font-bold text-black mb-1">
            {service.mileage.toLocaleString()} mi
          </p>

          {/* Date */}
          <p className="text-xs text-gray-700 mb-1">
            {new Date(service.date).toLocaleDateString()}
          </p>

          {/* Notes (if any) */}
          {service.notes && (
            <p className="text-xs text-gray-700 italic mt-2">{service.notes}</p>
          )}
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(from, service.id)}
          className="text-black hover:text-red-600 text-sm ml-2 flex-shrink-0 font-bold"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
