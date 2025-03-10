import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for displaying data tables with a header and action button
 */
const DataCard = ({
  title,
  children,
  actionLabel,
  actionLink,
  actionIcon,
  actionVariant = 'primary',
  actionSize = 'sm',
  className = '',
  ...props
}) => {
  return (
    <Card className={`h-100 ${className}`} {...props}>
      <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        {actionLabel && actionLink && (
          <a 
            href={actionLink} 
            className={`btn btn-${actionVariant} btn-${actionSize}`}
          >
            {actionIcon && <i className={`bi bi-${actionIcon} ${actionLabel ? 'me-1' : ''}`}></i>}
            {actionLabel}
          </a>
        )}
      </Card.Header>
      <Card.Body className="p-0">
        {children}
      </Card.Body>
    </Card>
  );
};

DataCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actionLabel: PropTypes.string,
  actionLink: PropTypes.string,
  actionIcon: PropTypes.string,
  actionVariant: PropTypes.string,
  actionSize: PropTypes.string,
  className: PropTypes.string
};

export default DataCard; 