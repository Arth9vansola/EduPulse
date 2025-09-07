'use client';

import React from 'react';
import Header from '@/components/ui/Header';
import StatCard from '@/components/dashboard/StatCard';
import { 
  ChartBarIcon, TrophyIcon, ClockIcon, 
  AcademicCapIcon, BriefcaseIcon, CalendarIcon 
} from '@heroicons/react/24/outline';

// Mock data for charts and analytics
const mockAnalyticsData = {
  activityBreakdown: {
    certificates: 7,
    projects: 4,
    internships: 2,
    events: 8,
    workshops: 5,
    competitions: 3
  },
  monthlyProgress: [
    { month: 'Jan', activities: 2 },
    { month: 'Feb', activities: 3 },
    { month: 'Mar', activities: 1 },
    { month: 'Apr', activities: 4 },
    { month: 'May', activities: 3 },
    { month: 'Jun', activities: 5 },
    { month: 'Jul', activities: 2 },
    { month: 'Aug', activities: 6 },
    { month: 'Sep', activities: 3 }
  ],
  skillAreas: {
    'Programming': 85,
    'Web Development': 78,
    'Data Science': 65,
    'Mobile Development': 45,
    'AI/ML': 70,
    'Cloud Computing': 55
  },
  batchComparison: {
    yourActivities: 29,
    batchAverage: 22,
    departmentAverage: 25
  }
};

// Simple bar chart component
const SimpleBarChart: React.FC<{ data: any[], title: string }> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.activities || item.value || 0));
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-16 text-sm text-gray-300">
              {item.month || item.name}
            </div>
            <div className="flex-1 bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${((item.activities || item.value || 0) / maxValue) * 100}%` 
                }}
              />
            </div>
            <div className="w-8 text-sm text-gray-300 text-right">
              {item.activities || item.value || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skill progress component
const SkillProgress: React.FC<{ skills: Record<string, number> }> = ({ skills }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Skill Progress</h3>
      <div className="space-y-4">
        {Object.entries(skills).map(([skill, progress]) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-300">{skill}</span>
              <span className="text-sm text-gray-300">{progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Activity breakdown pie chart representation
const ActivityBreakdown: React.FC<{ data: Record<string, number> }> = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const colors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500'
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Activity Breakdown</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([type, count], index) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                <span className="text-sm text-gray-300 capitalize">{type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{count}</div>
                <div className="text-xs text-gray-400">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Comparison chart
const ComparisonChart: React.FC<{ data: any }> = ({ data }) => {
  const maxValue = Math.max(data.yourActivities, data.batchAverage, data.departmentAverage);
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-blue-400">Your Activities</span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${(data.yourActivities / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium w-8">{data.yourActivities}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-400">Batch Average</span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-700 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${(data.batchAverage / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium w-8">{data.batchAverage}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-yellow-400">Department Average</span>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-gray-700 rounded-full h-3">
              <div 
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${(data.departmentAverage / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium w-8">{data.departmentAverage}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-700 rounded">
        <p className="text-sm text-green-400">
          🎉 You're performing {data.yourActivities - data.batchAverage} activities above batch average!
        </p>
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const { activityBreakdown, monthlyProgress, skillAreas, batchComparison } = mockAnalyticsData;

  return (
    <div className="space-y-8">
      <Header 
        title="Analytics & Reports" 
        subtitle="Track your progress and performance" 
      />

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Activities" 
          value="29" 
          icon={<ChartBarIcon className="w-6 h-6" />}
          color="blue"
          change={{ value: 15, isPositive: true }}
        />
        <StatCard 
          title="Certifications" 
          value="7" 
          icon={<TrophyIcon className="w-6 h-6" />}
          color="green"
        />
        <StatCard 
          title="Average Review Time" 
          value="2.3 days" 
          icon={<ClockIcon className="w-6 h-6" />}
          color="yellow"
        />
        <StatCard 
          title="Portfolio Score" 
          value="85%" 
          icon={<AcademicCapIcon className="w-6 h-6" />}
          color="purple"
          change={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Breakdown */}
        <ActivityBreakdown data={activityBreakdown} />
        
        {/* Skill Progress */}
        <SkillProgress skills={skillAreas} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Progress */}
        <SimpleBarChart 
          data={monthlyProgress} 
          title="Monthly Activity Progress" 
        />
        
        {/* Performance Comparison */}
        <ComparisonChart data={batchComparison} />
      </div>

      {/* Insights Section */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Insights & Recommendations</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2">🚀 Growth Opportunity</h4>
            <p className="text-sm text-gray-300">
              Consider adding more projects to your portfolio. You have strong certification numbers but could benefit from showcasing practical implementations.
            </p>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="font-medium text-green-400 mb-2">💪 Strength</h4>
            <p className="text-sm text-gray-300">
              Your programming and web development skills are above average. Consider pursuing advanced certifications in these areas.
            </p>
          </div>
          
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h4 className="font-medium text-yellow-400 mb-2">⚡ Quick Win</h4>
            <p className="text-sm text-gray-300">
              Participate in more workshops and competitions. These activities are quick to complete and highly valued by faculty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
