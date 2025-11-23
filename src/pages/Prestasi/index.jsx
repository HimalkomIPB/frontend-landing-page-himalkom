import React, { useState, useEffect, useCallback } from "react";
import Hero from "./section/Hero";
import PrestasiFilter from "./section/PrestasiFilter";
import PrestasiList from "./section/PrestasiList";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Pagination from "@/components/common/Pagination";

const Prestasi = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const ITEMS_PER_PAGE = 6;

  const [prestasi, setPrestasi] = useState([]);
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeYear, setActiveYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPrestasi = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", page);
        params.set("per_page", ITEMS_PER_PAGE);
  
        if (activeCategory !== "all") params.set("kategori", activeCategory);
        if (activeYear !== "all") params.set("tahun", String(activeYear));
  
        const res = await fetch(`${baseUrl}/prestasi?${params.toString()}`);
        const json = await res.json();
  
        setPrestasi(json.prestasi || []);
        setCategories(json.all_kategori || []);
        setYears(json.all_years || []);
        setTotalPages(json.pagination?.last_page || 1);
        setCurrentPage(json.pagination?.current_page || 1);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data prestasi. Silakan coba lagi.");
      }
      setLoading(false);
    },
    [activeCategory, activeYear, baseUrl]
  );
  
  useEffect(() => {
    fetchPrestasi(1);
  }, [fetchPrestasi]);

  useEffect(() => {
    if (activeCategory !== "all" || activeYear !== "all") {
      fetchPrestasi(1);
    }
  }, [activeCategory, activeYear]);

  const handlePageChange = (page) => {
    fetchPrestasi(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Hero />

      <section className="mt-24 max-w-6xl mx-auto px-4 pb-24">
        {loading ? (
          <LoadingSpinner variant="section" message="Memuat prestasi..." />
        ) : (
          <>
            <PrestasiFilter
              categories={categories}
              years={years}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeYear={activeYear}
              setActiveYear={setActiveYear}
            />

            <PrestasiList prestasi={prestasi} />

            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Prestasi;
