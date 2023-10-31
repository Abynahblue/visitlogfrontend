import { useState, useEffect, Fragment } from 'react';
import './AdminPage.css';
import Navbar from '../../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../../Dashboard Components/Sidebar/Sidebar';
import VisitorReadOnlyRow from './VisitorReadOnlyRow';
import { API } from '../../../../../api/axiosClient';
import EmployeeReadOnlyRow from './EmployeeReadOnlyRow';
import VisitorEditableRow from './VisitorEditableRow';
import EmployeeEditableRow from './EmployeeEditableRow';

const AdminPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null)

  
  // State of edit button
  const [editVisitorId, setEditVisitorId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  // Initial form state
  const [addVisitorFormData, setAddFormVisitorData] = useState({
    fullName: '',
    email: '',
    password: '',
    Phone_Number: '',
    Company: '',
    Position: '',
  });

  const [addEmployeeFormData, setAddFormEmployeeData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    position: '',
  });

  const [visitorEditFormData, setVisitorEditFormData] = useState({
    Full_name: '',
    Email: '',
    Password: '',
    Phone_Number: '',
    Company: '',
    Position: '',
  });

  const [employeeEditFormData, setEmployeeEditFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    position: '',
  });

  //fetching data from endpoint
  const fetchVisitorsData = async () => {
    const accessToken = localStorage.getItem("access_token")
    const { data } = await API.get('/guest', {headers: {"Authorization": `Bearer ${accessToken}`}});;
    setVisitors(data?.data ?? []);
    console.log("all us", visit);
  };

  useEffect(() => {
    fetchVisitorsData();
  }, []);

  const fetchEmployeesData = async () => {
    const { data } = await API.get('/hosts');
    setEmployees(data?.data ?? []);
    console.log(data);
  };

  useEffect(() => {
    fetchEmployeesData();
  }, []);

  //add form change
  const handleAddVisitorFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fielValue = e.target.value;

    const newFormData = { ...addVisitorFormData };
    newFormData[fieldName] = fielValue;

    setAddFormVisitorData(newFormData);
  };

  const handleAddEmployeeFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fielValue = e.target.value;

    const newFormData = { ...addEmployeeFormData };
    newFormData[fieldName] = fielValue;
    console.log(newFormData)
    setAddFormEmployeeData(newFormData);
  };

  const handleVisitorEditFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fieldValue = e.target.value;

    const newFormData = { ...visitorEditFormData };
    newFormData[fieldName] = fieldValue;

    console.log("dfd: ", fieldValue, fieldName)
    console.log("yyyyyyyyyyyyyyy: ", newFormData)
    setVisitorEditFormData(newFormData);
    
  };

  const handleEmployeeEditFormChange = e => {
    e.preventDefault();

    const fieldName = e.target.getAttribute('name');
    const fielValue = e.target.value;

    const newFormData = { ...employeeEditFormData };
    newFormData[fieldName] = fielValue;

    setEmployeeEditFormData(newFormData);
  };

  // add form submit
  const handleAddVisitorFormSubmit = e => {
    e.preventDefault();

    const newVisitor = {
      Full_name: addVisitorFormData.Full_name,
      Email: addVisitorFormData.Email,
      Password: addVisitorFormData.Password,
      Time_In: addVisitorFormData.Time_In,
      Time_Out: addVisitorFormData.Time_Out,
      Phone_Number: addVisitorFormData.Phone_Number,
      Company: addVisitorFormData.Company,
      Position: addVisitorFormData.Position,
      Full_Name: addVisitorFormData.Full_Name,
    };

    const newVisitors = [...visitors, newVisitor];
    setVisitors(newVisitors);
    setAddFormVisitorData({
      Full_name: '',
      Email: '',
      Password: '',
      Time_In: '',
      Time_Out: '',
      Phone_Number: '',
      Company: '',
      Position: '',
      Full_Name: '',
    });

    API.post('/guest', newVisitor);
  };

  const handleAddEmployeeFormSubmit = e => {
    e.preventDefault();

    const newEmployee = {
      fullName: addEmployeeFormData.fullName,
      email: addEmployeeFormData.email,
      // password: generateRandomPassword(),
      phone: addEmployeeFormData.phone,
      position: addEmployeeFormData.position,
    };

    // if (userToEdit)
    // {
    //   delete newEmployee["password"]
    // }

    const newEmployees = [...employees, newEmployee];
    setEmployees(newEmployees);
    setAddFormEmployeeData({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      position: '',
    });

    if (userToEdit)
    {
      console.log("user useer: ", userToEdit)
      API.put(`/users/${userToEdit._id}`, newEmployee);
      setUserToEdit(null);
    } else
    {
      API.post('/user', newEmployee);
    }
  };

  const handleVisitorEditFormSubmit = e => {
    e.preventDefault();

    // const editedVisitor = {
    //   Id: editVisitorId,
    //   Full_name: visitorEditFormData.guest.fullName,
    //   Email: visitorEditFormData.guest.email,
    //   Phone: visitorEditFormData.guest.phone,
    //   Position: visitorEditFormData.guest.position,
    // };

    // const newVisitors = [...visitors];
    // const index = visitors.findIndex(visitlog=> visitlog.guest_id._id === editVisitorId);

    // newVisitors[index] = editedVisitor;
    // setVisitors(newVisitors);
    // setEditVisitorId(null);

    API.put(`/update/${editVisitorId}`, visitorEditFormData);
    setVisitorEditFormData({
      Full_name: '',
      Email: '',
      Password: '',
      Phone_Number: '',
      Company: '',
      Position: '',
    })
    setEditVisitorId(null)
  };

  const handleEmployeeEditFormSubmit = e => {
    e.preventDefault();

    const editedEmployee = {
      Id: editEmployeeId,
      Full_Name: employeeEditFormData.fullName,
      Email: employeeEditFormData.email,
      Password: employeeEditFormData.password,
      Phone_Number: employeeEditFormData.phone,
      Position: employeeEditFormData.position,
    };
    console.log(editedEmployee);

    const newEmployees = [...employees];
    console.log(newEmployees);
    const index = employees.findIndex(
      employee => employee.Id === editEmployeeId
    );

    newEmployees[index] = editedEmployee;
    setEmployees(newEmployees);
    setEditEmployeeId(null);

    API.put(`/user/${editEmployeeId}`, editedEmployee);
  };

  //edit click
  const handleVisitorEditClick = (e, visitor) => {
    e.preventDefault();
    // setEditVisitorId(visitor.Id);
    
    const formValues = {
      Full_name: visitor.fullName,
      Email: visitor.email,
      Password: visitor.password,
      Phone_Number: visitor.phone,
      Company: visitor?.company,
      Position: visitor?.position,
    };
    
    setVisitorEditFormData(formValues);
    setEditVisitorId(visitor._id)
  };

  const handleEmployeeEditClick = (e, employee) => {
    console.log("lslsl: ", employee)
    e.preventDefault();
    setEditEmployeeId(employee.Id); 
    setUserToEdit(employee)
    setAddFormEmployeeData({
      password: employee.password,
      email: employee.email,
      phone: employee.phone,
      position: employee.role,
      fullName: employee.fullName
    })

    const formValues = {
      Full_Name: employee.fullName,
      Email: employee.email,
      Password: employee.password,
      Phone_Number: employee.phone,
      Position: employee.position,
    };

    setEmployeeEditFormData(formValues);
    console.log(formValues,"hello")
  };

  // cancel button
  const handleVisitorCancelClick = () => {
    setEditVisitorId(null);
  };

  const handleEmployeeCancelClick = () => {
    setEditEmployeeId(null);
  };

  //delete button
  const handleVisitorDeleteClick = visitorId => {
    const newVisitors = [...visitors];

    const index = visitors.findIndex(guest => guest._Id === visitorId);

    newVisitors.splice(index, 1);

    setVisitors(newVisitors);

    API.delete(`/deleteVisit/${visitorId}`);
  };

  const handleEmployeeDeleteClick = employeeId => {
    const newEmployees = [...employees];

    console.log(employeeId);

    const index = employees.findIndex(user => user._id === employeeId);

    newEmployees.splice(index, 1);

    setEmployees(newEmployees);

    API.delete(`/adminPage/deleteEmployee/${employeeId}`);
  };
  const visit = () => {
    console.log(visitors);
  }
  visit();

  return (
    <div className="admin_container">
      <Navbar />
      <div className="admin_sidebar">
        <Sidebar />
        <div className="admin_content">
          <span className="table_title">ADMIN VISITOR DATA</span>
          <form onSubmit={handleVisitorEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Visitor Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map(visitor => (
                  <Fragment>
                    {editVisitorId === visitor.id ? (
                      <VisitorEditableRow
                        visitorEditFormData={visitorEditFormData}
                        handleVisitorEditFormChange={
                          handleVisitorEditFormChange
                        }
                        handleVisitorCancelClick={handleVisitorCancelClick}
                      />
                    ) : (
                      <VisitorReadOnlyRow
                        visitor={visitor}
                        handleVisitorEditClick={handleVisitorEditClick}
                        handleVisitorDeleteClick={handleVisitorDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>

          <h2 className="subtitle">Edit a Visitor</h2>
          <form className="add_form" onSubmit={handleVisitorEditFormSubmit}>
            <input
              type="text"
              name="Full_name"
              required="required"
              placeholder="Name of visitor"
              onChange={handleVisitorEditFormChange}
              value={visitorEditFormData.Full_name}
            />
            <input
              type="text"
              name="Email"
              required="required"
              placeholder="Email"
              onChange={handleVisitorEditFormChange}
              value={visitorEditFormData.Email}
            />
            <input
              type="text"
              name="Phone_Number"
              required="required"
              placeholder="Phone"
              onChange={handleVisitorEditFormChange}
              value={visitorEditFormData.Phone_Number}
            />
            <input
              type="text"
              name="Position"
              required="required"
              placeholder="Position"
              onChange={handleVisitorEditFormChange}
              value={visitorEditFormData.Position}
            />
            <button type="submit" className="add_btn">
              Edit
            </button>
          </form>

          <span className="table_title admin_title">ADMIN EMPLOYEE DATA</span>
          <form onSubmit={handleEmployeeEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Email </th>
                  {/* <th>Password </th> */}
                  <th>Phone </th>
                  <th>Position </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(user => (
                  <Fragment>
                    {editEmployeeId === user._id ? (
                      <EmployeeEditableRow
                        employeeEditFormData={employeeEditFormData}
                        handleEmployeeEditFormChange={
                          handleEmployeeEditFormChange
                        }
                        handleEmployeeCancelClick={handleEmployeeCancelClick}
                      />
                    ) : (
                      <EmployeeReadOnlyRow
                        employee={user}
                        handleEmployeeEditClick={handleEmployeeEditClick}
                        handleEmployeeDeleteClick={handleEmployeeDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>

          <h2 className="subtitle">{ userToEdit != null ? "Edit an Employee" : "Add an Employee" }</h2>
          <form className="add_form" onSubmit={handleAddEmployeeFormSubmit}>
            <input
              type="text"
              name="fullName"
              required="required"
              placeholder="Name of host/employee"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.fullName}
            />
            <input
              type="email"
              name="email"
              required="required"
              placeholder="Email"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.email}
            />
            {/* {
              userToEdit != null && (<input
                type="password"
                name="password"
                required="required"
                placeholder="Password"
                onChange={handleAddEmployeeFormChange}
                value={addEmployeeFormData.password}
              />)
            } */}
            <input
              type="tel"
              name="phone"
              required="required"
              placeholder="Phone number"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.phone}
            />
            <input
              type="text"
              name="position"
              required="required"
              placeholder="Position"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.position}
            />
            <button type="submit" className="add_btn">
              {userToEdit != null ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
