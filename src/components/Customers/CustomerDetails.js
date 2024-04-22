// src/components/customerDetails.js
import React from 'react';

const CustomerDetails = ({ customer }) => {
  if (!customer) {
    return <div>No customer selected.</div>;
  }


  return (
    <div>
      <h2>customer Details</h2>
      <p>ID: {customer.customerID}</p>
      <p>Full Name: {customer.fullName}</p>
      <p>Date Of Birth: {customer.dateOfBirth}</p>
      <p>Gender: {customer.gender}</p>
      <p>Marial Status: {customer.maritalStatus}</p>
      <p>Contact Number: {customer.contactNumber}</p>
      <p>Email Address: {customer.emailAddress}</p>
    </div>
  );
};

export default CustomerDetails;
