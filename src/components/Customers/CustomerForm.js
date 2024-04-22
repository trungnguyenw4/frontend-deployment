// src/components/StudentForm.js
import React from 'react';

const CustomerForm = ({ customer, handleInputChange, handleSubmit, handleCancel }) => {
  return (
    <div>
      <h2>Customer Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={customer.fullName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Date Of Birth:
          <input type="date" name="dateOfBirth" value={customer.dateOfBirth} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" value={customer.gender} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Marital Status:
          <input type="text" name="maritalStatus" value={customer.maritalStatus} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Contact Number:
          <input type="text" name="contactNumber" value={customer.contactNumber} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email Address:
          <input type="email" name="emailAddress" value={customer.emailAddress} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};


export default CustomerForm;
