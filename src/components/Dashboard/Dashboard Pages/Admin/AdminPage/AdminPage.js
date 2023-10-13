import { useState, useEffect, Fragment } from 'react';
import './AdminPage.css';
import Navbar from '../../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../../Dashboard Components/Sidebar/Sidebar';
import axios from 'axios';
import VisitorReadOnlyRow from './VisitorReadOnlyRow';
import EmployeeReadOnlyRow from './EmployeeReadOnlyRow';
import VisitorEditableRow from './VisitorEditableRow';
import EmployeeEditableRow from './EmployeeEditableRow';

const AdminPage = () => {
  const [visitors, setVisitors] = useState([]);
  const [employees, setEmployees] = useState([]);

  // State of edit button
  const [editVisitorId, setEditVisitorId] = useState(null);
  const [editEmployeeId, setEditEmployeeId] = useState(null);

  // Initial form state
  const [addVisitorFormData, setAddFormVisitorData] = useState({
    fullName: '',
    email: '',
    password: '',
    Time_In: '',
    Time_Out: '',
    Phone_Number: '',
    Company: '',
    Position: '',
    Full_Name: '',
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
    Time_In: '',
    Time_Out: '',
    Phone_Number: '',
    Company: '',
    Position: '',
    Full_Name: '',
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
    const { data } = await axios.get('http://localhost:5010/api/v1/visitLogs');
    setVisitors(data?.data ?? []);
    console.log(data);
  };

  useEffect(() => {
    fetchVisitorsData();
  }, []);

  const fetchEmployeesData = async () => {
    const { data } = await axios.get('http://localhost:5010/api/v1/hosts');
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
    const fielValue = e.target.value;

    const newFormData = { ...visitorEditFormData };
    newFormData[fieldName] = fielValue;

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

    axios.post('http://localhost:5010/api/v1/guest', newVisitor);
  };

  const handleAddEmployeeFormSubmit = e => {
    e.preventDefault();

    const newEmployee = {
      fullName: addEmployeeFormData.fullName,
      email: addEmployeeFormData.email,
      password: addEmployeeFormData.password,
      phone: addEmployeeFormData.phone,
      position: addEmployeeFormData.position,
    };

    const newEmployees = [...employees, newEmployee];
    console.log("n:" ,newEmployee);
    setEmployees(newEmployees);
    setAddFormEmployeeData({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      position: '',
    });

    axios.post('http://localhost:5010/api/v1/user', newEmployee);
  };

  const handleVisitorEditFormSubmit = e => {
    e.preventDefault();

    const editedVisitor = {
      Id: editVisitorId,
      Full_name: visitorEditFormData.visitlog.guest_id.fullName,
      Time_In: visitorEditFormData.visitlog.sign_in,
      Time_Out: visitorEditFormData.visitlog.sign_out,
      Full_Name: visitorEditFormData.visitlog.user_id.fullName,
    };

    const newVisitors = [...visitors];
    const index = visitors.findIndex(visitlog=> visitlog.guest_id._id === editVisitorId);

    newVisitors[index] = editedVisitor;
    setVisitors(newVisitors);
    setEditVisitorId(null);

    axios.put(`/updateVisit/${editVisitorId}`, editedVisitor);
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

    axios.put(`http://localhost:5010/api/v1/user/${editEmployeeId}`, editedEmployee);
  };

  //edit click
  const handleVisitorEditClick = (e, visitor) => {
    e.preventDefault();
    setEditVisitorId(visitor.Id);

    const formValues = {
      Full_name: visitor.Full_name,
      Email: visitor.Email,
      Password: visitor.Password,
      sign_in: visitor.sign_in,
      sign_out: visitor.sign_out,
      Phone_Number: visitor.Phone_Number,
      Company: visitor.Company,
      Position: visitor.Position,
      Full_Name: visitor.Full_Name,
    };

    setVisitorEditFormData(formValues);
  };

  const handleEmployeeEditClick = (e, employee) => {
    e.preventDefault();
    setEditEmployeeId(employee.Id);

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

    axios.delete(`/deleteVisit/${visitorId}`);
  };

  const handleEmployeeDeleteClick = employeeId => {
    const newEmployees = [...employees];

    console.log(employeeId);

    const index = employees.findIndex(user => user._id === employeeId);

    newEmployees.splice(index, 1);

    setEmployees(newEmployees);

    axios.delete(`/adminPage/deleteEmployee/${employeeId}`);
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
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Host</th>
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

          {/* <h2 className="subtitle">Add a Visitor</h2>
          <form className="add_form" onSubmit={handleAddVisitorFormSubmit}>
            <input
              type="text"
              name="full_name"
              required="required"
              placeholder="Name of visitor"
              onChange={handleAddVisitorFormChange}
              value={addVisitorFormData.full_name}
            />
            <input
              type="text"
              name="sign_in"
              required="required"
              placeholder="Time in"
              onChange={handleAddVisitorFormChange}
              value={addVisitorFormData.Time_In}
            />
            <input
              type="text"
              name="sign_out"
              required="required"
              placeholder="Time out"
              onChange={handleAddVisitorFormChange}
              value={addVisitorFormData.Time_Out}
            />
            <input
              type="text"
              name="full_Name"
              required="required"
              placeholder="Host"
              onChange={handleAddVisitorFormChange}
              value={addVisitorFormData.Full_Name}
            />
            <button type="submit" className="add_btn">
              Add
            </button>
          </form> */}

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

          <h2 className="subtitle">Add an Employee</h2>
          <form className="add_form" onSubmit={handleAddEmployeeFormSubmit}>
            <input
              type="text"
              name="fullName"
              required="required"
              placeholder="Name of host/employee"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.Full_Name}
            />
            <input
              type="email"
              name="email"
              required="required"
              placeholder="Email"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.Email}
            />
            <input
              type="password"
              name="password"
              required="required"
              placeholder="Password"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.Password}
            />
            <input
              type="tel"
              name="phone"
              required="required"
              placeholder="Phone number"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.Phone_Number}
            />
            <input
              type="text"
              name="position"
              required="required"
              placeholder="Position"
              onChange={handleAddEmployeeFormChange}
              value={addEmployeeFormData.Position}
            />
            <button type="submit" className="add_btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
