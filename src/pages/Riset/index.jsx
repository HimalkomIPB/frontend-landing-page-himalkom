import React, { useState, useEffect } from "react"; 
// Import custom hook
import { useFetchData } from "../../hooks/useAPI";
import Pagination from "@/components/common/Pagination";
// Import reusable components
import MotionReveal from "@/components/common/MotionReveal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
// Import section
import HeroSection from "./section/HeroSection";
import RisCard from "./section/RisetCard";


const NAMA_MODEL = "research";


const Riset = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const endpoint = `${NAMA_MODEL}?page=${currentPage}&limit=${itemsPerPage}`;
  const { data, loading, error } = useFetchData(endpoint, baseUrl);
  
  
  const dataList = data ? data[NAMA_MODEL] : [];
  const totalPages = data?.pagination?.last_page || 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // --- Loading & Error ---
  if (loading)
    return (
      <LoadingSpinner
        variant="page"
        size="large"
        message="Memuat data research..."
      />
    );

  if (error)
    return (
      <p className="text-red-500 font-bold text-xl text-center">
        Error: {error}
      </p>
    );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <MotionReveal animation="fade-up">
        <HeroSection />
      </MotionReveal>

      {/* Main content */}
      <section className="mt-16">
        <div className="px-4 flex flex-col items-center text-center my-[130px] md:my-[150px] lg:my-[280px]">
          {dataList && dataList.length > 0 ? (
            <>
              <RisCard
                data={{ [NAMA_MODEL]: dataList }}
                baseUrl={baseUrl}
              />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada data riset untuk ditampilkan.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Riset;
