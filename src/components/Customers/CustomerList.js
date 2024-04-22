// src/components/CustomerList.js
import React from 'react';
import CustomersTable from './CustomersTable';

const CustomerList = ({ customers, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Customers</h2>
      <CustomersTable customers={customers} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default CustomerList;
