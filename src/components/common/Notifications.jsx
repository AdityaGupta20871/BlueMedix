import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useAppContext } from '../../contexts/AppContext';

const Notifications = () => {
  const { notifications } = useAppContext();
  
  if (notifications.length === 0) return null;

  return (
    <ToastContainer className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1060 }}>
      {notifications.map(notification => (
        <Toast 
          key={notification.id}
          className="mb-2"
          bg={notification.type === 'success' ? 'success' : notification.type === 'error' ? 'danger' : 'info'}
        >
          <Toast.Header closeButton={false}>
            <i 
              className={`bi bi-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2`}
            />
            <strong className="me-auto">
              {notification.type === 'success' ? 'Success' : notification.type === 'error' ? 'Error' : 'Info'}
            </strong>
            <small>{new Date(notification.timestamp).toLocaleTimeString()}</small>
          </Toast.Header>
          <Toast.Body className={notification.type === 'error' ? 'text-white' : ''}>
            {notification.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Notifications; 