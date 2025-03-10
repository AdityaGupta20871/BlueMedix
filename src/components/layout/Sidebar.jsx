import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import './SidebarStyles.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleClose = () => setIsOpen(false);
  const { theme } = useTheme();
  
  return (
    <>
      {/* Mobile sidebar using Offcanvas */}
      <Offcanvas 
        show={isOpen} 
        onHide={handleClose} 
        className={`d-lg-none custom-sidebar sidebar-${theme.sidebarStyle}`}
        placement="start"
        backdrop={true}
        scroll={false}
      >
        <div className="d-flex flex-column h-100">
          <div className="sidebar-brand">
            <i className="bi bi-buildings"></i>
            <h5>BlueMedix</h5>
          </div>
          
          <SidebarContent closeSidebar={handleClose} />
          
          <div className="mt-auto">
            <div className="p-3 d-flex justify-content-between border-top border-secondary border-opacity-25">
              <span className="small opacity-75">© 2023 BlueMedix</span>
              <div>
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-circle" 
                  style={{ width: '30px', height: '30px', padding: '0', lineHeight: '28px' }}
                >
                  <i className="bi bi-gear-fill small"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
      
      {/* Desktop sidebar (always visible on large screens) */}
      <div className={`d-none d-lg-block custom-sidebar sidebar-${theme.sidebarStyle}`}>
        <div className="d-flex flex-column h-100">
          <div className="sidebar-brand">
            <i className="bi bi-buildings"></i>
            <h5>BlueMedix</h5>
          </div>
          
          <SidebarContent />
          
          <div className="mt-auto">
            <div className="p-3 d-flex justify-content-between border-top border-secondary border-opacity-25">
              <span className="small opacity-75">© 2023 BlueMedix</span>
              <div>
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-circle" 
                  style={{ width: '30px', height: '30px', padding: '0', lineHeight: '28px' }}
                >
                  <i className="bi bi-gear-fill small"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Extracted sidebar content to avoid duplication
const SidebarContent = ({ closeSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleClick = () => {
    if (closeSidebar) closeSidebar();
  };
  
  return (
    <div className="flex-grow-1 px-3 py-2">
      <ul className="sidebar-nav nav nav-pills flex-column">
        <li className="nav-item">
          <Link 
            to="/" 
            className={`${isActive('/') ? 'active' : ''}`}
            onClick={handleClick}
          >
            <i className="bi bi-house-door"></i>
            Dashboard
          </Link>
        </li>
        
        <div className="sidebar-category">User Management</div>
        
        <li className="nav-item">
          <Link 
            to="/users" 
            className={`${isActive('/users') && !isActive('/add-user') ? 'active' : ''}`}
            onClick={handleClick}
          >
            <i className="bi bi-people"></i>
            Users
          </Link>
        </li>
        
        <li className="nav-item">
          <Link 
            to="/add-user" 
            className={`${isActive('/add-user') ? 'active' : ''}`}
            onClick={handleClick}
          >
            <i className="bi bi-person-plus"></i>
            Add User
          </Link>
        </li>
        
        <div className="sidebar-category">Product Management</div>
        
        <li className="nav-item">
          <Link 
            to="/products" 
            className={`${isActive('/products') && !isActive('/add-product') ? 'active' : ''}`}
            onClick={handleClick}
          >
            <i className="bi bi-box"></i>
            Products
          </Link>
        </li>
        
        <li className="nav-item">
          <Link 
            to="/add-product" 
            className={`${isActive('/add-product') ? 'active' : ''}`}
            onClick={handleClick}
          >
            <i className="bi bi-plus-square"></i>
            Add Product
          </Link>
        </li>
        
        <div className="sidebar-category">Settings</div>
        
        <li className="nav-item">
          <a 
            href="#" 
            className=""
            onClick={(e) => {
              e.preventDefault();
              if (closeSidebar) closeSidebar();
            }}
          >
            <i className="bi bi-gear"></i>
            Settings
          </a>
        </li>
        
        <li className="nav-item">
          <a 
            href="#" 
            className=""
            onClick={(e) => {
              e.preventDefault();
              if (closeSidebar) closeSidebar();
            }}
          >
            <i className="bi bi-question-circle"></i>
            Help & Support
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 