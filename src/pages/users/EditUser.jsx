import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { getUserById, updateUser } from '../../services/userService';

import FormLayout from '../../components/common/FormLayout';
import FormGroup from '../../components/common/FormGroup';
import FormActions from '../../components/common/FormActions';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details. Please try again later.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    name: Yup.object({
      firstname: Yup.string().required('First name is required'),
      lastname: Yup.string().required('Last name is required')
    }),
    address: Yup.object({
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
      number: Yup.string().required('Number is required'),
      zipcode: Yup.string().required('Zipcode is required'),
      geolocation: Yup.object({
        lat: Yup.string().required('Latitude is required'),
        long: Yup.string().required('Longitude is required')
      })
    }),
    phone: Yup.string().required('Phone is required')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await updateUser(id, values);
      navigate('/users', { state: { message: 'User successfully updated!' } });
    } catch (err) {
      setError('Failed to update user. Please try again later.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <FormLayout title="User Not Found" backUrl="/users">
        <Alert variant="warning">
          The requested user could not be found. Please check the user ID and try again.
        </Alert>
      </FormLayout>
    );
  }

  return (
    <FormLayout title="Edit User" backUrl="/users">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Formik
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <h5 className="mb-3 fw-bold">Personal Information</h5>
                
                <FormGroup 
                  label="First Name" 
                  name="name.firstname"
                  required
                  error={errors.name?.firstname && touched.name?.firstname ? errors.name.firstname : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="name.firstname"
                    isInvalid={errors.name?.firstname && touched.name?.firstname}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Last Name" 
                  name="name.lastname"
                  required
                  error={errors.name?.lastname && touched.name?.lastname ? errors.name.lastname : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="name.lastname"
                    isInvalid={errors.name?.lastname && touched.name?.lastname}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Email" 
                  name="email"
                  required
                  error={errors.email && touched.email ? errors.email : null}
                >
                  <Field
                    as={Form.Control}
                    type="email"
                    name="email"
                    isInvalid={errors.email && touched.email}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Username" 
                  name="username"
                  required
                  error={errors.username && touched.username ? errors.username : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="username"
                    isInvalid={errors.username && touched.username}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Phone" 
                  name="phone"
                  required
                  error={errors.phone && touched.phone ? errors.phone : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="phone"
                    isInvalid={errors.phone && touched.phone}
                  />
                </FormGroup>
              </Col>
              
              <Col md={6}>
                <h5 className="mb-3 fw-bold">Address Information</h5>
                
                <FormGroup 
                  label="Street" 
                  name="address.street"
                  required
                  error={errors.address?.street && touched.address?.street ? errors.address.street : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.street"
                    isInvalid={errors.address?.street && touched.address?.street}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Number" 
                  name="address.number"
                  required
                  error={errors.address?.number && touched.address?.number ? errors.address.number : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.number"
                    isInvalid={errors.address?.number && touched.address?.number}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="City" 
                  name="address.city"
                  required
                  error={errors.address?.city && touched.address?.city ? errors.address.city : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.city"
                    isInvalid={errors.address?.city && touched.address?.city}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Zipcode" 
                  name="address.zipcode"
                  required
                  error={errors.address?.zipcode && touched.address?.zipcode ? errors.address.zipcode : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.zipcode"
                    isInvalid={errors.address?.zipcode && touched.address?.zipcode}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Latitude" 
                  name="address.geolocation.lat"
                  required
                  error={errors.address?.geolocation?.lat && touched.address?.geolocation?.lat ? errors.address.geolocation.lat : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.geolocation.lat"
                    isInvalid={errors.address?.geolocation?.lat && touched.address?.geolocation?.lat}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Longitude" 
                  name="address.geolocation.long"
                  required
                  error={errors.address?.geolocation?.long && touched.address?.geolocation?.long ? errors.address.geolocation.long : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="address.geolocation.long"
                    isInvalid={errors.address?.geolocation?.long && touched.address?.geolocation?.long}
                  />
                </FormGroup>
              </Col>
            </Row>
            
            <FormActions 
              cancelUrl="/users" 
              cancelText="Cancel"
              submitText="Update User"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default EditUser; 