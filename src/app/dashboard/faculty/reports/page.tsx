'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ChartBarIcon,
  AcademicCapIcon,
  UsersIcon,
  ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Mock report data
const mockReports = [
  {
    id: 1,
    title: 'NAAC Compliance Report',
    description: 'Comprehensive report for NAAC accreditation requirements',
    type: 'NAAC',
    generatedDate: '2025-09-05',
    status: 'completed',
    fileSize: '2.4 MB',
    downloadUrl: '#'
  },
  {
    id: 2,
    title: 'NIRF Data Collection Report',
    description: 'Student activity data formatted for NIRF submission',
    type: 'NIRF',
    generatedDate: '2025-09-03',
    status: 'completed',
    fileSize: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 3,
    title: 'Monthly Activity Summary',
    description: 'August 2025 student activity summary report',
    type: 'Monthly',
    generatedDate: '2025-09-01',
    status: 'completed',
    fileSize: '956 KB',
    downloadUrl: '#'
  },
  {
    id: 4,
    title: 'Semester Performance Report',
    description: 'Comprehensive semester-wise student performance analysis',
    type: 'Academic',
    generatedDate: '2025-08-28',
    status: 'completed',
    fileSize: '3.2 MB',
    downloadUrl: '#'
  }
];

const mockReportTemplates = [
  {
    id: 1,
    name: 'NAAC Self-Study Report',
    description: 'Complete NAAC accreditation report with all required metrics',
    category: 'Compliance',
    estimatedTime: '5-10 minutes',
    icon: <DocumentTextIcon className="w-6 h-6" />
  },
  {
    id: 2,
    name: 'NIRF Data Report',
    description: 'NIRF ranking data collection and formatting',
    category: 'Compliance',
    estimatedTime: '3-5 minutes',
    icon: <ChartBarIcon className="w-6 h-6" />
  },
  {
    id: 3,
    name: 'Student Activity Summary',
    description: 'Detailed breakdown of student activities by category',
    category: 'Academic',
    estimatedTime: '2-3 minutes',
    icon: <AcademicCapIcon className="w-6 h-6" />
  },
  {
    id: 4,
    name: 'Faculty Mentorship Report',
    description: 'Faculty mentoring activities and student progress tracking',
    category: 'Faculty',
    estimatedTime: '3-5 minutes',
    icon: <UsersIcon className="w-6 h-6" />
  },
  {
    id: 5,
    name: 'Custom Date Range Report',
    description: 'Generate reports for specific date ranges and criteria',
    category: 'Custom',
    estimatedTime: '2-8 minutes',
    icon: <CalendarIcon className="w-6 h-6" />
  }
];

// Report Card Component
const ReportCard: React.FC<{ report: any }> = ({ report }) => {
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: 'bg-green-500/20 text-green-500',
      processing: 'bg-yellow-500/20 text-yellow-500',
      failed: 'bg-red-500/20 text-red-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{report.title}</h4>
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
        <button className="btn btn-sm btn-primary flex items-center">
          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
          Download
        </button>
        <button className="btn btn-sm btn-secondary flex items-center">
          <EyeIcon className="w-4 h-4 mr-1" />
          Preview
        </button>
      </div>
    </div>
  );
};

// Report Template Card Component
const ReportTemplateCard: React.FC<{ 
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
          <p className="text-sm text-gray-400 mb-2">{template.description}</p>
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
const GenerateReportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  template: any;
}> = ({ isOpen, onClose, template }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [includeOptions, setIncludeOptions] = useState({
    activities: true,
    students: true,
    analytics: false,
    attachments: false
  });

  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-semibold mb-4">Generate {template.name}</h3>
        
        <div className="space-y-4">
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

          {/* Include Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Include in Report
            </label>
            <div className="space-y-2">
              {Object.entries(includeOptions).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setIncludeOptions({
                      ...includeOptions,
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

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Export Format
            </label>
            <select className="input">
              <option value="pdf">PDF Document</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV File</option>
              <option value="word">Word Document</option>
            </select>
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
              // Here you would typically make an API call to generate the report
              console.log('Generating report with options:', { dateRange, includeOptions, template });
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

export default function FacultyReports() {
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
        title="Faculty Reports" 
        subtitle="Generate comprehensive reports for NAAC, NIRF, and institutional requirements" 
      />

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="card text-center">
          <DocumentTextIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{mockReports.length}</p>
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
          <p className="text-2xl font-bold text-white">145</p>
          <p className="text-sm text-gray-400">Downloads</p>
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
            <option value="faculty">Faculty</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {filteredTemplates.map((template) => (
            <ReportTemplateCard 
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
          <h3 className="text-xl font-semibold">Recent Reports</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm">
            View All Reports
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {mockReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Scheduled Reports</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
            <div>
              <p className="font-medium text-white">Monthly Activity Summary</p>
              <p className="text-sm text-gray-400">Auto-generated on 1st of each month</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-400">Active</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded">
            <div>
              <p className="font-medium text-white">NAAC Quarterly Report</p>
              <p className="text-sm text-gray-400">Auto-generated every quarter</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-green-400">Active</span>
              <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
            </div>
          </div>
          
          <button className="w-full p-3 border-2 border-dashed border-gray-600 rounded text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
            + Add Scheduled Report
          </button>
        </div>
      </div>

      {/* Generate Report Modal */}
      <GenerateReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        template={selectedTemplate}
      />
    </div>
  );
}
