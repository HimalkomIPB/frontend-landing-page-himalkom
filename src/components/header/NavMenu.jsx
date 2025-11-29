import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFetchData } from "../../hooks/useAPI";

/**
 * Menu navigasi untuk desktop view
 */
const NavMenu = () => {
  // Data untuk dropdown
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInformasiOpen, setIsInformasiOpen] = useState(false);
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);

  // Fetch data dari API
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData("divisions", baseUrl);
  const { data: communitiesData } = useFetchData("communities", baseUrl);

  // Ekstrak data yang diperlukan
  const divisions = divisionsData?.divisions || [];

  // Fallback untuk komunitas jika API gagal
  const defaultCommunities = [
    { name: "Agriux", slug: "agriux" },
    { name: "IWDC", slug: "iwdc" },
    { name: "CSI", slug: "csi" },
    { name: "Agribot", slug: "agribot" },
    { name: "CP", slug: "cp" },
    { name: "Daming", slug: "daming" },
    { name: "Gary", slug: "gary" },
    { name: "MAD", slug: "mad" },
  ];
  const communities = communitiesData?.communities || defaultCommunities;

  // Refs untuk deteksi klik di luar dropdown
  const profileRef = useRef(null);
  const informasiRef = useRef(null);
  const departmentRef = useRef(null);
  const communityRef = useRef(null);

  // Tutup dropdown
  const closeDropdowns = () => {
    setIsProfileOpen(false);
    setIsInformasiOpen(false);
    setIsDepartmentOpen(false);
    setIsCommunityOpen(false);
  };

  // Handle klik di luar dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        departmentRef.current &&
        !departmentRef.current.contains(event.target)
      ) {
        setIsDepartmentOpen(false);
      }
      if (
        communityRef.current &&
        !communityRef.current.contains(event.target)
      ) {
        setIsCommunityOpen(false);
      }
      if (informasiRef.current && !informasiRef.current.contains(event.target)) {
        setIsInformasiOpen(false);
      }
    };
    if (isProfileOpen || isDepartmentOpen || isCommunityOpen || isInformasiOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, isDepartmentOpen, isCommunityOpen, isInformasiOpen]);

  return (
    <nav className="flex items-center gap-14 font-athiti text-lg">
      {/* Item Menu: Home */}
      <NavLink
        to="/home"
        className={({ isActive }) => `
          text-primary-darker transition-all duration-200
          hover:text-primary-dark 
          ${isActive ? "font-bold" : "font-medium"}
        `}
        onClick={closeDropdowns}
      >
        Home
      </NavLink>

      {/* Item Menu: Profil (Dropdown) */}
      <div className="relative" ref={profileRef}>
        <button
          className="text-primary-darker font-medium transition-all hover:text-primary-dark cursor-pointer"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          Profil
        </button>

        {isProfileOpen && (
          <div className="absolute mt-2 w-64 bg-white border border-primary rounded-md shadow-card z-40 py-2">
            <NavLink
              to="/himalkom"
              className={({ isActive }) => `
                block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
                ${isActive ? "font-bold" : "font-normal"}
              `}
              onClick={closeDropdowns}
            >
              Himalkom
            </NavLink>

            {/* Departemen Button */}
            <div ref={departmentRef}>
              <button
                className="w-full text-left px-4 py-2 text-primary-darker hover:bg-primary-light transition-all flex items-center justify-between"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDepartmentOpen(!isDepartmentOpen);
                }}
              >
                <span>Departemen</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isDepartmentOpen ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Departemen Dropdown */}
              {isDepartmentOpen && (
                <div className="absolute left-full top-12 w-64 bg-white border border-primary rounded-md shadow-card z-50 py-2">
                  {divisions.length > 0 ? (
                    divisions.map((division) => (
                      <NavLink
                        key={division.id || division.slug}
                        to={`/division/${division.slug}`}
                        className={({ isActive }) => `
                          block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
                          ${isActive ? "font-bold" : "font-normal"}
                        `}
                        onClick={closeDropdowns}
                      >
                        {division.abbreviation || division.name}
                      </NavLink>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500 italic">Loading...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Item Menu: Komunitas (Dropdown) */}
      <div className="relative" ref={communityRef}>
        <button
          className="text-primary-darker font-medium transition-all hover:text-primary-dark cursor-pointer"
          onClick={() => setIsCommunityOpen(!isCommunityOpen)}
        >
          Komunitas
        </button>

        {isCommunityOpen && (
          <div className="absolute mt-2 w-64 bg-white border border-primary rounded-md shadow-card z-40 py-2">
            {communities.length > 0 ? (
              communities.map((community) => (
                <NavLink
                  key={community.id || community.slug}
                  to={`/community/${community.slug}`}
                  className={({ isActive }) => `
                    block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
                    ${isActive ? "font-bold" : "font-normal"}
                  `}
                  onClick={closeDropdowns}
                >
                  {community.name}
                </NavLink>
              ))
            ) : (
              <p className="px-4 py-2 text-gray-500 italic">Loading...</p>
            )}
          </div>
        )}
      </div>

      {/* Informasi */}
      <div className="relative" ref={informasiRef}>
        <button
          className="text-primary-darker font-medium transition-all hover:text-primary-dark cursor-pointer"
          onClick={() => setIsInformasiOpen(!isInformasiOpen)}
        >
          Informasi
        </button>

        {isInformasiOpen && (
          <div className="absolute mt-2 w-64 bg-white border border-primary rounded-md shadow-card z-40 py-2">
            <NavLink
              to="/komnews"
              className={({ isActive }) => `
          block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
          ${isActive ? "font-bold" : "font-normal"}
        `}
              onClick={closeDropdowns}
            >
              Komnews
            </NavLink>

            <NavLink
              to="/galeri"
              className={({ isActive }) => `
          block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
          ${isActive ? "font-bold" : "font-normal"}
        `}
              onClick={closeDropdowns}
            >
              Galeri
            </NavLink>

            <NavLink
              to="/jawara"
              className={({ isActive }) => `
          block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
          ${isActive ? "font-bold" : "font-normal"}
        `}
              onClick={closeDropdowns}
            >
              Jawara
            </NavLink>

            <NavLink
              to="/prestasi"
              className={({ isActive }) => `
          block px-4 py-2 text-primary-darker hover:bg-primary-light transition-all
          ${isActive ? "font-bold" : "font-normal"}
        `}
              onClick={closeDropdowns}
            >
              Prestasi
            </NavLink>
          </div>
        )}
      </div>

      {/* Item Menu: Megaproker */}
      <NavLink
        to="/megaproker"
        className={({ isActive }) => `
          text-primary-darker transition-all duration-200
          hover:text-primary-dark 
          ${isActive ? "font-bold" : "font-medium"}
        `}
        onClick={closeDropdowns}
      >
        Megaproker
      </NavLink>

      {/* Item Menu: Riset */}
      <NavLink
        to="/riset"
        className={({ isActive }) => `
          text-primary-darker transition-all duration-200
          hover:text-primary-dark 
          ${isActive ? "font-bold" : "font-medium"}
        `}
        onClick={closeDropdowns}
      >
        Riset
      </NavLink>

      {/* Item Menu: Syntax */}
      <NavLink
        to="/syntax"
        className={({ isActive }) => `
          text-primary-darker transition-all duration-200
          hover:text-primary-dark 
          ${isActive ? "font-bold" : "font-medium"}
        `}
        onClick={closeDropdowns}
      >
        Syntax
      </NavLink>
    </nav>
  );
};

export default NavMenu;
