import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar = ({ toggleSidebar }) => {
  const { theme, changeTheme } = useTheme();
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(3);
  
  // Page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/users') return 'Users';
    if (path.includes('/users/')) return 'User Details';
    if (path === '/add-user') return 'Add User';
    if (path.includes('/edit-user')) return 'Edit User';
    if (path === '/products') return 'Products';
    if (path.includes('/products/')) return 'Product Details';
    if (path === '/add-product') return 'Add Product';
    if (path.includes('/edit-product')) return 'Edit Product';
    return 'BlueMedix';
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className={`navbar-${theme.navbarStyle} bg-${theme.navbarStyle} border-bottom`}
      style={{backdropFilter: 'blur(10px)', backgroundColor: theme.navbarStyle === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(33, 37, 41, 0.8)'}}
    >
      <Container fluid>
        <BootstrapNavbar.Brand className="d-block d-lg-none" href="#">
          <i className="bi bi-buildings me-2"></i>
          BlueMedix
        </BootstrapNavbar.Brand>
        
        <div className="d-flex align-items-center">
          <button
            className="btn btn-link text-secondary d-block d-lg-none me-2"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>
        
        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        
        <BootstrapNavbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <div className="d-flex align-items-center gap-3">
              {/* Theme Switcher */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link text-secondary no-caret p-0">
                  <i className="bi bi-palette fs-5"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeTheme('light')}>
                    <i className="bi bi-brightness-high me-2"></i> Light
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTheme('dark')}>
                    <i className="bi bi-moon me-2"></i> Dark
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTheme('blue')}>
                    <i className="bi bi-droplet me-2"></i> Blue
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTheme('transparent')}>
                    <i className="bi bi-window me-2"></i> Transparent
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {/* Notifications */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link text-secondary no-caret p-0 position-relative">
                  <i className="bi bi-bell fs-5"></i>
                  {notificationsCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.5rem'}}>
                      {notificationsCount}
                    </span>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{minWidth: '300px'}}>
                  <div className="px-3 py-2 d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Notifications</h6>
                    <button 
                      className="btn btn-sm text-primary" 
                      onClick={() => setNotificationsCount(0)}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item className="px-3 py-2 d-flex align-items-center border-bottom">
                    <div className="bg-primary rounded-circle p-2 me-3 text-white">
                      <i className="bi bi-person-check"></i>
                    </div>
                    <div>
                      <p className="mb-0 fw-semibold">New user registration</p>
                      <small className="text-muted">2 minutes ago</small>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="px-3 py-2 d-flex align-items-center border-bottom">
                    <div className="bg-success rounded-circle p-2 me-3 text-white">
                      <i className="bi bi-box-seam"></i>
                    </div>
                    <div>
                      <p className="mb-0 fw-semibold">New product added</p>
                      <small className="text-muted">1 hour ago</small>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item className="px-3 py-2 d-flex align-items-center">
                    <div className="bg-warning rounded-circle p-2 me-3 text-white">
                      <i className="bi bi-exclamation-triangle"></i>
                    </div>
                    <div>
                      <p className="mb-0 fw-semibold">System alert</p>
                      <small className="text-muted">Yesterday</small>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <div className="p-2 text-center">
                    <button className="btn btn-sm btn-light w-100">View All Notifications</button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* User Profile */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link d-flex align-items-center text-secondary no-caret p-0">
                  <div className="d-flex align-items-center">
                    <div className="avatar-wrapper me-2">
                      <img 
                        src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" 
                        alt="Admin" 
                        className="rounded-circle" 
                        width="32" 
                        height="32" 
                      />
                    </div>
                    <div className="d-none d-md-block">
                      <div className="small">Admin User</div>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <i className="bi bi-person me-2"></i> Profile
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <i className="bi bi-gear me-2"></i> Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

// Custom component for dropdown toggle without the default styling
const NavProfileToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className="text-decoration-none d-flex align-items-center ms-2"
  >
    {children}
  </a>
));

export default Navbar; 