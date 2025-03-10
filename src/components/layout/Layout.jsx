import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import Notifications from '../common/Notifications';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className={`app-container bg-${theme.bodyStyle}`}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="content-wrapper">
        <Navbar toggleSidebar={toggleSidebar} />
        <Notifications />
        
        <main className="content p-3 p-md-4">
          <Container fluid>
            <Outlet />
          </Container>
        </main>
        
        <footer className="footer mt-auto py-3 border-top">
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">© 2023 BlueMedix. All rights reserved.</span>
              <div>
                <span className="text-muted small">Version 1.0.0</span>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default Layout; 