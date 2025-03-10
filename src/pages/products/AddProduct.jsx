import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Row, Col, Alert, Image } from 'react-bootstrap';
import { createProduct } from '../../services/productService';

import FormLayout from '../../components/common/FormLayout';
import FormGroup from '../../components/common/FormGroup';
import FormActions from '../../components/common/FormActions';

const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    title: '',
    price: '',
    description: '',
    image: '',
    category: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be positive')
      .typeError('Price must be a number'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    category: Yup.string().required('Category is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    try {
      // Convert price to number
      const productData = {
        ...values,
        price: parseFloat(values.price),
        rating: { rate: 0, count: 0 } // Default rating for new product
      };
      
      await createProduct(productData);
      resetForm();
      navigate('/products', { state: { message: 'Product successfully created!' } });
    } catch (err) {
      setError('Failed to create product. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout title="Add New Product" backUrl="/products">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup 
                  label="Product Title" 
                  name="title"
                  required
                  error={errors.title && touched.title ? errors.title : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="title"
                    isInvalid={errors.title && touched.title}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Price ($)" 
                  name="price"
                  required
                  error={errors.price && touched.price ? errors.price : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="price"
                    isInvalid={errors.price && touched.price}
                  />
                </FormGroup>
                
                <FormGroup 
                  label="Category" 
                  name="category"
                  required
                  error={errors.category && touched.category ? errors.category : null}
                >
                  <Field
                    as={Form.Select}
                    name="category"
                    isInvalid={errors.category && touched.category}
                  >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </Field>
                </FormGroup>
                
                <FormGroup 
                  label="Image URL" 
                  name="image"
                  required
                  error={errors.image && touched.image ? errors.image : null}
                >
                  <Field
                    as={Form.Control}
                    type="text"
                    name="image"
                    isInvalid={errors.image && touched.image}
                  />
                </FormGroup>
                
                {values.image && (
                  <div className="mt-4 mb-3">
                    <Form.Label className="fw-medium">Image Preview</Form.Label>
                    <div className="border rounded p-2 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                      <Image
                        src={values.image}
                        alt="Product preview"
                        className="mw-100 mh-100"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  </div>
                )}
              </Col>
              
              <Col md={6}>
                <FormGroup 
                  label="Description" 
                  name="description"
                  required
                  error={errors.description && touched.description ? errors.description : null}
                >
                  <Field
                    as="textarea"
                    className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`}
                    name="description"
                    rows="12"
                  />
                </FormGroup>
              </Col>
            </Row>
            
            <FormActions 
              cancelUrl="/products" 
              cancelText="Cancel"
              submitText="Create Product"
              isSubmitting={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
};

export default AddProduct; 