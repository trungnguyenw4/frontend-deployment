// src/components/CustomersTable.js
import React from 'react';


const CustomersTable = ({ customers, handleEdit, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>customerID</th>
          <th>Full Name</th>
          <th>Date Of Birth</th>
          <th>Gender</th>
          <th>Marial Status</th>
          <th>Contact Number</th>
          <th>Email Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  {customers.map((customer) => (
    <tr key={customer.customerId}>
      <td>{customer.customerId}</td>
      <td>{customer.fullName}</td>
      <td>{customer.dateOfBirth}</td>
      <td>{customer.gender}</td>
      <td>{customer.maritalStatus}</td>
      <td>{customer.contactNumber}</td>
      <td>{customer.emailAddress}</td>
      <td>
        <button onClick={() => handleEdit(customer.customerId)}>Edit</button>
        <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

    </table>
  );
};

export default CustomersTable;