'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { DocumentArrowDownIcon, ShareIcon, PencilIcon } from '@heroicons/react/24/outline';

// Mock data - would come from API in a real app
const mockUserData = {
  name: 'John Doe',
  rollNumber: 'CS2023001',
  department: 'Computer Science',
  batch: '2023-2027',
  email: 'john.doe@university.edu',
  phone: '(123) 456-7890',
  careerObjective: 'Aspiring software developer with interest in AI/ML and web technologies. Looking for opportunities to apply my skills in a dynamic environment.',
  profilePhoto: '/profile-placeholder.jpg',
};

const mockActivities = [
  {
    id: 1,
    title: 'Java Programming Certificate',
    type: 'Certificate',
    date: 'Sep 5, 2025',
    issuer: 'Oracle',
    description: 'Oracle Java SE Professional Certification',
  },
  {
    id: 2,
    title: 'Tech Conference',
    type: 'Event',
    date: 'Aug 15, 2025',
    issuer: 'DevCon',
    description: 'Attended DevCon 2025',
  },
  {
    id: 5,
    title: 'Machine Learning Internship',
    type: 'Internship',
    date: 'Jun 10, 2025',
    issuer: 'TechCorp',
    description: 'Summer internship at TechCorp working on ML algorithms',
  },
  {
    id: 6,
    title: 'Python for Data Science',
    type: 'Certificate',
    date: 'May 20, 2025',
    issuer: 'DataCamp',
    description: 'Completed Python for Data Science course',
  },
  {
    id: 7,
    title: 'Smart Home Automation',
    type: 'Project',
    date: 'Apr 15, 2025',
    issuer: 'University Project',
    description: 'IoT project for home automation using Arduino and Raspberry Pi',
  },
];

// Profile Edit Modal Component
interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  onSave: (data: any) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave
}) => {
  const [formData, setFormData] = useState(userData);
  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Profile</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div>
            <label className="form-label">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden">
                <img 
                  src={userData.profilePhoto} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                className="form-input"
                onChange={handleFileChange}
              />
            </div>
          </div>
          
          {/* Basic Info */}
          <div>
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="form-label">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="careerObjective" className="form-label">Career Objective</label>
            <textarea
              id="careerObjective"
              name="careerObjective"
              rows={3}
              className="form-input"
              value={formData.careerObjective}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Group activities by type for portfolio display
function groupActivitiesByType(activities: any[]) {
  return activities.reduce((groups: any, activity) => {
    const { type } = activity;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(activity);
    return groups;
  }, {});
}

// Portfolio Page Component
export default function PortfolioPage() {
  const [userData, setUserData] = useState(mockUserData);
  const [activities, setActivities] = useState(mockActivities);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const groupedActivities = groupActivitiesByType(activities);
  
  const handleSaveProfile = (updatedData: any) => {
    setUserData(updatedData);
    // In a real app, would send to API here
  };
  
  const generatePDF = () => {
    // In a real implementation, would use jsPDF or similar library
    alert('Generating PDF... This would download a PDF in a real implementation.');
  };
  
  const sharePortfolio = () => {
    // In a real implementation, would generate a shareable link
    alert('Generating shareable link... This would create a shareable link in a real implementation.');
  };

  return (
    <div className="space-y-8">
      <Header 
        title="Portfolio" 
        subtitle="Your verified achievements and experiences" 
      />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={generatePDF}
          className="btn btn-primary flex items-center gap-2"
        >
          <DocumentArrowDownIcon className="h-5 w-5" />
          Download PDF
        </button>
        <button 
          onClick={sharePortfolio}
          className="btn btn-secondary flex items-center gap-2"
        >
          <ShareIcon className="h-5 w-5" />
          Share Portfolio
        </button>
      </div>

      {/* Profile Section */}
      <div className="card">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Personal Profile</h3>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="btn btn-secondary flex items-center gap-1"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden">
            <img 
              src={userData.profilePhoto} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-2xl font-bold text-white">{userData.name}</h4>
              <p className="text-gray-400">{userData.rollNumber} | {userData.department}</p>
              <p className="text-gray-400">Batch: {userData.batch}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-400">Email:</p>
                <p>{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone:</p>
                <p>{userData.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400">Career Objective:</p>
              <p className="text-sm">{userData.careerObjective}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities by Type */}
      <div className="space-y-6">
        {Object.entries(groupedActivities).map(([type, activities]: [string, any]) => (
          <div key={type} className="card">
            <h3 className="text-xl font-bold mb-4">{type}s</h3>
            <div className="space-y-4">
              {activities.map((activity: any) => (
                <div key={activity.id} className="p-4 bg-gray-700 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium text-white">{activity.title}</h4>
                    <span className="text-sm text-gray-400">{activity.date}</span>
                  </div>
                  <p className="text-sm text-gray-300">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-2">Issuer: {activity.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
