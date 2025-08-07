import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 my-4 w-full">
            {/* Previous Arrow */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50"
                disabled={currentPage === 1}
            >
                ←
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                return (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md transition text-sm font-medium
                            ${currentPage === page
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                            }`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Arrow */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
