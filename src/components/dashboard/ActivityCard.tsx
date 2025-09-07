import React from 'react';

interface ActivityCardProps {
  title: string;
  type: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  feedback?: string;
  onClick?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  type,
  date,
  status,
  description,
  feedback,
  onClick
}) => {
  const statusClasses = {
    pending: 'bg-yellow-500/20 text-yellow-500',
    approved: 'bg-green-500/20 text-green-500',
    rejected: 'bg-red-500/20 text-red-500'
  };

  const statusLabels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected'
  };

  return (
    <div className="card cursor-pointer" onClick={onClick}>
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      
      <div className="mt-2 flex items-center text-sm text-gray-400">
        <span className="mr-3">{type}</span>
        <span>{date}</span>
      </div>
      
      {description && (
        <p className="mt-3 text-sm text-gray-300">{description}</p>
      )}
      
      {feedback && status !== 'pending' && (
        <div className="mt-4 p-3 bg-gray-700 rounded-md">
          <p className="text-sm font-medium mb-1">Feedback:</p>
          <p className="text-sm text-gray-300">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
