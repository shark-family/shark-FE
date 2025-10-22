import React from "react";

const EmptyState: React.FC = () => {
  return (
    <div className="mt-16 grid place-items-center">
      <div className="text-center">
        <p className="text-sm text-gray-500">No tanks match your filters.</p>
      </div>
    </div>
  );
};

export default EmptyState;
