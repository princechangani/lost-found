import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterOptions) => void;
    initialFilters: FilterOptions;
}

export interface FilterOptions {
    category: string;
    dateFrom: string;
    dateTo: string;
    status: string;
}

const categories = [
    'All',
    'Electronics',
    'Documents',
    'Accessories',
    'Clothing',
    'Books',
    'Bags',
    'Other'
];

const FilterPanel: React.FC<FilterPanelProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     onApplyFilters,
                                                     initialFilters
                                                 }) => {
    const [filters, setFilters] = React.useState<FilterOptions>(initialFilters);

    const handleApply = () => {
        onApplyFilters(filters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = {
            category: 'All',
            dateFrom: '',
            dateTo: '',
            status: 'All'
        };
        setFilters(resetFilters);
        onApplyFilters(resetFilters);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Filter Items</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) =>
                                    setFilters({ ...filters, category: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date Range
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <input
                                        type="date"
                                        value={filters.dateFrom}
                                        onChange={(e) =>
                                            setFilters({ ...filters, dateFrom: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <input
                                        type="date"
                                        value={filters.dateTo}
                                        onChange={(e) =>
                                            setFilters({ ...filters, dateTo: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) =>
                                    setFilters({ ...filters, status: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="All">All</option>
                                <option value="pending">Pending</option>
                                <option value="found">Found</option>
                            </select>
                        </div>

                        <div className="flex space-x-4 pt-6">
                            <button
                                onClick={handleReset}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                            >
                                Reset
                            </button>
                            <button
                                onClick={handleApply}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;