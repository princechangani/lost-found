import React, {useMemo, useState} from 'react';
import { Filter } from 'lucide-react';
import { LostItem } from '../types';
import FilterPanel, {FilterOptions} from "@/components/FilterPanel.tsx";
import {useSearch} from "@/context/SearchContext.tsx";

const sampleLostItems: LostItem[] = [
  {
    id: 1,
    title: 'MacBook Pro 13"',
    description: 'Space Gray MacBook Pro with stickers on the cover',
    location: 'Computer Science Lab',
    date: '2024-02-15',
    category: 'Electronics',
    status: 'pending',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=MacBook+Pro'
  },
  {
    id: 2,
    title: 'AirPods Pro',
    description: 'White AirPods Pro with blue case cover',
    location: 'Library Study Room',
    date: '2024-02-14',
    category: 'Electronics',
    status: 'found',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=AirPods'
  },
  {
    id: 3,
    title: 'Calculator TI-84',
    description: 'Texas Instruments graphing calculator',
    location: 'Math Building Room 201',
    date: '2024-02-13',
    category: 'Electronics',
    status: 'pending',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=Calculator'
  },
  {
    id: 4,
    title: 'Chemistry Textbook',
    description: 'Organic Chemistry 5th Edition',
    location: 'Science Building',
    date: '2024-02-12',
    category: 'Books',
    status: 'pending',
    image: 'https://placehold.co/400x300/4C51BF/ffffff/png?text=Chemistry+Book'
  },
  {
    id: 5,
    title: 'Blue Nike Backpack',
    description: 'Navy blue Nike backpack with laptop compartment',
    location: 'Cafeteria',
    date: '2024-02-11',
    category: 'Bags',
    status: 'found',
    image: 'https://placehold.co/400x300/2B6CB0/ffffff/png?text=Nike+Backpack'
  },
  {
    id: 6,
    title: 'Student ID Card',
    description: 'University ID card for Sarah Johnson',
    location: 'Gym',
    date: '2024-02-10',
    category: 'Documents',
    status: 'found',
    image: 'https://placehold.co/400x300/4A5568/ffffff/png?text=Student+ID'
  },
  {
    id: 7,
    title: 'iPhone 14 Pro',
    description: 'Black iPhone with clear case',
    location: 'Student Center',
    date: '2024-02-09',
    category: 'Electronics',
    status: 'pending',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=iPhone'
  },
  {
    id: 8,
    title: 'Ray-Ban Sunglasses',
    description: 'Black Wayfarer sunglasses',
    location: 'Basketball Court',
    date: '2024-02-08',
    category: 'Accessories',
    status: 'pending',
    image: 'https://placehold.co/400x300/2D3748/ffffff/png?text=Sunglasses'
  },
  {
    id: 9,
    title: 'North Face Jacket',
    description: 'Black winter jacket size M',
    location: 'Lecture Hall B',
    date: '2024-02-07',
    category: 'Clothing',
    status: 'found',
    image: 'https://placehold.co/400x300/1A202C/ffffff/png?text=Jacket'
  },
  {
    id: 10,
    title: 'USB Drive',
    description: '64GB SanDisk USB drive',
    location: 'Computer Lab',
    date: '2024-02-06',
    category: 'Electronics',
    status: 'pending',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=USB+Drive'
  },
  {
    id: 11,
    title: 'Wallet',
    description: 'Brown leather wallet with ID cards',
    location: 'Parking Lot',
    date: '2024-02-05',
    category: 'Accessories',
    status: 'found',
    image: 'https://placehold.co/400x300/2D3748/ffffff/png?text=Wallet'
  },
  {
    id: 12,
    title: 'Notebook',
    description: 'Blue spiral notebook with Physics notes',
    location: 'Physics Lab',
    date: '2024-02-04',
    category: 'Books',
    status: 'pending',
    image: 'https://placehold.co/400x300/4C51BF/ffffff/png?text=Notebook'
  }
];

const LostItems: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    category: 'All',
    dateFrom: '',
    dateTo: '',
    status: 'All'
  });
  const { searchQuery } = useSearch();

  const filteredItems = useMemo(() => {
    return sampleLostItems.filter((item) => {
      // Search filter
      if (searchQuery) {
        const searchTerm = searchQuery.toLowerCase();
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // Category filter
      if (activeFilters.category !== 'All' && item.category !== activeFilters.category) {
        return false;
      }

      // Date range filter
      if (activeFilters.dateFrom && activeFilters.dateTo) {
        const itemDate = new Date(item.date);
        const fromDate = new Date(activeFilters.dateFrom);
        const toDate = new Date(activeFilters.dateTo);
        if (itemDate < fromDate || itemDate > toDate) {
          return false;
        }
      }

      // Status filter
      if (activeFilters.status !== 'All' && item.status !== activeFilters.status) {
        return false;
      }

      return true;
    });
  }, [activeFilters, searchQuery]);

  const handleFilterApply = (filters: FilterOptions) => {
    setActiveFilters(filters);
  };

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Lost Items</h1>
          <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Search results count */}
        {searchQuery && (
            <div className="text-sm text-gray-600">
              Found {filteredItems.length} results for "{searchQuery}"
            </div>
        )}

        {/* Active filters display */}
        {(activeFilters.category !== 'All' ||
            activeFilters.dateFrom ||
            activeFilters.dateTo ||
            activeFilters.status !== 'All') && (
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.category !== 'All' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Category: {activeFilters.category}
              </span>
                )}
                {activeFilters.dateFrom && activeFilters.dateTo && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Date: {activeFilters.dateFrom} to {activeFilters.dateTo}
              </span>
                )}
                {activeFilters.status !== 'All' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Status: {activeFilters.status}
              </span>
                )}
              </div>
            </div>
        )}

        {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === 'found'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                    {item.status === 'found' ? 'Found' : 'Pending'}
                  </span>
                      </div>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Location:</span>
                          <span className="ml-2">{item.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">{item.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium">Category:</span>
                          <span className="ml-2">{item.category}</span>
                        </div>
                      </div>
                      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Contact Owner
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}

        <FilterPanel
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleFilterApply}
            initialFilters={activeFilters}
        />
      </div>
  );
};
export default LostItems;
