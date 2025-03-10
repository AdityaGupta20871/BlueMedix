import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Spinner, Badge, Pagination } from 'react-bootstrap';
import { useAppContext } from '../../contexts/AppContext';

const ProductsList = () => {
  const { products, loading, deleteProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const productsPerPage = 6;
  
  // Search and sort functionality
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      return sortOrder === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
      } catch (err) {
        console.error('Error deleting product:', err);
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
          <h1 className="display-6 fw-bold mb-1">Products</h1>
          <p className="text-muted">Manage your product catalog</p>
        </div>
        <Link to="/add-product">
          <Button variant="primary" className="d-flex align-items-center">
            <i className="bi bi-plus-lg me-2"></i>
            Add Product
          </Button>
        </Link>
      </div>
      
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="dropdown">
                <Button 
                  variant="outline-secondary" 
                  className="dropdown-toggle" 
                  data-bs-toggle="dropdown"
                >
                  Sort By: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
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
                      onClick={() => handleSort('title')}
                    >Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('price')}
                    >Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={() => handleSort('category')}
                    >Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      {filteredProducts.length === 0 ? (
        <Card className="text-center shadow-sm border-0 p-5">
          <Card.Body>
            <i className="bi bi-search display-1 text-muted mb-3"></i>
            <h3>No products found</h3>
            <p className="text-muted">Try changing your search term or add a new product</p>
            <Link to="/add-product">
              <Button variant="primary">Add New Product</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4 mb-4">
            {currentProducts.map((product) => (
              <Col key={product.id}>
                <Card className="h-100 border-0 shadow-sm card-hover product-card">
                  <div className="product-img-container p-4">
                    <Card.Img 
                      variant="top" 
                      src={product.image} 
                      alt={product.title} 
                      className="product-img"
                    />
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg="primary" className="bg-opacity-10 text-primary px-2 py-1">
                        {product.category}
                      </Badge>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <small>{product.rating.rate}</small>
                      </div>
                    </div>
                    <Card.Title className="h5 mb-2" style={{ minHeight: '40px' }}>
                      {product.title.length > 40 
                        ? `${product.title.substring(0, 40)}...` 
                        : product.title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-3" style={{ minHeight: '60px' }}>
                      {product.description.length > 80 
                        ? `${product.description.substring(0, 80)}...` 
                        : product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 text-success">${product.price.toFixed(2)}</h5>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-top p-3">
                    <div className="d-flex justify-content-between">
                      <Link 
                        to={`/products/${product.id}`} 
                        className="btn btn-sm btn-outline-primary"
                      >
                        <i className="bi bi-eye me-1"></i> View
                      </Link>
                      <div>
                        <Link 
                          to={`/edit-product/${product.id}`} 
                          className="btn btn-sm btn-outline-secondary me-2"
                        >
                          <i className="bi bi-pencil me-1"></i> Edit
                        </Link>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <i className="bi bi-trash me-1"></i> Delete
                        </Button>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
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
        </>
      )}
    </div>
  );
};

export default ProductsList; 