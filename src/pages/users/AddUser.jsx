import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { createUser } from '../../services/userService';

import FormLayout from '../../components/common/FormLayout';
import FormGroup from '../../components/common/FormGroup';
import FormActions from '../../components/common/FormActions';

const AddUser = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: ''
    },
    address: {
      city: '',
      street: '',
      number: '',
      zipcode: '',
      geolocation: {
        lat: '',
        long: ''
      }
    },
    phone: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
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

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      await createUser(values);
      resetForm();
      navigate('/users', { state: { message: 'User successfully created!' } });
    } catch (err) {
      setError('Failed to create user. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout title="Add New User" backUrl="/users">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                  label="Password" 
                  name="password"
                  required
                  error={errors.password && touched.password ? errors.password : null}
                >
                  <Field
                    as={Form.Control}
                    type="password"
                    name="password"
                    isInvalid={errors.password && touched.password}
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
              submitText="Create User"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default AddUser; 