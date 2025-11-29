import React from "react";
import { Link } from "react-router-dom";
import { timeAgo, stripHtml } from "@/utils/formatting";
import MotionReveal from "@/components/common/MotionReveal";
import ReadMoreButton from "@/components/common/ReadMore";

/**
 * Categories Filter Component
 *
 * @param {Object} props
 * @param {Array} props.categories - Available categories
 * @param {string} props.activeCategory - Currently active category
 * @param {Function} props.setActiveCategory - Function to change active category
 * @returns {JSX.Element}
 */
const CategoriesFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* All category option */}
      <div
        onClick={() => setActiveCategory("all")}
        className={`flex items-center px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${
          activeCategory === "all" ? "bg-primary-dark text-white" : ""
        }`}
      >
        <p className="font-normal text-xs md:text-sm">All</p>
      </div>

      {/* Dynamic categories */}
      {categories.map((item, index) => (
        <div
          key={`topic-${index}`}
          className={`flex items-center px-3 py-1 shadow-card bg-white rounded-md cursor-pointer ${
            activeCategory === item.slug ? "bg-primary-dark text-white" : ""
          }`}
          onClick={() => setActiveCategory(item.slug)}
        >
          <p className="font-normal text-xs md:text-sm">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * NewsListSection Component
 *
 * Displays filtered news list with category filters
 *
 * @param {Object} props
 * @param {Array} props.news - News articles
 * @param {Array} props.categories - Available categories
 * @param {string} props.activeCategory - Currently active category
 * @param {Function} props.setActiveCategory - Function to change active category
 * @param {string} props.baseUrl - Base URL for API assets
 * @param {boolean} props.compactView - Whether to show in compact mode (no category filters)
 * @returns {JSX.Element}
 */
const NewsListSection = ({
  news,
  categories,
  activeCategory,
  setActiveCategory,
  baseUrl,
  compactView = false,
}) => {
  /**
   * Menentukan apakah harus menampilkan deskripsi berdasarkan panjang judul
   * @param {string} title - Judul berita
   * @returns {boolean} - True jika deskripsi harus ditampilkan
   */

  return (
    <div>
      {/* Filter kategori hanya ditampilkan jika tidak dalam compact view */}
      {!compactView && (
        <MotionReveal animation="fade-up">
          <CategoriesFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </MotionReveal>
      )}

      {/* Main news container as grid */}
      <MotionReveal
        animation="fade-up"
        delay={0.3}
        key={`news-list-${activeCategory}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news && news.length > 0 ? (
            news.map((newsItem) => (
              <div
                key={`news-list-${newsItem.id}`}
                className="bg-white rounded-xl shadow-card flex flex-col h-full overflow-hidden"
              >
                <Link
                  to={`/komnews/${newsItem.slug}`}
                  className="flex flex-col h-full"
                >
                  <div className="h-40 w-full overflow-hidden flex-shrink-0 relative">
                    <img
                      src={`${baseUrl}/storage/${newsItem.image}`}
                      alt={newsItem.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/placeholder-news.jpg";
                      }}
                    />
                    {/* Komnews Tags in image */}
                    {newsItem.categories && newsItem.categories.length > 0 && (
                      <div className="absolute left-2 bottom-2 flex flex-wrap gap-1 z-10">
                        {newsItem.categories.map((cat) => (
                          <span
                            key={`tag-${newsItem.id}-${cat.id}`}
                            className="inline-block bg-primary-light/90 text-primary-dark text-[10px] px-1.5 py-0.5 rounded font-medium shadow"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <h4 className="font-bold text-base line-clamp-2 mb-2">
                      {stripHtml(newsItem.title).substring(0, 80)}
                    </h4>
                    <p className="text-xs text-gray-500 mb-1">
                      {timeAgo(newsItem.created_at)}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                      {stripHtml(newsItem.content).substring(0, 80)}
                    </p>
                    <div className="mt-auto pt-2 flex">
                      <ReadMoreButton
                        to={`/komnews/${newsItem.slug}`}
                        label="Selengkapnya"
                        newTab={false}
                        className="w-full"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-4 text-gray-500">
              Tidak ada berita dalam kategori ini
            </div>
          )}
        </div>
      </MotionReveal>
    </div>
  );
};

export default NewsListSection;
