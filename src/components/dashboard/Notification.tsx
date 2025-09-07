import React from 'react';

interface NotificationProps {
  title: string;
  message: string;
  time: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  read?: boolean;
  onClick?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  time,
  type = 'info',
  read = false,
  onClick
}) => {
  const typeClasses = {
    info: 'border-blue-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
    error: 'border-red-500'
  };

  return (
    <div
      className={`notification ${typeClasses[type]} ${!read ? 'opacity-100' : 'opacity-75'} cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-white">{title}</h4>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="text-sm text-gray-300 mt-1">{message}</p>
      {!read && (
        <div className="mt-2 flex justify-end">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default Notification;
