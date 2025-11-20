import React, { useState, useEffect } from "react"; 
import MainLayout from "@/layout/MainLayout";
import HeroSection from "./sections/HeroSection";
import JawaraList from "./sections/JawaraList";
import { useFetchData } from "@/hooks/useAPI";
import Pagination from "@/components/common/Pagination";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENDPOINT_URL = "jawara-ilkomerzs"; 
const DATA_KEY = "jawaraIlkomerzs";     

const Jawara = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const endpoint = `${ENDPOINT_URL}?page=${currentPage}&limit=${itemsPerPage}`;
  const { data, loading, error } = useFetchData(endpoint, BASE_URL);

  const jawaraIlkomerzs = data ? data[DATA_KEY] : []; 
  const totalPages = data?.pagination?.last_page || 1; 

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <MainLayout>
      <HeroSection />
      <div className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-10 text-primary-dark font-semibold">
            Loading...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : jawaraIlkomerzs && jawaraIlkomerzs.length > 0 ? (
          <>
            {/* 1. Daftar Prestasi */}
            <JawaraList jawaraIlkomerzs={jawaraIlkomerzs} />

            {/* 2. Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Tidak ada data prestasi untuk ditampilkan.
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Jawara;
