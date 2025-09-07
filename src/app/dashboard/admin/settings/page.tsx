'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  GlobeAltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  EnvelopeIcon,
  KeyIcon,
  ServerIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

// Mock settings data
const mockSystemSettings = {
  general: {
    institutionName: 'University of Technology',
    institutionCode: 'UOT2023',
    academicYear: '2023-2024',
    timezone: 'Asia/Kolkata',
    language: 'English',
    currency: 'INR'
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
      expiryDays: 90
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelisting: false
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    digestFrequency: 'weekly',
    systemAlerts: true
  },
  backup: {
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    backupLocation: 'cloud',
    lastBackup: '2025-09-07 02:00:00'
  },
  integrations: {
    naacIntegration: true,
    nirfIntegration: true,
    emailService: 'smtp',
    cloudStorage: 'aws',
    analyticsService: 'enabled'
  }
};

const mockDepartments = [
  { id: 1, name: 'Computer Science', code: 'CS', status: 'active', headOfDept: 'Dr. Smith' },
  { id: 2, name: 'Electronics', code: 'EC', status: 'active', headOfDept: 'Prof. Johnson' },
  { id: 3, name: 'Mechanical', code: 'ME', status: 'active', headOfDept: 'Dr. Williams' },
  { id: 4, name: 'Civil', code: 'CE', status: 'active', headOfDept: 'Prof. Brown' }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(mockSystemSettings);
  const [departments, setDepartments] = useState(mockDepartments);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: <CogIcon className="w-5 h-5" /> },
    { id: 'security', label: 'Security', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'departments', label: 'Departments', icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: 'backup', label: 'Backup & Storage', icon: <CircleStackIcon className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <GlobeAltIcon className="w-5 h-5" /> }
  ];

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleNestedSettingChange = (section: string, subsection: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    // Show success notification
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <CogIcon className="w-5 h-5 mr-2" />
        General Settings
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Institution Name</label>
          <input
            type="text"
            value={settings.general.institutionName}
            onChange={(e) => handleSettingChange('general', 'institutionName', e.target.value)}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Institution Code</label>
          <input
            type="text"
            value={settings.general.institutionCode}
            onChange={(e) => handleSettingChange('general', 'institutionCode', e.target.value)}
            className="input"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Academic Year</label>
          <select
            value={settings.general.academicYear}
            onChange={(e) => handleSettingChange('general', 'academicYear', e.target.value)}
            className="input"
          >
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2025-2026">2025-2026</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="input"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="input"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Bengali">Bengali</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
          <select
            value={settings.general.currency}
            onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
            className="input"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <ShieldCheckIcon className="w-5 h-5 mr-2" />
        Security Settings
      </h3>
      
      <div className="space-y-6">
        <div className="card">
          <h4 className="font-medium mb-4">Password Policy</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Length</label>
              <input
                type="number"
                min="6"
                max="20"
                value={settings.security.passwordPolicy.minLength}
                onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password Expiry (days)</label>
              <input
                type="number"
                min="30"
                max="365"
                value={settings.security.passwordPolicy.expiryDays}
                onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'expiryDays', parseInt(e.target.value))}
                className="input"
              />
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.passwordPolicy.requireSpecialChars}
                onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Require special characters</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.passwordPolicy.requireNumbers}
                onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Require numbers</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.passwordPolicy.requireUppercase}
                onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Require uppercase letters</span>
            </label>
          </div>
        </div>

        <div className="card">
          <h4 className="font-medium mb-4">Session & Access Control</h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Login Attempts</label>
              <input
                type="number"
                min="3"
                max="10"
                value={settings.security.maxLoginAttempts}
                onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                className="input"
              />
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Enable Two-Factor Authentication</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security.ipWhitelisting}
                onChange={(e) => handleSettingChange('security', 'ipWhitelisting', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Enable IP Whitelisting</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <BellIcon className="w-5 h-5 mr-2" />
        Notification Settings
      </h3>
      
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Email Notifications</p>
            <p className="text-sm text-gray-400">Send system notifications via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </label>

        <label className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Push Notifications</p>
            <p className="text-sm text-gray-400">Browser push notifications for real-time updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </label>

        <label className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">SMS Notifications</p>
            <p className="text-sm text-gray-400">Critical alerts via SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </label>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Digest Frequency</label>
          <select
            value={settings.notifications.digestFrequency}
            onChange={(e) => handleSettingChange('notifications', 'digestFrequency', e.target.value)}
            className="input"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="never">Never</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderDepartmentSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2" />
          Department Management
        </h3>
        <button className="btn btn-primary">Add Department</button>
      </div>
      
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Code</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Head of Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white font-medium">{dept.name}</td>
                  <td className="py-3 px-4 text-gray-300">{dept.code}</td>
                  <td className="py-3 px-4 text-gray-300">{dept.headOfDept}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">
                      {dept.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <CircleStackIcon className="w-5 h-5 mr-2" />
        Backup & Storage Settings
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h4 className="font-medium mb-4">Automatic Backup</h4>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.backup.autoBackup}
                onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-300">Enable automatic backup</span>
            </label>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency</label>
              <select
                value={settings.backup.backupFrequency}
                onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
                className="input"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Retention Period (days)</label>
              <input
                type="number"
                min="7"
                max="365"
                value={settings.backup.retentionPeriod}
                onChange={(e) => handleSettingChange('backup', 'retentionPeriod', parseInt(e.target.value))}
                className="input"
              />
            </div>
          </div>
        </div>
        
        <div className="card">
          <h4 className="font-medium mb-4">Storage Configuration</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Backup Location</label>
              <select
                value={settings.backup.backupLocation}
                onChange={(e) => handleSettingChange('backup', 'backupLocation', e.target.value)}
                className="input"
              >
                <option value="local">Local Storage</option>
                <option value="cloud">Cloud Storage</option>
                <option value="both">Both Local & Cloud</option>
              </select>
            </div>
            
            <div className="p-3 bg-gray-700/50 rounded">
              <p className="text-sm text-gray-300">Last Backup:</p>
              <p className="font-medium text-white">{settings.backup.lastBackup}</p>
            </div>
            
            <button className="btn btn-secondary w-full">
              Run Manual Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center">
        <GlobeAltIcon className="w-5 h-5 mr-2" />
        Integration Settings
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card">
          <h4 className="font-medium mb-4">Compliance Integrations</h4>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">NAAC Integration</p>
                <p className="text-sm text-gray-400">Connect with NAAC systems</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integrations.naacIntegration}
                  onChange={(e) => handleSettingChange('integrations', 'naacIntegration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">NIRF Integration</p>
                <p className="text-sm text-gray-400">Connect with NIRF systems</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.integrations.nirfIntegration}
                  onChange={(e) => handleSettingChange('integrations', 'nirfIntegration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </label>
          </div>
        </div>
        
        <div className="card">
          <h4 className="font-medium mb-4">Service Integrations</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Service</label>
              <select
                value={settings.integrations.emailService}
                onChange={(e) => handleSettingChange('integrations', 'emailService', e.target.value)}
                className="input"
              >
                <option value="smtp">SMTP</option>
                <option value="sendgrid">SendGrid</option>
                <option value="aws-ses">AWS SES</option>
                <option value="mailgun">Mailgun</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cloud Storage</label>
              <select
                value={settings.integrations.cloudStorage}
                onChange={(e) => handleSettingChange('integrations', 'cloudStorage', e.target.value)}
                className="input"
              >
                <option value="aws">AWS S3</option>
                <option value="azure">Azure Blob</option>
                <option value="gcp">Google Cloud</option>
                <option value="local">Local Storage</option>
              </select>
            </div>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.integrations.analyticsService === 'enabled'}
                onChange={(e) => handleSettingChange('integrations', 'analyticsService', e.target.checked ? 'enabled' : 'disabled')}
                className="mr-2"
              />
              <span className="text-gray-300">Enable Analytics Service</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <Header 
        title="System Settings" 
        subtitle="Configure system-wide settings and preferences" 
      />

      {/* Save Changes Alert */}
      {hasChanges && (
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ClockIcon className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-yellow-500">You have unsaved changes</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setHasChanges(false)}
              className="btn btn-secondary btn-sm"
            >
              Discard
            </button>
            <button 
              onClick={handleSaveSettings}
              className="btn btn-primary btn-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
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
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'departments' && renderDepartmentSettings()}
        {activeTab === 'backup' && renderBackupSettings()}
        {activeTab === 'integrations' && renderIntegrationSettings()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="btn btn-secondary">
          Reset to Defaults
        </button>
        <button 
          onClick={handleSaveSettings}
          className="btn btn-primary flex items-center"
          disabled={!hasChanges}
        >
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          Save All Settings
        </button>
      </div>
    </div>
  );
}
