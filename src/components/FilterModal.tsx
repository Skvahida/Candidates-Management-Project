import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
}

const SKILLS_OPTIONS = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'PHP',
  'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask',
  'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Redis'
];

const EXPERIENCE_OPTIONS = [
  '1 Year', '2 Years', '3 Years', '4 Years', '5 Years',
  '6 Years', '7 Years', '8 Years', '9 Years', '10+ Years'
];

const QUALIFICATION_OPTIONS = [
  'Bachelor of Arts (BA)',
  'Bachelor of Science (BSc)',
  'Bachelor of Engineering (BE)',
  'Master of Science (MSc)',
  'Master of Technology (MTech)',
  'Master of Business Administration (MBA)',
  'Doctor of Philosophy (PhD)'
];

export default function FilterModal({ isOpen, onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  if (!isOpen) return null;

  const handleSkillChange = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      gender: undefined,
      experience: undefined,
      skills: undefined,
      highestQualification: undefined
    };
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Filter Candidates</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={filters.gender || ''}
              onChange={e => setFilters(prev => ({ ...prev, gender: e.target.value || undefined }))}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={filters.experience || ''}
              onChange={e => setFilters(prev => ({ ...prev, experience: e.target.value || undefined }))}
            >
              <option value="">All</option>
              {EXPERIENCE_OPTIONS.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
              value={filters.highestQualification || ''}
              onChange={e => setFilters(prev => ({ ...prev, highestQualification: e.target.value || undefined }))}
            >
              <option value="">All</option>
              {QUALIFICATION_OPTIONS.map(qual => (
                <option key={qual} value={qual}>{qual}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills/Technology</label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {SKILLS_OPTIONS.map(skill => (
                <label key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.skills?.includes(skill) || false}
                    onChange={() => handleSkillChange(skill)}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Clear Filters
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}