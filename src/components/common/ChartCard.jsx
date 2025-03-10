import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for displaying charts in a card
 */
const ChartCard = ({
  title,
  children,
  actions = [],
  className = '',
  ...props
}) => {
  return (
    <Card className={`h-100 ${className}`} {...props}>
      <Card.Header className="bg-transparent d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        {actions.length > 0 && (
          <div>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'outline-secondary'}
                size={action.size || 'sm'}
                className={`${index > 0 ? 'ms-2' : ''} ${action.className || ''}`}
                onClick={action.onClick}
                href={action.href}
              >
                {action.icon && <i className={`bi bi-${action.icon} ${action.label ? 'me-1' : ''}`}></i>}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string,
      variant: PropTypes.string,
      size: PropTypes.string,
      className: PropTypes.string,
      onClick: PropTypes.func,
      href: PropTypes.string
    })
  ),
  className: PropTypes.string
};

export default ChartCard; 