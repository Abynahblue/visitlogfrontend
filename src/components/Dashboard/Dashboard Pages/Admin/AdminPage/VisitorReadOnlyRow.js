import './AdminPage.css'

const VisitorReadOnlyRow = ({ visitor, handleVisitorEditClick, handleVisitorDeleteClick }) => {
  return (
    <tr>
      <td>{visitor.guest_id.fullName}</td>
      <td>{visitor.sign_in}</td>
      <td>{visitor.sign_out?.date ?? "Not signed out"}</td>
      <td>{visitor.user_id.fullName}</td>
      <td>
          <button className='edit_btn' type='button' onClick={(e) => handleVisitorEditClick(e, visitor)}>Edit</button>
          <button className='delete_btn' type='button' onClick={() => handleVisitorDeleteClick(visitor.Id)} >Delete</button>
      </td>
    </tr>
  );
};

export default VisitorReadOnlyRow;
