import React, { useState, useRef, useEffect } from "react";

const PrestasiFilter = ({
  categories,
  years,
  activeCategory,
  setActiveCategory,
  activeYear,
  setActiveYear,
}) => {
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <div
        onClick={() => setActiveCategory("all")}
        className={`px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${
          activeCategory === "all" ? "bg-primary-dark text-white" : ""
        }`}
      >
        All Category
      </div>

      {categories.map((item) => (
        <div
          key={item.id}
          onClick={() => setActiveCategory(item.name)}
          className={`px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${
            activeCategory === item.name ? "bg-primary-dark text-white" : ""
          }`}
        >
          {item.name}
        </div>
      ))}

      <div className="relative ml-auto" ref={yearDropdownRef}>
        <button
          type="button"
          onClick={() => setYearDropdownOpen((v) => !v)}
          className="flex items-center gap-2 px-3 py-1 shadow-card bg-white rounded-md cursor-pointer min-w-[100px]"
        >
          {activeYear === "all" ? "All Years" : activeYear}
          <svg
            className={`w-4 h-4 transition-transform ${yearDropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {yearDropdownOpen && (
          <div className="absolute left-0 mt-2 w-40 bg-white border border-primary/30 rounded-lg shadow-lg z-20 p-2 max-h-60 overflow-y-auto">
            <div
              onClick={() => {
                setActiveYear("all");
                setYearDropdownOpen(false);
              }}
              className={`px-3 py-2 rounded-md cursor-pointer hover:bg-primary-light ${
                activeYear === "all" ? "font-semibold text-primary-dark" : ""
              }`}
            >
              All Years
            </div>
            {years.map((year) => (
              <div
                key={year}
                onClick={() => {
                  setActiveYear(String(year));
                  setYearDropdownOpen(false);
                }}
                className={`px-3 py-2 rounded-md cursor-pointer hover:bg-primary-light ${
                  activeYear === String(year) ? "font-semibold text-primary-dark" : ""
                }`}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrestasiFilter;
