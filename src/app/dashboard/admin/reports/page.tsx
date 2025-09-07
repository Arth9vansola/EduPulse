'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  ClockIcon,
  EyeIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

// Mock system reports data
const mockSystemReports = [
  {
    id: 1,
    title: 'NAAC Institutional Report',
    description: 'Comprehensive institutional report for NAAC accreditation',
    type: 'NAAC',
    generatedDate: '2025-09-05',
    status: 'completed',
    fileSize: '15.8 MB',
    downloadUrl: '#',
    scope: 'Institution-wide'
  },
  {
    id: 2,
    title: 'NIRF Data Collection 2025',
    description: 'Complete NIRF ranking data collection and submission',
    type: 'NIRF',
    generatedDate: '2025-09-03',
    status: 'completed',
    fileSize: '8.2 MB',
    downloadUrl: '#',
    scope: 'Institution-wide'
  },
  {
    id: 3,
    title: 'Monthly System Usage Report',
    description: 'August 2025 system usage and performance analytics',
    type: 'System',
    generatedDate: '2025-09-01',
    status: 'completed',
    fileSize: '3.4 MB',
    downloadUrl: '#',
    scope: 'System'
  },
  {
    id: 4,
    title: 'Quarterly Academic Report',
    description: 'Q2 2025 academic performance and activity summary',
    type: 'Academic',
    generatedDate: '2025-08-30',
    status: 'completed',
    fileSize: '12.1 MB',
    downloadUrl: '#',
    scope: 'Academic'
  },
  {
    id: 5,
    title: 'User Audit Report',
    description: 'Security audit and user activity analysis',
    type: 'Security',
    generatedDate: '2025-08-28',
    status: 'processing',
    fileSize: 'Processing...',
    downloadUrl: '#',
    scope: 'Security'
  }
];

const mockReportTemplates = [
  {
    id: 1,
    name: 'NAAC Self-Study Report',
    description: 'Complete institutional self-study report for NAAC submission',
    category: 'Compliance',
    estimatedTime: '15-20 minutes',
    icon: <DocumentTextIcon className="w-6 h-6" />,
    parameters: ['Date Range', 'Departments', 'Academic Year']
  },
  {
    id: 2,
    name: 'NIRF Data Report',
    description: 'NIRF ranking data collection with all required metrics',
    category: 'Compliance',
    estimatedTime: '10-15 minutes',
    icon: <ChartBarIcon className="w-6 h-6" />,
    parameters: ['Academic Year', 'Data Categories']
  },
  {
    id: 3,
    name: 'System Performance Report',
    description: 'Comprehensive system usage and performance analytics',
    category: 'System',
    estimatedTime: '5-8 minutes',
    icon: <Cog6ToothIcon className="w-6 h-6" />,
    parameters: ['Time Period', 'Metrics Selection']
  },
  {
    id: 4,
    name: 'Academic Performance Report',
    description: 'Institution-wide academic performance and activity analysis',
    category: 'Academic',
    estimatedTime: '12-18 minutes',
    icon: <AcademicCapIcon className="w-6 h-6" />,
    parameters: ['Date Range', 'Departments', 'Activity Types']
  },
  {
    id: 5,
    name: 'User Management Report',
    description: 'User statistics, activity logs, and management analytics',
    category: 'Users',
    estimatedTime: '8-12 minutes',
    icon: <UsersIcon className="w-6 h-6" />,
    parameters: ['User Roles', 'Time Period', 'Activity Filters']
  },
  {
    id: 6,
    name: 'Department Comparison Report',
    description: 'Cross-department performance comparison and analysis',
    category: 'Comparative',
    estimatedTime: '10-15 minutes',
    icon: <BuildingOfficeIcon className="w-6 h-6" />,
    parameters: ['Departments', 'Metrics', 'Time Period']
  }
];

// Report Card Component
const SystemReportCard: React.FC<{ report: any }> = ({ report }) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: 'bg-green-500/20 text-green-500',
      processing: 'bg-yellow-500/20 text-yellow-500',
      failed: 'bg-red-500/20 text-red-500',
      scheduled: 'bg-blue-500/20 text-blue-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getScopeColor = (scope: string) => {
    const colors = {
      'Institution-wide': 'text-purple-400',
      'Academic': 'text-blue-400',
      'System': 'text-green-400',
      'Security': 'text-red-400'
    };
    return colors[scope as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-white">{report.title}</h4>
            <span className={`text-xs px-2 py-1 rounded ${getScopeColor(report.scope)} bg-gray-700`}>
              {report.scope}
            </span>
          </div>
          <p className="text-sm text-gray-400 mb-2">{report.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Generated: {report.generatedDate}</span>
            <span>Size: {report.fileSize}</span>
            <span>Type: {report.type}</span>
          </div>
        </div>
        <div className="ml-4">
          {getStatusBadge(report.status)}
        </div>
      </div>
      
      <div className="flex space-x-2">
        {report.status === 'completed' && (
          <>
            <button className="btn btn-sm btn-primary flex items-center">
              <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
              Download
            </button>
            <button className="btn btn-sm btn-secondary flex items-center">
              <EyeIcon className="w-4 h-4 mr-1" />
              Preview
            </button>
          </>
        )}
        {report.status === 'processing' && (
          <button className="btn btn-sm btn-secondary" disabled>
            <ClockIcon className="w-4 h-4 mr-1" />
            Processing...
          </button>
        )}
      </div>
    </div>
  );
};

// Report Template Card Component
const AdminReportTemplateCard: React.FC<{ 
  template: any; 
  onGenerate: (templateId: number) => void;
}> = ({ template, onGenerate }) => {
  return (
    <div className="card">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-blue-500/20 text-blue-500 rounded">
          {template.icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{template.name}</h4>
          <p className="text-sm text-gray-400 mb-3">{template.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {template.parameters.map((param: string, index: number) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                {param}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {template.estimatedTime}
              </span>
              <span className="px-2 py-1 bg-gray-700 rounded text-gray-300">
                {template.category}
              </span>
            </div>
            <button 
              onClick={() => onGenerate(template.id)}
              className="btn btn-sm btn-primary"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate Report Modal Component
const AdminGenerateReportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  template: any;
}> = ({ isOpen, onClose, template }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [reportOptions, setReportOptions] = useState({
    includeCharts: true,
    includeTables: true,
    includeAnalytics: true,
    includeRecommendations: false,
    confidential: false
  });

  if (!isOpen || !template) return null;

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'All Departments'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Generate {template.name}</h3>
        
        <div className="space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                className="input"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                className="input"
              />
            </div>
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Departments
            </label>
            <div className="grid grid-cols-2 gap-2">
              {departments.map((dept) => (
                <label key={dept} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(dept)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDepartments([...selectedDepartments, dept]);
                      } else {
                        setSelectedDepartments(selectedDepartments.filter(d => d !== dept));
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Report Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Report Components
            </label>
            <div className="space-y-2">
              {Object.entries(reportOptions).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setReportOptions({
                      ...reportOptions,
                      [key]: e.target.checked
                    })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Output Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Export Format
              </label>
              <select className="input">
                <option value="pdf">PDF Document</option>
                <option value="excel">Excel Workbook</option>
                <option value="word">Word Document</option>
                <option value="pptx">PowerPoint Presentation</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Delivery Method
              </label>
              <select className="input">
                <option value="download">Direct Download</option>
                <option value="email">Email to Admin</option>
                <option value="scheduled">Schedule Generation</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onClose}
            className="btn btn-secondary flex-1"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              console.log('Generating admin report with options:', { 
                dateRange, 
                selectedDepartments, 
                reportOptions, 
                template 
              });
              onClose();
            }}
            className="btn btn-primary flex-1"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AdminReports() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleGenerateReport = (templateId: number) => {
    const template = mockReportTemplates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    setIsModalOpen(true);
  };

  const filteredTemplates = selectedCategory === 'all' 
    ? mockReportTemplates 
    : mockReportTemplates.filter(template => 
        template.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="space-y-8">
      <Header 
        title="System Reports" 
        subtitle="Generate comprehensive institutional and system reports" 
      />

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-5">
        <div className="card text-center">
          <DocumentTextIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{mockSystemReports.length}</p>
          <p className="text-sm text-gray-400">Total Reports</p>
        </div>
        <div className="card text-center">
          <ChartBarIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">2</p>
          <p className="text-sm text-gray-400">Compliance Reports</p>
        </div>
        <div className="card text-center">
          <CalendarIcon className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-sm text-gray-400">This Month</p>
        </div>
        <div className="card text-center">
          <ArrowDownTrayIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">847</p>
          <p className="text-sm text-gray-400">Downloads</p>
        </div>
        <div className="card text-center">
          <ClockIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">1</p>
          <p className="text-sm text-gray-400">Processing</p>
        </div>
      </div>

      {/* Report Templates */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Generate New Report</h3>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Categories</option>
            <option value="compliance">Compliance</option>
            <option value="academic">Academic</option>
            <option value="system">System</option>
            <option value="users">Users</option>
            <option value="comparative">Comparative</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredTemplates.map((template) => (
            <AdminReportTemplateCard 
              key={template.id} 
              template={template} 
              onGenerate={handleGenerateReport}
            />
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Recent System Reports</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            View All Reports
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {mockSystemReports.map((report) => (
            <SystemReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Scheduled Reports</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
            <div>
              <p className="font-medium text-white">Monthly System Report</p>
              <p className="text-sm text-gray-400">Auto-generated on 1st of each month</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-400">Active</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
            <div>
              <p className="font-medium text-white">Quarterly NAAC Report</p>
              <p className="text-sm text-gray-400">Auto-generated every quarter</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-400">Active</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
            <div>
              <p className="font-medium text-white">Weekly Security Audit</p>
              <p className="text-sm text-gray-400">Auto-generated every Monday</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-yellow-400">Paused</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Enable</button>
            </div>
          </div>
          
          <button className="w-full p-3 border-2 border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            + Add Scheduled Report
          </button>
        </div>
      </div>

      {/* Generate Report Modal */}
      <AdminGenerateReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  );
}
