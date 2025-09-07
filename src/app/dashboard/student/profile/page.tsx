'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline';

// Mock user data
const mockUserData = {
  // Personal Info
  name: 'John Doe',
  rollNumber: 'CS2023001',
  department: 'Computer Science',
  batch: '2023-2027',
  email: 'john.doe@university.edu',
  phone: '(123) 456-7890',
  dateOfBirth: '2005-03-15',
  address: '123 University Street, College Town, ST 12345',
  
  // Academic Info
  currentSemester: '5th Semester',
  cgpa: '8.75',
  
  // Profile Settings
  profilePhoto: '/profile-placeholder.jpg',
  careerObjective: 'Aspiring software developer with interest in AI/ML and web technologies. Looking for opportunities to apply my skills in a dynamic environment.',
  
  // Account Settings
  notificationSettings: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
    activityReminders: true
  }
};

// Edit Personal Info Modal
interface EditPersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  onSave: (data: any) => void;
}

const EditPersonalInfoModal: React.FC<EditPersonalInfoModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave
}) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Personal Information</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              className="form-input"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className="form-input"
              value={formData.address}
              onChange={handleChange}
            />
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
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Change Password Modal
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (passwords: any) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev: any) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev: any) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    onSave(passwords);
    onClose();
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Change Password</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                className="form-input pr-10"
                value={passwords.currentPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? 
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : 
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                className="form-input pr-10"
                value={passwords.newPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? 
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : 
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="form-input pr-10"
                value={passwords.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? 
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" /> : 
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                }
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleSaveProfile = (updatedData: any) => {
    setUserData(updatedData);
    // In a real app, would send to API here
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (passwords: any) => {
    // In a real app, would send to API here
    alert('Password changed successfully!');
  };

  const handleNotificationChange = (setting: string) => {
    setUserData((prev: any) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [setting]: !prev.notificationSettings[setting]
      }
    }));
  };

  return (
    <div className="space-y-8">
      <Header 
        title="Profile & Settings" 
        subtitle="Manage your account and preferences" 
      />

      {/* Personal Information */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Personal Information</h3>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="btn btn-secondary flex items-center gap-1"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="font-medium mb-4">Basic Information</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-white">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Roll Number</p>
                <p className="text-white">{userData.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Department</p>
                <p className="text-white">{userData.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Batch</p>
                <p className="text-white">{userData.batch}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{userData.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Date of Birth</p>
                <p className="text-white">{userData.dateOfBirth}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Address</h4>
          <p className="text-gray-300">{userData.address}</p>
        </div>

        <div className="mt-6">
          <h4 className="font-medium mb-2">Career Objective</h4>
          <p className="text-gray-300">{userData.careerObjective}</p>
        </div>
      </div>

      {/* Academic Information */}
      <div className="card">
        <h3 className="text-xl font-bold mb-6">Academic Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">Current Semester</p>
            <p className="text-white">{userData.currentSemester}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">CGPA</p>
            <p className="text-white">{userData.cgpa}</p>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Account Security</h3>
          <button 
            onClick={() => setIsPasswordModalOpen(true)}
            className="btn btn-secondary"
          >
            Change Password
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-700 rounded-lg">
            <p className="text-sm">Password last changed: August 15, 2025</p>
            <p className="text-xs text-gray-400 mt-1">
              For security, we recommend changing your password every 90 days.
            </p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h3 className="text-xl font-bold mb-6">Notification Settings</h3>
        <div className="space-y-4">
          {Object.entries(userData.notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-400">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications in browser'}
                  {key === 'weeklyReports' && 'Weekly summary of your activities'}
                  {key === 'activityReminders' && 'Reminders for pending submissions'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={() => handleNotificationChange(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <EditPersonalInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={userData}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handleChangePassword}
      />
    </div>
  );
}
