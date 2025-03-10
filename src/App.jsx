import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import './components/layout/LayoutStyles.css';

// Contexts
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Notifications from './components/common/Notifications';

// Pages
import Dashboard from './pages/Dashboard';
import UsersList from './pages/users/UsersList';
import UserDetails from './pages/users/UserDetails';
import AddUser from './pages/users/AddUser';
import EditUser from './pages/users/EditUser';
import ProductsList from './pages/products/ProductsList';
import ProductDetails from './pages/products/ProductDetails';
import AddProduct from './pages/products/AddProduct';
import EditProduct from './pages/products/EditProduct';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              
              {/* User Routes */}
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              
              {/* Product Routes */}
              <Route path="/products" element={<ProductsList />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
