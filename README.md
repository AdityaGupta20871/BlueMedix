## 📋 Overview

BlueMedix is a modern, responsive admin dashboard built with React and Bootstrap. It provides a comprehensive interface for managing users, products, and other data with an intuitive user experience and visually appealing design.

The application features dynamic theming, real-time notifications, and a fully responsive layout that works seamlessly across desktop and mobile devices. It includes CRUD operations for user and product management with form validation and state persistence.

## ✨ Features implemented in 4 hours

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multiple Themes**: Choose between light, dark, blue, and transparent themes
- **User Management**: Add, edit, delete, and view users with detailed profiles
- **Product Management**: Complete product lifecycle management with image previews
- **Dashboard Analytics**: Visual representation of key metrics and recent activity
- **Context API State Management**: Global application state with dedicated contexts
- **Form Validation**: Comprehensive validation for all input forms
- **Notifications System**: Real-time feedback for user actions
- **Reusable Components**: Library of consistent UI components

## 🛠️ Technologies

- **React 18**: Core UI library with hooks and functional components
- **React Router 6**: Client-side routing with nested routes
- **React Bootstrap**: UI component library with Bootstrap 5
- **Context API**: Global state management
- **Formik & Yup**: Form handling and validation
- **Bootstrap Icons**: Comprehensive icon library
- **CSS/SCSS**: Custom styling and theming

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bluemedix.git
   cd bluemedix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
bluemedix/
├── public/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── forms/           # Form-related components  
│   │   └── layout/          # Layout components (Sidebar, Navbar)
│   ├── contexts/            # Context providers
│   │   ├── AppContext.jsx   # Global app state
│   │   └── ThemeContext.jsx # Theme management
│   ├── pages/
│   │   ├── dashboard/       # Dashboard components
│   │   ├── products/        # Product management
│   │   └── users/           # User management
│   ├── services/            # API services 
│   ├── styles/              # Global styles and themes
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main app component 
│   └── index.js             # Entry point
└── package.json
```

## 📊 Core Features Explained

### Dynamic Theming

BlueMedix includes a robust theming system that allows users to switch between different visual styles:

```jsx
// Sample theme switching from ThemeContext.jsx
const changeTheme = (newTheme) => {
  const themes = {
    light: {
      sidebarStyle: 'light',
      navbarStyle: 'light',
      bodyStyle: 'light'
    },
    dark: {
      sidebarStyle: 'dark',
      navbarStyle: 'dark',
      bodyStyle: 'dark'
    },
    // Additional themes...
  };
  
  setTheme(themes[newTheme] || themes.light);
};
```

### Reusable Form Components

The application uses a composable form architecture for consistency:

```jsx
// Example usage of form components
<FormLayout title="Add New User" backUrl="/users">
  <FormGroup 
    label="First Name" 
    name="firstname" 
    required
    horizontal
  >
    <Form.Control 
      type="text"
      name="firstname"
      value={values.firstname}
      onChange={handleChange}
      isInvalid={touched.firstname && errors.firstname}
    />
    <ErrorMessage name="firstname" component={FormFeedback} />
  </FormGroup>
  
  {/* Additional form groups */}
  
  <FormActions 
    cancelUrl="/users"
    submitText="Create User"
    isSubmitting={isSubmitting}
  />
</FormLayout>
```

### Dashboard Analytics

The dashboard provides visual analytics with dynamic data rendering:

```jsx
// Sample dashboard stat cards
<Row className="g-3 mb-4">
  <Col md={6} xl={3}>
    <StatCard
      title="Total Users"
      value={stats.totalUsers}
      icon="people"
      color="primary"
      trend="up"
      trendValue="12%"
    />
  </Col>
  
  {/* Additional stat cards */}
</Row>
```

## 📱 Screenshots

### Dashboard
![Screenshot (247)](https://github.com/user-attachments/assets/4472f86f-61ac-4ba0-a5ca-024e5eb2986c)

### User Page
![Screenshot (244)](https://github.com/user-attachments/assets/cf27dd8a-fe6f-4204-b4cf-707be65cc2a0)


### Product Page
![Screenshot (243)](https://github.com/user-attachments/assets/a3ba7aeb-52c6-4087-8c82-b7e3b49b0911)


### Form Components
![Screenshot (246)](https://github.com/user-attachments/assets/9af09159-cda2-4344-9320-ee8c63eca222)

### Edit Form


![Screenshot (248)](https://github.com/user-attachments/assets/d796874f-7273-487b-88ca-496a3d6da082)

![Screenshot (249)](https://github.com/user-attachments/assets/9aa964f7-65b8-4c24-a634-d9fe4406aa29)


## 🔮 Future Improvements

- **Authentication System**: User login, registration, and role-based access control
- **Advanced Analytics**: More comprehensive dashboard metrics with charts and graphs
- **Dark Mode Refinements**: Further enhancements to dark mode styling
- **Data Export**: Export functionality for tables and reports
- **Advanced Filtering**: More powerful search and filter options for data tables
- **Internationalization**: Support for multiple languages
- **Real-time Updates**: WebSocket integration for real-time data updates

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/bluemedix/issues).

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Connect

Your Name - [@yourusername](https://twitter.com/yourusername) - email@example.com

Project Link: [https://github.com/yourusername/bluemedix](https://github.com/yourusername/bluemedix)

---

Made with ❤️ by [Your Name](https://yourwebsite.com)


