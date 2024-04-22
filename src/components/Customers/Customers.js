// src/components/Customers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../apiConfig';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import CustomerForm from './CustomerForm';

import  Button  from 'react-bootstrap/Button';
import  Modal  from 'react-bootstrap/Modal';
//import useToken from '../../components/useToken'

//import { useAuth } from "../../components/authProvider2";
//import { useAuth } from "../../components/authProvider2";


const tokenString = sessionStorage.getItem('token')
const userToken = JSON.parse(tokenString)

const headers = { Authorization: `Bearer ${userToken}`};



function Customers(){
//const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
 const handleShow = () => setShow(true);


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

  const handleViewDetails = (customerId) => {
    const selected = Customers.find((customer) => customer.customerId === customerId);
    setSelectedCustomer(selected);
    setEditingCustomer(null);
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
  <div>
    <CustomerList customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
    {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}

    <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
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
    <button onClick={handleCreate}>Create New Customer</button>
  </div>
);
}


export default Customers;
