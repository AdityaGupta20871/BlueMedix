import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

// Initial state
const initialState = {
  users: [],
  products: [],
  loading: false,
  error: null,
  notifications: [],
  currentUser: null
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USERS: 'SET_USERS',
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_USERS:
      return { ...state, users: action.payload };
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case ActionTypes.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ActionTypes.UPDATE_USER:
      return { 
        ...state, 
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ) 
      };
    case ActionTypes.DELETE_USER:
      return { 
        ...state, 
        users: state.users.filter(user => user.id !== action.payload) 
      };
    case ActionTypes.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case ActionTypes.UPDATE_PRODUCT:
      return { 
        ...state, 
        products: state.products.map(product => 
          product.id === action.payload.id ? action.payload : product
        ) 
      };
    case ActionTypes.DELETE_PRODUCT:
      return { 
        ...state, 
        products: state.products.filter(product => product.id !== action.payload) 
      };
    case ActionTypes.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return { 
        ...state, 
        notifications: state.notifications.filter(note => note.id !== action.payload) 
      };
    case ActionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        
        // Fetch users
        const usersResponse = await fetch('https://fakestoreapi.com/users');
        const usersData = await usersResponse.json();
        dispatch({ type: ActionTypes.SET_USERS, payload: usersData });
        
        // Fetch products
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        const productsData = await productsResponse.json();
        dispatch({ type: ActionTypes.SET_PRODUCTS, payload: productsData });
        
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      } catch (error) {
        console.error('Error fetching initial data:', error);
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    };
    
    fetchInitialData();
  }, []);

  // Add a notification
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    dispatch({
      type: ActionTypes.ADD_NOTIFICATION,
      payload: { id, message, type, timestamp: new Date() }
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
    }, 5000);
  };

  // User management
  const addUser = async (userData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const newUser = await response.json();
      dispatch({ type: ActionTypes.ADD_USER, payload: newUser });
      addNotification('User added successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to add user', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const updatedUser = await response.json();
      dispatch({ type: ActionTypes.UPDATE_USER, payload: updatedUser });
      addNotification('User updated successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to update user', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await fetch(`https://fakestoreapi.com/users/${userId}`, {
        method: 'DELETE'
      });
      
      dispatch({ type: ActionTypes.DELETE_USER, payload: userId });
      addNotification('User deleted successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.error('Error deleting user:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to delete user', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  // Product management
  const addProduct = async (productData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      const newProduct = await response.json();
      dispatch({ type: ActionTypes.ADD_PRODUCT, payload: newProduct });
      addNotification('Product added successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to add product', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      const updatedProduct = await response.json();
      dispatch({ type: ActionTypes.UPDATE_PRODUCT, payload: updatedProduct });
      addNotification('Product updated successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to update product', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE'
      });
      
      dispatch({ type: ActionTypes.DELETE_PRODUCT, payload: productId });
      addNotification('Product deleted successfully!', 'success');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    } catch (error) {
      console.error('Error deleting product:', error);
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
      addNotification('Failed to delete product', 'error');
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      throw error;
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        ...state, 
        addUser, 
        updateUser, 
        deleteUser, 
        addProduct, 
        updateProduct, 
        deleteProduct,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 