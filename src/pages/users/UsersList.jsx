import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Card, Form, InputGroup, Spinner, Badge, Pagination } from 'react-bootstrap';
import { useAppContext } from '../../contexts/AppContext';

const UsersList = () => {
  const { users, loading, deleteUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const usersPerPage = 8;
  
  // Search and sort functionality
  const filteredUsers = users.filter(user => 
    user.name.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    let aValue, bValue;
    
    if (sortBy === 'name') {
      aValue = `${a.name.firstname} ${a.name.lastname}`;
      bValue = `${b.name.firstname} ${b.name.lastname}`;
    } else {
      aValue = a[sortBy];
      bValue = b[sortBy];
    }
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });
  
  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
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
    <div className="mb-5">
      <div className="d-sm-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-6 fw-bold mb-1">Users</h1>
          <p className="text-muted">Manage your system users</p>
        </div>
        <Link to="/add-user">
          <Button variant="primary" className="d-flex align-items-center">
            <i className="bi bi-person-plus me-2"></i>
            Add User
          </Button>
        </Link>
      </div>
      
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search users..."
                  className="border-start-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="dropdown">
                <Button 
                  variant="outline-secondary" 
                  className="dropdown-toggle" 
                  data-bs-toggle="dropdown"
                >
                  Sort By: {sortBy === 'name' ? 'Name' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                </Button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('id')}
                    >ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('name')}
                    >Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('email')}
                    >Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('username')}
                    >Username {sortBy === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <div className="table-container">
        <Table hover responsive className="align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th onClick={() => handleSort('id')} className="cursor-pointer p-3">
                ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')} className="cursor-pointer p-3">
                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('username')} className="cursor-pointer p-3">
                Username {sortBy === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')} className="cursor-pointer p-3">
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="p-3">Phone</th>
              <th className="p-3">City</th>
              <th className="p-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-initials me-3">
                        <span>{user.name.firstname.charAt(0)}{user.name.lastname.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="fw-medium">{user.name.firstname} {user.name.lastname}</div>
                        <div className="text-muted small">{user.address?.city || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge bg="light" text="dark" className="px-3 py-2">
                      {user.username}
                    </Badge>
                  </td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.address?.city || 'N/A'}</td>
                  <td className="p-3 text-end">
                    <div className="btn-group">
                      <Link 
                        to={`/users/${user.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link 
                        to={`/edit-user/${user.id}`} 
                        className="btn btn-sm btn-outline-secondary"
                      >
                        <i className="bi bi-pencil"></i>
                      </Link>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-5">
                  <div className="py-5">
                    <i className="bi bi-search display-1 text-muted d-block mb-3"></i>
                    <h4>No users found</h4>
                    <p className="text-muted">Try changing your search term or add a new user</p>
                    <Link to="/add-user">
                      <Button variant="primary">Add New User</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
            />
            <Pagination.Prev 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            />
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => Math.abs(page - currentPage) < 3 || page === 1 || page === totalPages)
              .map((page, index, array) => {
                const prevPage = array[index - 1];
                return (
                  <React.Fragment key={page}>
                    {index > 0 && prevPage !== page - 1 && (
                      <Pagination.Ellipsis disabled />
                    )}
                    <Pagination.Item
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  </React.Fragment>
                );
              })}
            
            <Pagination.Next 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UsersList; 