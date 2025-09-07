'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

// Mock faculty profile data
const mockFacultyProfile = {
  personalInfo: {
    name: 'Prof. Sarah Johnson',
    employeeId: 'FAC2023001',
    email: 'sarah.johnson@university.edu',
    phone: '+1-555-0123',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    joiningDate: '2018-08-15',
    profilePicture: '/api/placeholder/150/150'
  },
  academicInfo: {
    qualification: 'Ph.D. in Computer Science',
    specialization: 'Machine Learning, Data Mining',
    experience: '8 years',
    publications: 24,
    researchProjects: 6,
    guidedStudents: 145
  },
  contactInfo: {
    officeRoom: 'Block-A, Room 301',
    officeHours: 'Monday-Friday, 2:00 PM - 4:00 PM',
    alternateEmail: 'sarah.j.research@gmail.com',
    emergencyContact: '+1-555-0456'
  },
  mentorshipStats: {
    currentStudents: 45,
    graduatedStudents: 100,
    avgApprovalTime: '2.3 days',
    totalActivitiesReviewed: 1250
  }
};

const mockNotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  submissionAlerts: true,
  weeklyReports: false,
  monthlyDigest: true,
  systemUpdates: true
};

export default function FacultyProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [profileData, setProfileData] = useState(mockFacultyProfile);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'academic', label: 'Academic Info', icon: <AcademicCapIcon className="w-5 h-5" /> },
    { id: 'contact', label: 'Contact Info', icon: <EnvelopeIcon className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <CogIcon className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <ShieldCheckIcon className="w-5 h-5" /> }
  ];

  const handleSave = () => {
    // Here you would typically make an API call to save the profile data
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    // Here you would typically make an API call to change the password
    console.log('Changing password');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordFields(false);
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img 
            src={profileData.personalInfo.profilePicture} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover bg-gray-700"
          />
          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <UserIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{profileData.personalInfo.name}</h3>
          <p className="text-gray-400">{profileData.personalInfo.designation}</p>
          <p className="text-gray-400">{profileData.personalInfo.department}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.personalInfo.name}
            onChange={(e) => setProfileData({
              ...profileData,
              personalInfo: { ...profileData.personalInfo, name: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Employee ID</label>
          <input
            type="text"
            value={profileData.personalInfo.employeeId}
            disabled
            className="input bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profileData.personalInfo.email}
            onChange={(e) => setProfileData({
              ...profileData,
              personalInfo: { ...profileData.personalInfo, email: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={profileData.personalInfo.phone}
            onChange={(e) => setProfileData({
              ...profileData,
              personalInfo: { ...profileData.personalInfo, phone: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
          <input
            type="text"
            value={profileData.personalInfo.department}
            disabled
            className="input bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Joining Date</label>
          <input
            type="date"
            value={profileData.personalInfo.joiningDate}
            disabled
            className="input bg-gray-700"
          />
        </div>
      </div>
    </div>
  );

  const renderAcademicInfo = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Qualification</label>
          <input
            type="text"
            value={profileData.academicInfo.qualification}
            onChange={(e) => setProfileData({
              ...profileData,
              academicInfo: { ...profileData.academicInfo, qualification: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
          <input
            type="text"
            value={profileData.academicInfo.specialization}
            onChange={(e) => setProfileData({
              ...profileData,
              academicInfo: { ...profileData.academicInfo, specialization: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
          <input
            type="text"
            value={profileData.academicInfo.experience}
            onChange={(e) => setProfileData({
              ...profileData,
              academicInfo: { ...profileData.academicInfo, experience: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-white">{profileData.academicInfo.publications}</h4>
          <p className="text-gray-400">Publications</p>
        </div>
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-white">{profileData.academicInfo.researchProjects}</h4>
          <p className="text-gray-400">Research Projects</p>
        </div>
        <div className="card text-center">
          <h4 className="text-2xl font-bold text-white">{profileData.academicInfo.guidedStudents}</h4>
          <p className="text-gray-400">Students Guided</p>
        </div>
      </div>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Office Room</label>
          <input
            type="text"
            value={profileData.contactInfo.officeRoom}
            onChange={(e) => setProfileData({
              ...profileData,
              contactInfo: { ...profileData.contactInfo, officeRoom: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Office Hours</label>
          <input
            type="text"
            value={profileData.contactInfo.officeHours}
            onChange={(e) => setProfileData({
              ...profileData,
              contactInfo: { ...profileData.contactInfo, officeHours: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Alternate Email</label>
          <input
            type="email"
            value={profileData.contactInfo.alternateEmail}
            onChange={(e) => setProfileData({
              ...profileData,
              contactInfo: { ...profileData.contactInfo, alternateEmail: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Emergency Contact</label>
          <input
            type="tel"
            value={profileData.contactInfo.emergencyContact}
            onChange={(e) => setProfileData({
              ...profileData,
              contactInfo: { ...profileData.contactInfo, emergencyContact: e.target.value }
            })}
            disabled={!isEditing}
            className="input"
          />
        </div>
      </div>

      {/* Mentorship Statistics */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Mentorship Statistics</h4>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="card text-center">
            <h4 className="text-2xl font-bold text-white">{profileData.mentorshipStats.currentStudents}</h4>
            <p className="text-gray-400">Current Students</p>
          </div>
          <div className="card text-center">
            <h4 className="text-2xl font-bold text-white">{profileData.mentorshipStats.graduatedStudents}</h4>
            <p className="text-gray-400">Graduated Students</p>
          </div>
          <div className="card text-center">
            <h4 className="text-2xl font-bold text-white">{profileData.mentorshipStats.avgApprovalTime}</h4>
            <p className="text-gray-400">Avg Approval Time</p>
          </div>
          <div className="card text-center">
            <h4 className="text-2xl font-bold text-white">{profileData.mentorshipStats.totalActivitiesReviewed}</h4>
            <p className="text-gray-400">Activities Reviewed</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold flex items-center">
        <BellIcon className="w-5 h-5 mr-2" />
        Notification Settings
      </h4>
      
      <div className="space-y-4">
        {Object.entries(notificationSettings).map(([setting, value]) => (
          <div key={setting} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white capitalize">
                {setting.replace(/([A-Z])/g, ' $1')}
              </p>
              <p className="text-sm text-gray-400">
                {setting === 'emailNotifications' && 'Receive notifications via email'}
                {setting === 'pushNotifications' && 'Receive browser push notifications'}
                {setting === 'submissionAlerts' && 'Alert when new submissions arrive'}
                {setting === 'weeklyReports' && 'Weekly summary reports'}
                {setting === 'monthlyDigest' && 'Monthly activity digest'}
                {setting === 'systemUpdates' && 'System maintenance and updates'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleNotificationChange(setting, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold flex items-center">
        <KeyIcon className="w-5 h-5 mr-2" />
        Password & Security
      </h4>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h5 className="font-medium text-white">Change Password</h5>
            <p className="text-sm text-gray-400">Update your account password</p>
          </div>
          <button
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="btn btn-secondary"
          >
            {showPasswordFields ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showPasswordFields && (
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                className="absolute right-3 top-8 text-gray-400 hover:text-white"
              >
                {showPasswords.current ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                className="absolute right-3 top-8 text-gray-400 hover:text-white"
              >
                {showPasswords.new ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                className="absolute right-3 top-8 text-gray-400 hover:text-white"
              >
                {showPasswords.confirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            
            <button onClick={handlePasswordChange} className="btn btn-primary">
              Update Password
            </button>
          </div>
        )}
      </div>

      <div className="card">
        <h5 className="font-medium text-white mb-2">Two-Factor Authentication</h5>
        <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
        <button className="btn btn-secondary">Enable 2FA</button>
      </div>

      <div className="card">
        <h5 className="font-medium text-white mb-2">Login Sessions</h5>
        <p className="text-sm text-gray-400 mb-4">Manage your active login sessions</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
            <div>
              <p className="text-sm text-white">Current Session - Windows PC</p>
              <p className="text-xs text-gray-400">IP: 192.168.1.100 - Active now</p>
            </div>
            <span className="text-green-400 text-xs">Current</span>
          </div>
          <button className="text-red-400 hover:text-red-300 text-sm">Sign out all other sessions</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Header 
        title="Faculty Profile" 
        subtitle="Manage your profile information and account settings" 
      />

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'academic' && renderAcademicInfo()}
        {activeTab === 'contact' && renderContactInfo()}
        {activeTab === 'settings' && renderSettings()}
        {activeTab === 'security' && renderSecurity()}
      </div>

      {/* Action Buttons */}
      {activeTab !== 'settings' && activeTab !== 'security' && (
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="btn btn-primary">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}
