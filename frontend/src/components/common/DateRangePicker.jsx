import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiXCircle } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  const containerRef = useRef(null);

  // Handle clicks outside the calendar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        datePickerRef.current &&
        !datePickerRef.current.setOpen
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Reset Date Function
  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Button to Toggle Date Picker */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100"
      >
        <FiCalendar className="text-gray-500 w-5 h-5" />
        <span>
          {startDate && endDate
            ? `${format(new Date(startDate), "MMM d, yyyy")} – ${format(new Date(endDate), "MMM d, yyyy")}`
            : "Select Date Range"}
        </span>
      </button>

      {/* Date Picker Modal */}
      {isOpen && (
        <div
          ref={datePickerRef}
          className="absolute mt-2 bg-white/95 p-2 border border-gray-300 rounded-lg shadow-lg flex flex-col items-center"
        >
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            dateFormat="MMM d, yyyy"
          />

          {/* Reset Button at Bottom */}
          {startDate && endDate && (
            <button
              onClick={handleReset}
              className="mt-2 w-full border border-gray-400 text-blue-500 px-3 py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-red-200 hover:text-gray-500 transition"
            >
              Reset Date
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
