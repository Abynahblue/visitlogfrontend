import React from 'react';

const EmployeeEditableRow = ({ employeeEditFormData, handleEmployeeEditFormChange, handleEmployeeCancelClick }) => {
  return (
    <tr>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter name..."
          name="Full_Name"
          value={employeeEditFormData.Full_Name}
          onChange={handleEmployeeEditFormChange}
        />{' '}
      </td>
      <td>
        {' '}
        <input
          type="email"
          required="required"
          placeholder="Enter email..."
          name="Email"
          value={employeeEditFormData.Email}
          onChange={handleEmployeeEditFormChange}
        />{' '}
      </td>
      {/* <td>
        {' '}
        <input
          type="password"
          required="required"
          placeholder="Enter password..."
          name="Password"
          value={employeeEditFormData.Password}
          onChange={handleEmployeeEditFormChange}
        />{' '}
      </td> */}
      <td>
        {' '}
        <input
          type="tel"
          required="required"
          placeholder="Enter phone number..."
          name="Phone_Number"
          value={employeeEditFormData.Phone_Number}
          onChange={handleEmployeeEditFormChange}
        />{' '}
      </td>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter position..."
          name="Position"
          value={employeeEditFormData.Position}
          onChange={handleEmployeeEditFormChange}
        />{' '}
      </td>
      <td>
          <button className='update_btn' type='submit' >Update</button>
          <button className='cancel_btn' type='button' onClick={handleEmployeeCancelClick}>Cancel</button>
      </td>
    </tr>
  );
};

export default EmployeeEditableRow;
