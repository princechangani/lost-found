import React, {useMemo, useState} from 'react';
import { Filter } from 'lucide-react';
import { FoundItem } from '../types';
import FilterPanel, {FilterOptions} from "@/components/FilterPanel.tsx";
import {useSearch} from "@/context/SearchContext.tsx";

const sampleFoundItems: FoundItem[] = [
  {
    id: 1,
    title: 'Water Bottle',
    description: 'Hydroflask water bottle, navy blue color',
    location: 'Gym',
    date: '2024-02-15',
    category: 'Accessories',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/2B6CB0/ffffff/png?text=Water+Bottle'
  },
  {
    id: 2,
    title: 'Student ID Card',
    description: 'ID card for Michael Brown',
    location: 'Library',
    date: '2024-02-14',
    category: 'Documents',
    status: 'claimed',
    image: 'https://placehold.co/400x300/4A5568/ffffff/png?text=Student+ID'
  },
  {
    id: 3,
    title: 'Reading Glasses',
    description: 'Black-rimmed reading glasses',
    location: 'Study Room 101',
    date: '2024-02-13',
    category: 'Accessories',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/2D3748/ffffff/png?text=Glasses'
  },
  {
    id: 4,
    title: 'Wireless Mouse',
    description: 'Logitech wireless mouse',
    location: 'Computer Lab',
    date: '2024-02-12',
    category: 'Electronics',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=Mouse'
  },
  {
    id: 5,
    title: 'Math Textbook',
    description: 'Calculus II textbook',
    location: 'Math Building',
    date: '2024-02-11',
    category: 'Books',
    status: 'claimed',
    image: 'https://placehold.co/400x300/4C51BF/ffffff/png?text=Math+Book'
  },
  {
    id: 6,
    title: 'Umbrella',
    description: 'Black automatic umbrella',
    location: 'Student Center',
    date: '2024-02-10',
    category: 'Accessories',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/2D3748/ffffff/png?text=Umbrella'
  },
  {
    id: 7,
    title: 'Apple Pencil',
    description: '2nd generation Apple Pencil',
    location: 'Art Studio',
    date: '2024-02-09',
    category: 'Electronics',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=Apple+Pencil'
  },
  {
    id: 8,
    title: 'Gym Bag',
    description: 'Gray Adidas gym bag',
    location: 'Locker Room',
    date: '2024-02-08',
    category: 'Bags',
    status: 'claimed',
    image: 'https://placehold.co/400x300/2B6CB0/ffffff/png?text=Gym+Bag'
  },
  {
    id: 9,
    title: 'Lab Coat',
    description: 'White lab coat size L',
    location: 'Chemistry Lab',
    date: '2024-02-07',
    category: 'Clothing',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/1A202C/ffffff/png?text=Lab+Coat'
  },
  {
    id: 10,
    title: 'Wireless Earbuds',
    description: 'Samsung Galaxy Buds',
    location: 'Cafeteria',
    date: '2024-02-06',
    category: 'Electronics',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=Earbuds'
  },
  {
    id: 11,
    title: 'House Keys',
    description: 'Set of 3 keys with red keychain',
    location: 'Parking Lot',
    date: '2024-02-05',
    category: 'Accessories',
    status: 'claimed',
    image: 'https://placehold.co/400x300/2D3748/ffffff/png?text=Keys'
  },
  {
    id: 12,
    title: 'Scientific Calculator',
    description: 'Casio scientific calculator',
    location: 'Physics Lab',
    date: '2024-02-04',
    category: 'Electronics',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/667EEA/ffffff/png?text=Calculator'
  },
  {
    id: 13,
    title: 'Scarf',
    description: 'Red wool scarf',
    location: 'Lecture Hall',
    date: '2024-02-03',
    category: 'Clothing',
    status: 'unclaimed',
    image: 'https://placehold.co/400x300/1A202C/ffffff/png?text=Scarf'
  }
];


const FoundItems: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    category: 'All',
    dateFrom: '',
    dateTo: '',
    status: 'All'
  });
  const { searchQuery } = useSearch();

  const filteredItems = useMemo(() => {
    return sampleFoundItems.filter((item) => {
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
          <h1 className="text-2xl font-bold text-gray-900">Found Items</h1>
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
                                item.status === 'claimed'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                    {item.status === 'claimed' ? 'Claimed' : 'Unclaimed'}
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
                        Claim Item
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
export default FoundItems;