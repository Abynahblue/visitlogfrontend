import './AdminPage.css'

const VisitorReadOnlyRow = ({ visitor, handleVisitorEditClick, handleVisitorDeleteClick }) => {
  console.log("all us", visitor);
  return (
    <tr>
      <td>{visitor.guest_id?.fullName}</td>
      <td>{new Date(visitor.sign_in).toLocaleString()}</td>
      <td>
    {(visitor.sign_out && visitor.sign_out.date !== null )
    ? new Date(visitor.sign_out.date).toLocaleString()
    : "Not signed out"}
</td>
      <td>{visitor.user_id?.fullName}</td>
      <td>
          <button className='edit_btn' type='button' onClick={(e) => handleVisitorEditClick(e, visitor)}>Edit</button>
          <button className='delete_btn' type='button' onClick={() => handleVisitorDeleteClick(visitor.Id)} >Delete</button>
      </td>
    </tr>
  );
};

export default VisitorReadOnlyRow;
