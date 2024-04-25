
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import CustomerForm from './CustomerForm';

import  Modal  from 'react-bootstrap/Modal';



const tokenString = sessionStorage.getItem('token')
const userToken = JSON.parse(tokenString)

const headers = { Authorization: `Bearer ${userToken}`};

const modalStyles = {
  
  borderRadius: '8px',

  margin: 'auto',
  textAlign: 'center',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  
  width: '600px', 
  height: '670px', 

  overflow: 'hidden',
};


function Customers(){

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    // Fetch Customers data when component mounts
    //window.location.reload(1);
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}Customers`, {
        headers:headers});
      setCustomers(response.data);
      setSelectedCustomer(null);
      setEditingCustomer(null);
    } catch (error) {
      console.error('Error fetching Customers:', error);
    }
  };

  
  const handleEdit = (customerId) => {
    console.log('Edit button clicked for id:', customerId);
    const selected = customers.find((customer) => customer.customerId === customerId);
    console.log('Selected Customer:', selected);
    setSelectedCustomer(null);

    // Ensure that the property names match the expected format (id, firstName, lastName, enrollmentDate)
    setEditingCustomer({ customerId: selected.customerId, fullName: selected.fullName, dateOfBirth: selected.dateOfBirth, gender: selected.gender, maritalStatus : selected.maritalStatus, contactNumber: selected.contactNumber,  emailAddress: selected.emailAddress  });
    setShow(true);
  };



  const handleDelete = async (customerId) => {
    try {
      await axios.delete(`${API_BASE_URL}Customers/${customerId}`, {
        headers:headers});
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting Customer:', error);
    }
  };


  const handleCreate = () => {
    setSelectedCustomer(null);
    setEditingCustomer({ customerId :"", fullName: "", dateOfBirth: "", gender: "", maritalStatus : "", contactNumber: "",  emailAddress: "" }); 
    setShow(true); // Open modal when creating
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
    setShow(false); // Close modal when cancel editing
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Editing Customer:', editingCustomer);

      if (editingCustomer) {
        if (editingCustomer.customerId) {
          console.log('Updating existing Customer:', editingCustomer);
          await axios.put(`${API_BASE_URL}Customers/${editingCustomer.customerId}`, editingCustomer, {
            headers:headers});

        } else {
          // Remove the existing id property for new Customers
          const { customerId, ...newCustomer } = editingCustomer;
          console.log('Creating new Customer:', newCustomer);
          await axios.post(`${API_BASE_URL}Customers`, newCustomer, {
            headers:headers});
        }
        fetchCustomers();
      }
    } catch (error) {
      console.error('Error saving Customer:', error);
      console.error('Response data:', error.response?.data);
    } finally {
      setEditingCustomer(null);
      setShow(false); // Close modal after form submission
    }
  };



return (
  <div className='container' >
 <button onClick={handleCreate}>Create New Customer</button>

    <CustomerList customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
    {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}

    <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} style={modalStyles}>
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>
      {editingCustomer &&(
        <CustomerForm
          customer={editingCustomer}
          handleInputChange={(e) => setEditingCustomer({ ...editingCustomer, [e.target.name]: e.target.value })}
          handleSubmit={handleFormSubmit}
          handleCancel={handleCancelEdit}
        />
      )}
      </Modal.Body>
    </Modal>
   
  </div>
);
}


export default Customers;
