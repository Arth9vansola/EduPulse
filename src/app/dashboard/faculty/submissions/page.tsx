'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { MagnifyingGlassIcon, EyeIcon } from '@heroicons/react/24/outline';

// Mock submissions data
const mockSubmissions = [
  {
    id: 1,
    studentName: 'John Doe',
    rollNumber: 'CS2023001',
    activityType: 'Certificate',
    activityTitle: 'AWS Cloud Practitioner',
    description: 'AWS Cloud Practitioner certification from Amazon Web Services',
    submissionDate: 'Sep 6, 2025',
    status: 'pending',
    attachments: ['aws-certificate.pdf']
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    rollNumber: 'CS2023002',
    activityType: 'Project',
    activityTitle: 'E-commerce Website',
    description: 'Full-stack e-commerce website built with React and Node.js',
    submissionDate: 'Sep 5, 2025',
    status: 'pending',
    attachments: ['project-demo.mp4', 'source-code.zip']
  },
  {
    id: 3,
    studentName: 'Mike Johnson',
    rollNumber: 'CS2023003',
    activityType: 'Internship',
    activityTitle: 'Software Development Intern',
    description: 'Summer internship at TechCorp as Software Development Intern',
    submissionDate: 'Sep 4, 2025',
    status: 'reviewed',
    attachments: ['internship-certificate.pdf', 'recommendation-letter.pdf']
  }
];

// Review Modal Component
interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: any;
  onReview: (id: number, action: 'approve' | 'reject', feedback: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, submission, onReview }) => {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (action && submission) {
      onReview(submission.id, action, feedback);
      onClose();
      setAction(null);
      setFeedback('');
    }
  };

  if (!isOpen || !submission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl h-5/6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Review Submission</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Submission Details */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Student Name</label>
              <p className="text-white">{submission.studentName}</p>
            </div>
            <div>
              <label className="form-label">Roll Number</label>
              <p className="text-white">{submission.rollNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Activity Type</label>
              <p className="text-white">{submission.activityType}</p>
            </div>
            <div>
              <label className="form-label">Submission Date</label>
              <p className="text-white">{submission.submissionDate}</p>
            </div>
          </div>

          <div>
            <label className="form-label">Activity Title</label>
            <p className="text-white">{submission.activityTitle}</p>
          </div>

          <div>
            <label className="form-label">Description</label>
            <p className="text-gray-300">{submission.description}</p>
          </div>

          <div>
            <label className="form-label">Attachments</label>
            <div className="space-y-2">
              {submission.attachments.map((file: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-700 rounded">
                  <span className="text-sm">{file}</span>
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Review Actions */}
          <div>
            <label className="form-label">Review Decision</label>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setAction('approve')}
                className={`btn ${action === 'approve' ? 'btn-success' : 'btn-secondary'}`}
              >
                Approve
              </button>
              <button
                onClick={() => setAction('reject')}
                className={`btn ${action === 'reject' ? 'btn-danger' : 'btn-secondary'}`}
              >
                Reject
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="feedback" className="form-label">Feedback</label>
            <textarea
              id="feedback"
              rows={4}
              className="form-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide feedback to the student..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              className="btn btn-primary"
              disabled={!action}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus;
    const matchesSearch = 
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.activityTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleReview = (id: number, action: 'approve' | 'reject', feedback: string) => {
    setSubmissions(submissions.map(submission =>
      submission.id === id 
        ? { ...submission, status: action === 'approve' ? 'approved' : 'rejected', feedback }
        : submission
    ));
  };

  const openReviewModal = (submission: any) => {
    setSelectedSubmission(submission);
    setIsReviewModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: 'bg-yellow-500/20 text-yellow-500',
      reviewed: 'bg-blue-500/20 text-blue-500',
      approved: 'bg-green-500/20 text-green-500',
      rejected: 'bg-red-500/20 text-red-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Submissions Review" 
        subtitle="Review and approve student activity submissions" 
      />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by student name, roll number, or activity..."
            className="form-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Student</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Activity</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-white">{submission.studentName}</p>
                      <p className="text-sm text-gray-400">{submission.rollNumber}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white">{submission.activityTitle}</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">
                        {submission.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{submission.activityType}</td>
                  <td className="py-3 px-4 text-gray-300">{submission.submissionDate}</td>
                  <td className="py-3 px-4">{getStatusBadge(submission.status)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openReviewModal(submission)}
                      className="btn btn-primary flex items-center gap-1 text-sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No submissions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        submission={selectedSubmission}
        onReview={handleReview}
      />
    </div>
  );
}
