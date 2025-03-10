import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Badge, Button, Table, ProgressBar, Dropdown } from 'react-bootstrap';
import { useAppContext } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import StatCard from '../components/common/StatCard';
import ActivityList from '../components/common/ActivityList';
import ChartCard from '../components/common/ChartCard';
import DataCard from '../components/common/DataCard';

const Dashboard = () => {
  const { users, products, loading } = useAppContext();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    activeUsers: 0,
    recentActivity: []
  });
  
  // Generate random data for charts
  const [salesData] = useState(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      sales: Math.floor(Math.random() * 5000) + 1000,
      profit: Math.floor(Math.random() * 2000) + 500
    }));
  });
  
  // Generate random activity data
  const [activities] = useState(() => {
    const actions = [
      { type: 'user_added', message: 'New user registered', icon: 'person-plus', color: 'primary' },
      { type: 'product_added', message: 'New product added', icon: 'box-seam', color: 'success' },
      { type: 'user_login', message: 'User logged in', icon: 'box-arrow-in-right', color: 'info' },
      { type: 'order_placed', message: 'New order placed', icon: 'cart-check', color: 'warning' },
      { type: 'payment_received', message: 'Payment received', icon: 'credit-card', color: 'success' }
    ];
    
    return Array(5).fill().map((_, i) => {
      const action = actions[Math.floor(Math.random() * actions.length)];
      return {
        id: i + 1,
        ...action,
        user: `User ${Math.floor(Math.random() * 100) + 1}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString()
      };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  });
  
  useEffect(() => {
    if (users.length && products.length) {
      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        activeUsers: users.filter(user => user.active).length,
        recentActivity: activities
      });
    }
  }, [users, products, activities]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Add this helper function near the top of the component
  const getUserDisplayName = (user) => {
    if (!user) return 'Unknown User';
    
    // Handle case where name is an object with firstname/lastname
    if (user.name && typeof user.name === 'object') {
      const { firstname = '', lastname = '' } = user.name;
      return `${firstname} ${lastname}`.trim() || 'Unknown User';
    }
    
    // Handle case where name is a string
    if (user.name && typeof user.name === 'string') {
      return user.name;
    }
    
    // Handle case where firstname/lastname are direct properties
    if (user.firstname || user.lastname) {
      return `${user.firstname || ''} ${user.lastname || ''}`.trim() || 'Unknown User';
    }
    
    return 'Unknown User';
  };
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="dashboard fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard</h2>
        <div>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-time-range">
              Last 7 Days <i className="bi bi-chevron-down ms-1"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Today</Dropdown.Item>
              <Dropdown.Item>Yesterday</Dropdown.Item>
              <Dropdown.Item active>Last 7 Days</Dropdown.Item>
              <Dropdown.Item>Last 30 Days</Dropdown.Item>
              <Dropdown.Item>This Month</Dropdown.Item>
              <Dropdown.Item>Last Month</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      
      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col md={6} xl={3}>
          <StatCard 
            title="Total Users"
            value={stats.totalUsers}
            icon="people"
            color="primary"
            trend="up"
            trendValue="12% increase"
          />
        </Col>
        
        <Col md={6} xl={3}>
          <StatCard 
            title="Total Products"
            value={stats.totalProducts}
            icon="box"
            color="success"
            trend="up"
            trendValue="8% increase"
          />
        </Col>
        
        <Col md={6} xl={3}>
          <StatCard 
            title="Total Orders"
            value="254"
            icon="cart"
            color="warning"
            trend="up"
            trendValue="5% increase"
          />
        </Col>
        
        <Col md={6} xl={3}>
          <StatCard 
            title="Revenue"
            value="$24,500"
            icon="currency-dollar"
            color="danger"
            trend="down"
            trendValue="3% decrease"
          />
        </Col>
      </Row>
      
      {/* Charts and Tables */}
      <Row className="g-3 mb-4">
        <Col lg={8}>
          <ChartCard 
            title="Sales Overview"
            actions={[
              { icon: 'download', label: 'Export', variant: 'outline-secondary' },
              { icon: 'three-dots-vertical', variant: 'outline-secondary' }
            ]}
          >
            <div className="chart-container" style={{ height: '300px' }}>
              {/* Chart would go here - using a simple representation */}
              <div className="d-flex h-100 align-items-end">
                {salesData.map((data, index) => (
                  <div key={index} className="d-flex flex-column align-items-center mx-auto" style={{ width: '60px' }}>
                    <div className="d-flex flex-column align-items-center w-100">
                      <div 
                        className="bg-primary rounded-top" 
                        style={{ 
                          height: `${data.sales / 50}px`, 
                          width: '20px',
                          marginBottom: '5px'
                        }}
                      ></div>
                      <div 
                        className="bg-success rounded-top" 
                        style={{ 
                          height: `${data.profit / 50}px`, 
                          width: '20px' 
                        }}
                      ></div>
                    </div>
                    <small className="text-muted mt-2">{data.month}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <div className="d-flex align-items-center me-3">
                <div className="bg-primary" style={{ width: '12px', height: '12px', borderRadius: '2px' }}></div>
                <span className="ms-2 small">Sales</span>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-success" style={{ width: '12px', height: '12px', borderRadius: '2px' }}></div>
                <span className="ms-2 small">Profit</span>
              </div>
            </div>
          </ChartCard>
        </Col>
        
        <Col lg={4}>
          <ActivityList 
            activities={stats.recentActivity}
            formatDate={formatDate}
            viewAllLink="#"
          />
        </Col>
      </Row>
      
      {/* Recent Users and Products */}
      <Row className="g-3">
        <Col lg={6}>
          <DataCard 
            title="Recent Users"
            actionLabel="View All"
            actionLink="/users"
            actionVariant="primary"
            actionSize="sm"
          >
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((user, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar-wrapper me-2">
                          <img 
                            src={`https://ui-avatars.com/api/?name=${getUserDisplayName(user).replace(/\s+/g, '+')}&background=random&color=fff`} 
                            alt={getUserDisplayName(user)} 
                            className="rounded-circle" 
                            width="32" 
                            height="32" 
                          />
                        </div>
                        <div>{getUserDisplayName(user)}</div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.active ? 'success' : 'danger'} bg-opacity-10 text-${user.active ? 'success' : 'danger'} px-2 py-1`}>
                        {user.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DataCard>
        </Col>
        
        <Col lg={6}>
          <DataCard 
            title="Recent Products"
            actionLabel="View All"
            actionLink="/products"
            actionVariant="primary"
            actionSize="sm"
          >
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 5).map((product, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="me-2 bg-light rounded p-2" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-box text-primary"></i>
                        </div>
                        <div>{product.name}</div>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex flex-column">
                        <small className="text-muted mb-1">{product.stock} units</small>
                        <ProgressBar 
                          now={product.stock > 100 ? 100 : product.stock} 
                          variant={product.stock > 50 ? 'success' : product.stock > 20 ? 'warning' : 'danger'} 
                          style={{ height: '6px' }} 
                        />
                      </div>
                    </td>
                    <td>
                      <span className={`badge bg-${product.stock > 0 ? 'success' : 'danger'} bg-opacity-10 text-${product.stock > 0 ? 'success' : 'danger'} px-2 py-1`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </DataCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 