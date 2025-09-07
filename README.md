# EduPulse - Centralized Student Activity Record Platform

A comprehensive web application for managing student activities, faculty reviews, and administrative oversight in educational institutions.

## 🌟 Features

### Role-Based Access Control
- **Landing Page**: Role selection (Student | Faculty | Admin)
- **Dynamic Navigation**: Role-specific menus and features
- **Secure Authentication**: Local storage-based session management

### 🎓 Student Features
- **Dashboard**: Quick stats, recent activities, notifications
- **Activity Management**: Upload certificates, projects, internships, events
- **Portfolio**: Personal profile, verified activities grouped by type
- **Analytics**: Progress tracking, skill development, comparative analysis
- **Profile Management**: Personal information, career objectives, settings

### 👨‍🏫 Faculty Features
- **Dashboard**: Assigned students overview, pending approvals
- **Submission Reviews**: Approve/reject student activities with feedback
- **Analytics**: Student progress tracking, mentorship insights
- **Report Generation**: NAAC/NIRF compliance reports
- **Profile Management**: Faculty information and preferences

### 👤 Admin Features
- **System Dashboard**: User statistics, system health monitoring
- **User Management**: Add/edit/remove users, role assignments
- **Analytics**: Institution-wide reports and compliance data
- **System Settings**: Configuration management
- **Notifications**: Bulk announcements and targeted messaging

## 🚀 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Headless UI, Heroicons
- **Charts**: Recharts (planned), custom chart components
- **Authentication**: Context-based state management
- **File Handling**: React Hook Form, file upload components

## 🎨 Design Features

- **Dark Theme**: Complete dark mode interface
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Component-Based**: Reusable UI components
- **Interactive Elements**: Hover effects, transitions, modals
- **Accessible**: ARIA compliant, keyboard navigation

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/
│   │   ├── student/       # Student pages
│   │   ├── faculty/       # Faculty pages
│   │   └── admin/         # Admin pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── dashboard/         # Dashboard components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
└── contexts/
    └── UserContext.tsx   # Authentication context
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smarthub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Usage

1. **Role Selection**: Choose your role on the landing page
2. **Dashboard Access**: Navigate through role-specific features
3. **Activity Management**: Students can upload and track activities
4. **Review Process**: Faculty can approve/reject submissions
5. **Administrative Control**: Admins manage users and system settings

## 🔐 Authentication Flow

1. User selects role on landing page
2. Role is stored in localStorage
3. Protected routes check user role
4. Redirect to appropriate dashboard
5. Role-specific navigation and features

## 📊 Key Components

### Student Dashboard
- Activity upload form with file attachments
- Portfolio generation and sharing
- Progress analytics and comparisons
- Notification management

### Faculty Dashboard
- Submission review interface
- Student progress tracking
- Report generation tools
- Mentorship management

### Admin Dashboard
- User management interface
- System health monitoring
- Compliance reporting
- Configuration settings

## 🎯 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] PDF generation for portfolios
- [ ] Email notification system
- [ ] Advanced analytics with charts
- [ ] File storage integration
- [ ] Search and filtering improvements
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed as a comprehensive student activity management solution for educational institutions.

---

**Note**: This is a frontend-only implementation. For production use, integrate with appropriate backend services, database, and authentication systems.
