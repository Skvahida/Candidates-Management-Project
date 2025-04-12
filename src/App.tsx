import React, { useState, useEffect } from 'react';
import { Search, Filter, LayoutGrid, List } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import CandidateTable from './components/CandidateTable';
import AddCandidateModal from './components/AddCandidateModal';
import FilterModal from './components/FilterModal';
import { Candidate, FilterOptions, ViewMode } from './types';
import { candidateService } from './services/candidateService';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchCandidates();
  }, [searchQuery, filters]);

  const fetchCandidates = async () => {
    try {
      const data = await candidateService.getCandidates({
        search: searchQuery,
        ...filters
      });
      setCandidates(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      toast.error('Failed to fetch candidates');
      setLoading(false);
    }
  };

  const handleAddCandidate = async (candidateData: Omit<Candidate, 'id' | 'created_at'>) => {
    try {
      await candidateService.addCandidate(candidateData);
      toast.success('Candidate added successfully');
      setIsAddModalOpen(false);
      fetchCandidates();
    } catch (error) {
      console.error('Error adding candidate:', error);
      toast.error('Failed to add candidate');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCandidates = candidates;
  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-roboto">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <CandidateTable
            candidates={paginatedCandidates}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            viewMode={viewMode}
          />
        )}
      </div>

      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCandidate}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={setFilters}
        currentFilters={filters}
      />
    </div>
  );
}

export default App;