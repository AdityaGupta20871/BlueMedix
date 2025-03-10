import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * A reusable component for displaying activity lists
 */
const ActivityList = ({
  activities,
  formatDate,
  title = 'Recent Activity',
  emptyMessage = 'No recent activity',
  viewAllLink = null,
  className = '',
  ...props
}) => {
  return (
    <Card className={`h-100 ${className}`} {...props}>
      <Card.Header className="bg-transparent">
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body className="p-0">
        {activities.length === 0 ? (
          <div className="text-center py-4">
            <i className="bi bi-calendar-x fs-1 text-muted"></i>
            <p className="mt-2 mb-0">{emptyMessage}</p>
          </div>
        ) : (
          <div className="activity-list">
            {activities.map((activity, index) => (
              <div key={index} className="p-3 border-bottom d-flex align-items-start">
                <div className={`bg-${activity.color} bg-opacity-10 text-${activity.color} rounded-circle p-2 me-3`}>
                  <i className={`bi bi-${activity.icon}`}></i>
                </div>
                <div>
                  <p className="mb-0 fw-medium">{activity.message}</p>
                  <div className="d-flex align-items-center">
                    <small className="text-muted">{activity.user}</small>
                    <div className="mx-1 text-muted">•</div>
                    <small className="text-muted">{formatDate(activity.timestamp)}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
      {viewAllLink && (
        <Card.Footer className="bg-transparent text-center">
          {typeof viewAllLink === 'string' ? (
            <Button variant="link" className="text-decoration-none" href={viewAllLink}>
              View All Activity
            </Button>
          ) : (
            <Button variant="link" className="text-decoration-none" onClick={viewAllLink}>
              View All Activity
            </Button>
          )}
        </Card.Footer>
      )}
    </Card>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      user: PropTypes.string,
      timestamp: PropTypes.string.isRequired
    })
  ).isRequired,
  formatDate: PropTypes.func.isRequired,
  title: PropTypes.string,
  emptyMessage: PropTypes.string,
  viewAllLink: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  className: PropTypes.string
};

export default ActivityList; 