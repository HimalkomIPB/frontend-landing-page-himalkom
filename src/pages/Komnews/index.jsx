import React, { useState, useEffect } from "react";
import { useFetchData } from "@/hooks/useAPI";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from "@/components/common/MotionReveal";
import Pagination from "@/components/common/Pagination";
// Sections
import HeroSection from "./section/Hero";
import HeadlineSection from "./section/Headline";
import NewsListSection from "./section/NewsList";

/**
 * KomNews Page Component
 *
 * Displays news articles from HIMALKOM with filtering by categories
 */
const Komnews = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch news data
  const {
    data: newsData,
    loading: loadingNews,
    error: errorNews,
  } = useFetchData(`komnews?page=${currentPage}${activeCategory !== "all" ? `&category=${activeCategory}` : ""}`, baseUrl);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]); 
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginationBackend = newsData?.pagination;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mt-12 md:mt-32">
        <HeroSection />
      </section>

      {/* Headline Section */}
      <section className="md:mt-64 mt-24 mb-16 max-w-6xl mx-auto px-4">
        {loadingNews ? (
          <LoadingSpinner
            variant="section"
            size="medium"
            message="Memuat berita..."
          />
        ) : errorNews ? (
          <div className="text-red-500 text-center py-8 bg-red-50 rounded-lg">
            <p>Gagal memuat berita</p>
            <p className="text-sm mt-2">{errorNews}</p>
          </div>
        ) : newsData ? (
          <MotionReveal animation="fade-up">
            <div className="flex flex-col gap-8">
              {/* News Headlines */}
              <HeadlineSection
                headlines={newsData?.todayHeadlines || []}
                baseUrl={baseUrl}
                loading={loadingNews}
              />
            </div>
          </MotionReveal>
        ) : null}
      </section>

      {/* News List Section - now below headline, as grid */}
      <section className="mb-64 max-w-6xl mx-auto px-4">
        {!loadingNews && !errorNews && newsData && (
          <>
            <NewsListSection
              news={newsData?.komnews || []}
              categories={newsData?.categories || []}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              baseUrl={baseUrl}
            />

            {paginationBackend && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={paginationBackend.current_page}
                  totalPages={paginationBackend.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Komnews;
