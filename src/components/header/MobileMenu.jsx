import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetchData } from '../../hooks/useAPI';
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

const MobileMenu = ({ onCloseMenu }) => {
  // State untuk expand/collapse submenu
  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    community: false,
    informasi: false
  });

  const [animateItems, setAnimateItems] = useState(false);
  
  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateItems(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle section expand/collapse
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // API data
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData('divisions', baseUrl);
  const { data: communitiesData } = useFetchData('communities', baseUrl);

  // Pastikan ada data atau fallback ke array kosong
  const divisions = divisionsData?.divisions || [];
  const communities = communitiesData?.communities || [];

  // Modifikasi CSS di item menu:
  const menuItemClass = (isActive) => `
    block py-2 px-3 rounded-md transition text-primary-darker
    transform transition-all duration-300
    ${animateItems ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
    ${isActive ? 'bg-primary-light font-semibold' : 'hover:bg-primary-light/50'}
  `;

  return (
    <div className="fixed top-16 right-0 w-64 bg-white shadow-card rounded-bl-lg z-50">
      <div className="flex flex-col py-2 max-h-[80vh] overflow-y-auto">
        
        {/* Menu items */}
        <div className="px-2 py-1 border-b border-gray-100">
          <NavLink 
            to="/home" 
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
            style={{ transitionDelay: '100ms' }}
          >
            Home
          </NavLink>
        </div>

        {/* Profile Dropdown */}
        <div className="px-2 py-1 border-b border-gray-100">
          <button 
            className="flex items-center justify-between w-full py-2 px-3 rounded-md text-left text-primary-darker hover:bg-primary-light/50 transition"
            onClick={() => toggleSection('profile')}
          >
            <span>Profil</span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.profile ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {expandedSections.profile && (
            <div className="pl-3 my-1 border-l-2 border-primary ml-3">
              <NavLink 
                to="/himalkom"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Himalkom
              </NavLink>
              
              {/* Departemen */}
              <div className="mt-1 mb-2">
                <h4 className="px-3 py-1 text-sm font-medium text-gray-500">Departemen:</h4>
                <div className="pl-2">
                  {divisions.length > 0 ? (
                    divisions.map((division, index) => (
                      <NavLink
                        key={division.id || division.slug}
                        to={`/division/${division.slug}`}
                        className={({isActive}) => menuItemClass(isActive)}
                        onClick={onCloseMenu}
                        style={{ transitionDelay: `${300 + index * 100}ms` }}
                      >
                        {division.abbreviation || division.name}
                      </NavLink>
                    ))
                  ) : (
                    <p className="px-3 py-1 text-sm text-gray-500 italic">Loading...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Community Dropdown */}
        <div className="px-2 py-1 border-b border-gray-100">
          <button 
            className="flex items-center justify-between w-full py-2 px-3 rounded-md text-left text-primary-darker hover:bg-primary-light/50 transition"
            onClick={() => toggleSection('community')}
          >
            <span>Komunitas</span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.community ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {expandedSections.community && (
            <div className="pl-3 my-1 border-l-2 border-primary ml-3">
              {communities.length > 0 ? (
                communities.map((community, index) => (
                  <NavLink
                    key={community.id || community.slug}
                    to={`/community/${community.slug}`}
                    className={({isActive}) => menuItemClass(isActive)}
                    onClick={onCloseMenu}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    {community.name}
                  </NavLink>
                ))
              ) : (
                <p className="px-3 py-1 text-sm text-gray-500 italic">Loading...</p>
              )}
            </div>
          )}
        </div>
        
        {/* Informasi */}
        <div className="px-2 py-1 border-b border-gray-100">
          <button 
            className="flex items-center justify-between w-full py-2 px-3 rounded-md text-left text-primary-darker hover:bg-primary-light/50 transition"
            onClick={() => toggleSection('informasi')}
          >
            <span>Informasi</span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSections.informas ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {expandedSections.informasi && (
            <div className="pl-3 my-1 border-l-2 border-primary ml-3">
              <NavLink 
                to="/komnews"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Komnews
              </NavLink>
              <NavLink 
                to="/Galeri"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Galeri
              </NavLink>
              <NavLink 
                to="/Jawara"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Jawara
              </NavLink>
              <NavLink 
                to="/Prestasi"
                className={({isActive}) => menuItemClass(isActive)}
                onClick={onCloseMenu}
                style={{ transitionDelay: '200ms' }}
              >
                Prestasi
              </NavLink>
            </div>
          )}
        </div> 

        {/* Other Menu Items */}
        <div className="px-2 py-1">
          <NavLink 
            to="/megaproker" 
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
          >
            Megaproker
          </NavLink>
          
          <NavLink 
            to="/riset" 
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
          >
            Riset
          </NavLink>
          
          <NavLink 
            to="/syntax" 
            className={({isActive}) => menuItemClass(isActive)}
            onClick={onCloseMenu}
          >
            Syntax
          </NavLink>

        </div>

        {/* Social Media */}
        <div className="mt-2 pt-3 border-t border-gray-200 px-4">
          <div className="flex justify-center space-x-5 mb-3">
            <a 
              href="https://www.facebook.com/himalkom/?locale=id_ID" 
              className="text-gray-600 hover:text-blue-600 transition" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaFacebook size={18} />
            </a>
            <a 
              href="https://www.instagram.com/himalkomipb/" 
              className="text-gray-600 hover:text-pink-600 transition" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaInstagram size={18} />
            </a>
            <a 
              href="https://twitter.com/HimalkomIPB" 
              className="text-gray-600 hover:text-gray-800 transition" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaXTwitter size={18} />
            </a>
            <a 
              href="https://www.youtube.com/@himalkomipb4653" 
              className="text-gray-600 hover:text-red-600 transition" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaYoutube size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[10px] text-center text-gray-500 mb-2">
            © Himalkom 2025. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;