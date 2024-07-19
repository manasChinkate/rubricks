import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default DateFilter;
