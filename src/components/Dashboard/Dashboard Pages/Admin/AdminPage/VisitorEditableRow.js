import React from 'react';

const VisitorEditableRow = ({
  visitorEditFormData,
  handleVisitorEditFormChange,
  handleVisitorCancelClick,
}) => {
  return (
    <tr>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter name..."
          name="Full_name"
          value={visitorEditFormData.Full_name}
          onChange={handleVisitorEditFormChange}
        />{' '}
      </td>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter time in..."
          name="Time_In"
          value={visitorEditFormData.Time_In}
          onChange={handleVisitorEditFormChange}
        />{' '}
      </td>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter time out..."
          name="Time_Out"
          value={visitorEditFormData.Time_Out}
          onChange={handleVisitorEditFormChange}
        />{' '}
      </td>
      <td>
        {' '}
        <input
          type="text"
          required="required"
          placeholder="Enter host..."
          name="Full_Name"
          value={visitorEditFormData.Full_Name}
          onChange={handleVisitorEditFormChange}
        />{' '}
      </td>
      <td>
        <button className="update_btn" type="submit">
          Update
        </button>
        <button
          className="cancel_btn"
          type="button"
          onClick={handleVisitorCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default VisitorEditableRow;
