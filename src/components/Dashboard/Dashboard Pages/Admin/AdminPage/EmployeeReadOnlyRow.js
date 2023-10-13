import React from 'react';

const   EmployeeReadOnlyRow = ({ employee, handleEmployeeEditClick, handleEmployeeDeleteClick }) => {

  return (

    <tr key={employee.fullName}>
      <td>{employee.fullName}</td>
      <td>{employee.email}</td>
      {/* <td>{employee.password}</td> */}
      <td>{employee.phone}</td>
      <td>{employee.role}</td>
      <td className='action_btn'>
          <button className='edit_btn' type='button' onClick={(e) => handleEmployeeEditClick(e, employee)}>Edit</button>
          <button className='delete_btn' type='button' onClick={() => handleEmployeeDeleteClick(employee.Id)} >Delete</button>
      </td>
    </tr>
      
  

    
  );
};

export default EmployeeReadOnlyRow;
