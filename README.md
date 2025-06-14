# 🚗 Car Rental System - Frontend

A modern, responsive car rental application built with React, Vite, and Tailwind CSS. This application provides a complete car rental experience with user authentication, car management, booking system, and an intuitive user interface.

## 📋 Project Overview

**Project Name:** Car Rental System  
**Purpose:** A comprehensive web application for car rental services that allows users to browse, book, and manage car rentals with a modern, user-friendly interface.

**🔗 Live URL:** [https://car-rental-c9294.web.app/](https://car-rental-c9294.web.app/)

### 🎯 Key Features Summary

-   🔐 **Authentication** - Firebase Auth with Google OAuth
-   🚗 **Car Management** - Browse, add, edit, and delete cars
-   📅 **Booking System** - Interactive booking with date selection
-   🎨 **Modern UI/UX** - Dark/light theme with responsive design
-   📱 **Mobile Responsive** - Optimized for all device sizes
-   🔒 **Protected Routes** - Secure user-specific content

### 📦 Key NPM Packages Used

```json
{
    "react": "^19.1.0",
    "vite": "^6.3.5",
    "tailwindcss": "^4.1.8",
    "daisyui": "^5.0.43",
    "firebase": "^11.9.0",
    "axios": "^1.9.0",
    "react-router": "^7.6.2",
    "react-icons": "^5.5.0",
    "react-toastify": "^11.0.5",
    "sweetalert2": "^11.22.0",
    "react-countup": "^6.5.3",
    "react-intersection-observer": "^9.16.0",
    "react-simple-typewriter": "^5.0.1"
}
```

## 🌟 Detailed Features

### 🔐 Authentication & Authorization

-   **Firebase Authentication** with email/password and Google OAuth
-   **Protected Routes** for authenticated users only
-   **JWT Token Management** with automatic token refresh
-   **Role-based Access Control** ensuring users can only access their own data

### 🚙 Car Management

-   **Browse All Cars** with filtering and sorting options
-   **Car Details** with comprehensive information and image gallery
-   **Add New Cars** (authenticated users only)
-   **Edit/Update Cars** (car owners only)
-   **Delete Cars** with confirmation modals
-   **Real-time Availability** status updates

### 📅 Booking System

-   **Interactive Booking** with date selection
-   **Booking Management** - view, modify, and cancel bookings
-   **Price Calculation** based on rental duration
-   **Booking History** with status tracking
-   **Responsive Design** for all device sizes

### 🎨 User Interface

-   **Modern Design** with Tailwind CSS and DaisyUI
-   **Dark/Light Theme** toggle with persistent storage
-   **Responsive Layout** optimized for mobile, tablet, and desktop
-   **Interactive Animations** and smooth transitions
-   **Loading States** and error handling
-   **Toast Notifications** for user feedback

### 🏠 Homepage Features

-   **Hero Banner** with engaging call-to-action
-   **Recent Cars** showcase with latest additions
-   **Special Offers** with promotional deals
-   **Featured Services** highlighting key benefits
-   **Why Choose Us** section with compelling reasons

## 🛠️ Technologies Used

### Frontend Framework

-   **React 19.1.0** - Modern React with latest features
-   **Vite 6.3.5** - Fast build tool and development server
-   **React Router 7.6.2** - Client-side routing

### Styling & UI

-   **Tailwind CSS 4.1.8** - Utility-first CSS framework
-   **DaisyUI 5.0.43** - Tailwind CSS component library
-   **React Icons 5.5.0** - Comprehensive icon library

### State Management & Data

-   **React Context API** - Global state management
-   **Axios 1.9.0** - HTTP client for API calls
-   **Firebase 11.9.0** - Authentication and backend services

### Additional Libraries

-   **SweetAlert2** - Beautiful alerts and modals
-   **React Toastify** - Toast notifications
-   **React CountUp** - Animated counters
-   **React Intersection Observer** - Scroll-triggered animations
-   **React Simple Typewriter** - Typewriter effect animations

## 🚀 Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Firebase project setup
-   Backend API server running

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-codewithjihad1.git
    cd b11a11-client-side-codewithjihad1
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

    ```env
    VITE_API_BASE_URL=https://your-backend-api.vercel.app/api
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Build for production**
    ```bash
    npm run build
    ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Banner.jsx       # Hero banner component
│   ├── CarCard.jsx      # Car display card
│   ├── Footer.jsx       # Footer component
│   ├── Navbar.jsx       # Navigation bar
│   ├── PrivateRoute.jsx # Route protection
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx         # Homepage
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Registration page
│   ├── AddCar.jsx       # Add car form
│   ├── AvailableCars.jsx # Car listing page
│   ├── CarDetails.jsx   # Car detail page
│   ├── myCars/          # User's cars management
│   └── MyBookings/      # User's bookings management
├── context/             # React Context providers
│   ├── AuthContext.jsx  # Authentication context
│   └── ThemeContext.jsx # Theme context
├── layouts/             # Layout components
│   ├── RootLayout.jsx   # Main layout wrapper
│   └── AuthLayout.jsx   # Authentication layout
├── routes/              # Routing configuration
│   └── router.jsx       # React Router setup
├── api/                 # API configuration
│   └── axios.js         # Axios instance setup
├── hooks/               # Custom React hooks
├── config/              # Configuration files
│   └── firebaseConfig.js # Firebase configuration
└── utils/               # Utility functions
```

## 🎯 Core Features

### 🏠 Homepage

-   **Interactive Hero Banner** with call-to-action
-   **Recent Cars Section** showcasing latest additions
-   **Special Offers** with discount promotions
-   **Featured Services** highlighting platform benefits
-   **Why Choose Us** section with key selling points

### 🔍 Car Browsing

-   **All Cars Page** with filtering and sorting
-   **Search Functionality** by car model, location, or features
-   **Grid/List View** toggle for user preference
-   **Car Details** with comprehensive information
-   **Image Gallery** with multiple car photos
-   **Booking Integration** directly from car details

### 👤 User Management

-   **Registration/Login** with email and Google OAuth
-   **Profile Management** with user information
-   **Protected Routes** for authenticated features
-   **Persistent Sessions** with automatic token refresh

### 🚗 Car Management (Authenticated Users)

-   **Add New Cars** with comprehensive form validation
-   **My Cars Dashboard** with car management tools
-   **Edit Car Details** with real-time updates
-   **Delete Cars** with confirmation dialogs
-   **Booking Statistics** for car owners

### 📅 Booking Management

-   **Interactive Booking** with date picker
-   **Price Calculation** based on rental duration
-   **Booking Confirmation** with detailed summary
-   **My Bookings** dashboard with booking history
-   **Modify Bookings** with date changes
-   **Cancel Bookings** with confirmation

## 🎨 UI/UX Features

### 🌙 Theme System

-   **Dark/Light Mode** toggle
-   **Persistent Theme** storage in localStorage
-   **Smooth Transitions** between themes
-   **Consistent Color Scheme** across all components

### 📱 Responsive Design

-   **Mobile-First** approach
-   **Breakpoint-Optimized** layouts
-   **Touch-Friendly** interface
-   **Optimized Images** for different screen sizes

### ✨ Animations & Interactions

-   **Smooth Transitions** for all state changes
-   **Loading Skeletons** for better UX
-   **Hover Effects** on interactive elements
-   **Scroll-Triggered Animations** using Intersection Observer
-   **Typewriter Effects** for engaging text display

## 🛡️ Security Features

### Authentication

-   **Firebase Auth** with secure token management
-   **Protected Routes** preventing unauthorized access
-   **Token Refresh** handling for expired sessions
-   **Email Verification** for new accounts

### Data Protection

-   **Input Validation** on all forms
-   **XSS Prevention** with proper data sanitization
-   **HTTPS Enforcement** for all API calls
-   **Secure Storage** of sensitive information

## 📊 Performance Optimizations

### Code Splitting

-   **Lazy Loading** of route components
-   **Dynamic Imports** for heavy libraries
-   **Bundle Optimization** with Vite

### Image Optimization

-   **Responsive Images** with srcset
-   **Lazy Loading** for images below fold
-   **WebP Format** support for modern browsers

### Caching Strategy

-   **API Response Caching** with proper headers
-   **Asset Caching** for static resources
-   **Service Worker** for offline functionality

## 🧪 Testing & Quality

### Code Quality

-   **ESLint** configuration for code consistency
-   **Prettier** for code formatting
-   **React Hooks** rules enforcement

### Error Handling

-   **Error Boundaries** for component-level errors
-   **Global Error Handling** for unhandled rejections
-   **User-Friendly Error Messages** with actionable feedback

## 🚀 Deployment

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Ensure all required environment variables are set:

-   `VITE_API_BASE_URL` - Backend API URL
-   `VITE_FIREBASE_*` - Firebase configuration keys

### Deployment Platforms

-   **Vercel** - Recommended for React apps
-   **Netlify** - Alternative hosting platform
-   **Firebase Hosting** - Integrated with Firebase Auth

## 📱 Screenshots & Demo

### Homepage

-   Hero banner with call-to-action
-   Recent cars showcase
-   Special offers section
-   Featured services

### Car Management

-   Add car form with validation
-   My cars dashboard
-   Car details with booking

### Booking System

-   Interactive date picker
-   Booking confirmation
-   My bookings management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:

-   Check the console for error messages
-   Verify environment variables are set correctly
-   Ensure Firebase configuration is correct
-   Confirm backend API is running and accessible

## 🔄 API Integration

The frontend integrates with the backend API for:

-   **Authentication** - User login/registration
-   **Car Management** - CRUD operations
-   **Booking System** - Booking creation and management
-   **User Data** - Profile and preferences

## 📈 Future Enhancements

-   **Real-time Chat** for customer support
-   **Push Notifications** for booking updates
-   **Advanced Search** with filters
-   **Rating System** for cars and users
-   **Payment Integration** for online payments
-   **Mobile App** version with React Native

---

Built with ❤️ using React, Tailwind CSS, and Firebase
