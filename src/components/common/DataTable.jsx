import React from 'react';
import { Table, Pagination, Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable data table component with pagination and search
 */
const DataTable = ({
  columns,
  data,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  searchTerm = '',
  onSearchChange,
  isLoading = false,
  emptyMessage = 'No data available',
  className = '',
  ...props
}) => {
  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);
  
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
    );
    
    // First page
    if (currentPage > 2) {
      items.push(
        <Pagination.Item 
          key={1} 
          onClick={() => onPageChange(1)}
        >
          1
        </Pagination.Item>
      );
      
      if (currentPage > 3) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }
    
    // Current page and neighbors
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      items.push(
        <Pagination.Item 
          key={i} 
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    
    // Last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      
      items.push(
        <Pagination.Item 
          key={totalPages} 
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }
    
    // Next button
    items.push(
      <Pagination.Next 
        key="next" 
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      />
    );
    
    return items;
  };
  
  return (
    <div className={`data-table-container ${className}`}>
      {onSearchChange && (
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <InputGroup.Text 
                className="cursor-pointer" 
                onClick={() => onSearchChange('')}
              >
                <i className="bi bi-x-circle"></i>
              </InputGroup.Text>
            )}
          </InputGroup>
        </div>
      )}
      
      <div className="table-responsive">
        <Table hover responsive className="mb-0" {...props}>
          <thead className="bg-light">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className || ''}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 mb-0">Loading data...</p>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="mt-2 mb-0">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={column.className || ''}>
                      {column.render ? column.render(item) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="small text-muted">
            Showing {Math.min(data.length, startIndex + 1)} to {Math.min(data.length, startIndex + itemsPerPage)} of {data.length} entries
          </div>
          <Pagination className="mb-0">
            {renderPaginationItems()}
          </Pagination>
        </div>
      )}
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string,
      render: PropTypes.func,
      className: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func,
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  className: PropTypes.string
};

export default DataTable; 