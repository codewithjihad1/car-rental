# Dashboard Component

A responsive and feature-rich dashboard for managing car rental operations.

## Features

### 📊 Statistics Overview

-   **Total Cars**: Display total number of user's listed cars
-   **Total Bookings**: Show total bookings received
-   **Total Revenue**: Calculate and display total earnings
-   **Active Listings**: Count of currently available cars

### 🚀 Quick Actions

-   **Add New Car**: Direct link to add car listing
-   **Manage Cars**: Navigate to car management page
-   **View Bookings**: Access booking management

### 📱 Responsive Design

-   **Mobile-First**: Optimized for mobile devices
-   **Tablet & Desktop**: Adapts to larger screens
-   **Sidebar Navigation**: Collapsible sidebar for navigation
-   **Touch-Friendly**: Large touch targets for mobile

### 🔧 Components Structure

```
Dashboard/
├── Dashboard.jsx           # Main dashboard component
└── components/
    ├── StatCard.jsx        # Reusable stat card component
    ├── QuickActions.jsx    # Quick action buttons
    ├── Sidebar.jsx         # Navigation sidebar
    └── RecentActivity.jsx  # Recent cars and bookings
```

### 🎨 Design Features

-   **Dark Mode Support**: Full dark/light mode compatibility
-   **Modern UI**: Clean and professional interface
-   **Smooth Animations**: Hover effects and transitions
-   **Gradient Buttons**: Eye-catching call-to-action buttons
-   **Card-Based Layout**: Clean content organization

### 📋 Data Integration

-   **Real-Time Data**: Fetches user's cars and bookings
-   **Error Handling**: Graceful error handling for API calls
-   **Loading States**: Loading indicators during data fetch
-   **Empty States**: Helpful empty state messages

### 🔐 Security

-   **Private Route**: Protected by authentication
-   **User-Specific Data**: Shows only user's own data
-   **Secure API Calls**: Uses authenticated axios instance

### 🚗 Navigation Integration

-   **Router Integration**: Seamless navigation between pages
-   **Navbar Link**: Accessible from main navigation
-   **Breadcrumb Support**: Clear navigation hierarchy

## Usage

The dashboard is automatically available at `/dashboard` for authenticated users and provides:

1. **Overview** of all car rental activities
2. **Quick access** to main features
3. **Recent activity** tracking
4. **Mobile-optimized** experience

## Tech Stack

-   **React 18+**: Modern React with hooks
-   **React Router**: Client-side routing
-   **Tailwind CSS**: Utility-first styling
-   **React Icons**: Professional icon set
-   **Axios**: HTTP client for API calls
-   **Firebase Auth**: User authentication
