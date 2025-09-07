'use client';

import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import { PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@university.edu',
    role: 'student',
    rollNumber: 'CS2023001',
    department: 'Computer Science',
    batch: '2023-2027',
    status: 'active',
    lastLogin: '2025-09-06'
  },
  {
    id: 2,
    name: 'Prof. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'faculty',
    department: 'Computer Science',
    status: 'active',
    lastLogin: '2025-09-06'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    role: 'student',
    rollNumber: 'CS2023002',
    department: 'Computer Science',
    batch: '2023-2027',
    status: 'active',
    lastLogin: '2025-09-05'
  }
];

// Add/Edit User Modal
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  onSave: (userData: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    role: 'student',
    rollNumber: '',
    department: '',
    batch: '',
    status: 'active'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: user?.id || Date.now() });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{user ? 'Edit User' : 'Add New User'}</h3>
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
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          {formData.role === 'student' && (
            <>
              <div>
                <label htmlFor="rollNumber" className="form-label">Roll Number</label>
                <input
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  className="form-input"
                  value={formData.rollNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="batch" className="form-label">Batch</label>
                <input
                  type="text"
                  id="batch"
                  name="batch"
                  className="form-input"
                  value={formData.batch}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          
          <div>
            <label htmlFor="department" className="form-label">Department</label>
            <select
              id="department"
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? 'Update User' : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.rollNumber && user.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(user => user.id === userData.id ? userData : user));
    } else {
      setUsers([...users, userData]);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const getRoleBadge = (role: string) => {
    const roleStyles = {
      student: 'bg-blue-500/20 text-blue-500',
      faculty: 'bg-green-500/20 text-green-500',
      admin: 'bg-purple-500/20 text-purple-500'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${roleStyles[role as keyof typeof roleStyles]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      active: 'bg-green-500/20 text-green-500',
      inactive: 'bg-gray-500/20 text-gray-500',
      suspended: 'bg-red-500/20 text-red-500'
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
        title="User Management" 
        subtitle="Manage students, faculty, and admin users" 
      />

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="form-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <select
            className="form-select"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="w-full md:w-48">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        
        <button 
          onClick={handleAddUser}
          className="btn btn-primary flex items-center justify-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      {user.rollNumber && (
                        <p className="text-sm text-gray-400">{user.rollNumber}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{user.email}</td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4 text-gray-300">{user.department}</td>
                  <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                  <td className="py-3 px-4 text-gray-300">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="btn btn-secondary text-sm flex items-center gap-1"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="btn btn-danger text-sm flex items-center gap-1"
                      >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={editingUser}
        onSave={handleSaveUser}
      />
    </div>
  );
}
