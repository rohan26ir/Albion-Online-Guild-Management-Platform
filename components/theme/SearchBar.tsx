'use client';

import { useState, useEffect, useRef, KeyboardEvent, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

interface NavItem {
  id: number;
  page: string;
  path: string;
}

export default function SearchBar({ type }: { type: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navPublic: NavItem[] = [
    { id: 1, page: "Home", path: "/" },
    { id: 2, page: "About", path: "/about" },
    { id: 3, page: "Contact", path: "/contact" },
    { id: 4, page: "Services", path: "/services" },
    { id: 5, page: "Blog", path: "/blog" },
    { id: 6, page: "Privacy Policy", path: "/privacy-policy" },
    { id: 7, page: "Terms of Service", path: "/terms-of-service" },
  ];

  const navDashboard: NavItem[] = [
    { id: 1, page: "Dashboard", path: "/dashboard" },
    { id: 2, page: "Profile", path: "/profile" },
    { id: 3, page: "Settings", path: "/settings" },
    { id: 4, page: "Notifications", path: "/notifications" },
    { id: 5, page: "Messages", path: "/messages" },
    { id: 6, page: "Logout", path: "/logout" },
  ];

  const navigations = type === "default" ? navPublic : navDashboard;

  // Use useMemo for derived state
  const filteredResults = useMemo(() => {
    if (searchQuery.trim() === '') {
      return navigations;
    }
    return navigations.filter(item =>
      item.page.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, navigations]);

  const handleSelect = useCallback((path: string) => {
    router.push(path);
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  }, [router]);

  // Handle search query change and reset selection
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      // Ctrl + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown as EventListener);
    return () => window.removeEventListener('keydown', handleKeyDown as EventListener);
  }, [isOpen]);

  // Handle keyboard navigation when search is open
  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
            handleSelect(filteredResults[selectedIndex].path);
          } else if (filteredResults.length === 1) {
            handleSelect(filteredResults[0].path);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleNavigation as EventListener);
    return () => window.removeEventListener('keydown', handleNavigation as EventListener);
  }, [isOpen, filteredResults, selectedIndex, handleSelect]);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  return (
    <>
      {/* Search Button (Ctrl+K trigger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-background border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span>Search...</span>
        <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded">
          Ctrl+K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 mt-20 ">
          <div ref={modalRef} className="w-full max-w-2xl overflow-hidden bg-background rounded-xl shadow-2xl border-3  ">
            
            
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search pages..."
                className="w-full h-14 pl-12 pr-4 text-lg border-0 focus:ring-0 outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
              >
                <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 rounded">Esc</kbd>
              </button>
            </div>

            {/* Results */}
            <div className="border-t border-gray-100 max-h-96 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <ul className="py-2">
                  {filteredResults.map((item, index) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelect(item.path)}
                      className={`px-4 py-2 cursor-pointer transition-colors ${
                        index === selectedIndex
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.page}</span>
                        <span className="text-xs text-gray-400">{item.path}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <p>No results found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border rounded">↓</kbd>
                  <span>to navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border rounded">Enter</kbd>
                  <span>to select</span>
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border rounded">Esc</kbd>
                <span>to close</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}