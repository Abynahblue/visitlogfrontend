import './AdminPage.css'

const VisitorReadOnlyRow = ({ visitor, handleVisitorEditClick, handleVisitorDeleteClick }) => {
  console.log("all us", visitor);
  return (
    <tr>
      <td>{visitor?.fullName}</td>
      <td>{visitor.email}</td>
      <td>
    {visitor.phone}
</td>
      <td>{visitor.position}</td>
      <td className='action_btn'>
          <button className='edit_btn' type='button' onClick={(e) => handleVisitorEditClick(e, visitor)}>Edit</button>
          <button className='delete_btn' type='button' onClick={() => handleVisitorDeleteClick(visitor.Id)} >Delete</button>
      </td>
    </tr>
  );
};

export default VisitorReadOnlyRow;
