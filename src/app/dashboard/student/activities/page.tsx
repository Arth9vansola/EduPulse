'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ActivityCard from '@/components/dashboard/ActivityCard';

// Mock data - would come from API in a real app
const mockActivities = [
  {
    id: 1,
    title: 'Java Programming Certificate',
    type: 'Certificate',
    date: 'Sep 5, 2025',
    status: 'approved',
    description: 'Oracle Java SE Professional Certification',
    feedback: 'Great achievement! This is a valuable industry certification.'
  },
  {
    id: 2,
    title: 'Web Development Project',
    type: 'Project',
    date: 'Aug 28, 2025',
    status: 'pending',
    description: 'E-commerce website built with React and Node.js'
  },
  {
    id: 3,
    title: 'Tech Conference',
    type: 'Event',
    date: 'Aug 15, 2025',
    status: 'approved',
    description: 'Attended DevCon 2025',
    feedback: 'Good networking opportunity. Include more specific learning outcomes next time.'
  },
  {
    id: 4,
    title: 'UI/UX Design Workshop',
    type: 'Workshop',
    date: 'Jul 22, 2025',
    status: 'rejected',
    description: 'Participated in a 2-day workshop on UI/UX design principles',
    feedback: 'Please provide the certificate of participation to get this approved.'
  },
  {
    id: 5,
    title: 'Machine Learning Internship',
    type: 'Internship',
    date: 'Jun 10, 2025',
    status: 'approved',
    description: 'Summer internship at TechCorp working on ML algorithms',
    feedback: 'Excellent work experience. The recommendation letter from your supervisor is impressive.'
  },
];

// Activity types for filter
const activityTypes = [
  'All Types',
  'Certificate',
  'Project',
  'Event',
  'Workshop',
  'Internship',
  'Competition',
  'Publication',
];

// Activity Form Modal Component
interface ActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (activity: any) => void;
}

const ActivityFormModal: React.FC<ActivityFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [activityData, setActivityData] = useState({
    title: '',
    type: 'Certificate',
    date: '',
    description: '',
    file: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...activityData,
      id: Date.now(),
      status: 'pending'
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivityData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setActivityData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Add New Activity</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Activity Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={activityData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="type" className="form-label">Activity Type</label>
            <select
              id="type"
              name="type"
              className="form-select"
              value={activityData.type}
              onChange={handleChange}
              required
            >
              {activityTypes.slice(1).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={activityData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-input"
              rows={3}
              value={activityData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="file" className="form-label">Upload Certificate/Evidence</label>
            <input
              type="file"
              id="file"
              name="file"
              className="form-input"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-400 mt-1">PDF, JPG, or PNG files (max 5MB)</p>
          </div>
          
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="btn btn-secondary mr-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main component
export default function ActivitiesPage() {
  const [activities, setActivities] = useState(mockActivities);
  const [filterType, setFilterType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // Filter and search activities
  const filteredActivities = activities.filter(activity => {
    const matchesType = filterType === 'All Types' || activity.type === filterType;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  // Handle adding new activity
  const handleAddActivity = (newActivity: any) => {
    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Activities" 
        subtitle="Manage and track your activities" 
      />

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search activities..."
            className="form-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            className="form-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {activityTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Activity
        </button>
      </div>

      {/* Activities list */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">No activities found. Try adjusting your search or add a new activity.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredActivities.map((activity) => (
            <ActivityCard 
              key={activity.id}
              title={activity.title}
              type={activity.type}
              date={activity.date}
              status={activity.status as 'pending' | 'approved' | 'rejected'}
              description={activity.description}
              feedback={activity.feedback}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>
      )}

      {/* Activity form modal */}
      <ActivityFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddActivity}
      />
    </div>
  );
}
