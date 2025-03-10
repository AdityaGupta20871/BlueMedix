import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable card component for displaying statistics
 */
const StatCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary', 
  trend = null, 
  trendValue = null,
  className = '', 
  ...props 
}) => {
  return (
    <Card className={`stat-card ${color} h-100 ${className}`} {...props}>
      <Card.Body className="d-flex align-items-center">
        <div className={`stat-icon bg-${color} bg-opacity-10 text-${color} me-3`}>
          <i className={`bi bi-${icon} fs-4`}></i>
        </div>
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <h3 className="mb-0">{value}</h3>
          {trend && trendValue && (
            <small className={`text-${trend === 'up' ? 'success' : 'danger'}`}>
              <i className={`bi bi-arrow-${trend}`}></i> {trendValue}
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
  trend: PropTypes.oneOf(['up', 'down', null]),
  trendValue: PropTypes.string,
  className: PropTypes.string
};

export default StatCard; 