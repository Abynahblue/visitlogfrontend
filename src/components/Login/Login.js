import { Box, Button, FormControl, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { API } from '../../api/axiosClient';
import React, { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    //const [employee, setEmployee] = useState([]);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
  const qrlogindata = useLocation().state
  console.log('log in');    // const fetchEmployeesData = async () => {
    //   const { data } = await API.get('/guest/search');
    //   setEmployee(data?.data ?? []);
    // };
  
     const navigate = useNavigate()
  
    // useEffect(() => {
    //   fetchEmployeesData();
    // }, []);
  
    // Get check in time
    const timestamp = new Date(Date.now()).toISOString();
  
  //const url = '/visitorLogin';

  const [data, setData] = useState(() => { 
    if (qrlogindata)
    {
    console.log("qrdC BVNM,M: ",qrlogindata);

      return {email: qrlogindata?.email, password: qrlogindata?.password, hostEmail: qrlogindata?.hostEmail}
    }
    return {
      email: '',
      password: '',
      hostEmail:''
    }
  }
  );
  console.log(data);
  
    const handleChange = e => {
      const newData = { ...data };
      newData[e.target.id] = e.target.value;
      setData(newData);
    };

    const visitorEmail = data.email
  const visitorPassword = data.password
  const visitorHost = data.hostEmail
  //const visitorPosition = data.position
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newData = Object.assign(data, {timestamp: timestamp})

      if(!visitorEmail || !visitorPassword || !visitorHost) {
        toast.warn("Fill all fields")
        return;
      }
  
      try {
        const { data } = await API.post('/guest/login', newData)
        console.log(data)
        if (data)
        {
          localStorage.setItem('visitLogId', data.data.visitLog._id)
          toast.success("Login successful");
          navigate('/signedIn');
        }
      } catch (error)
      {
        const errorMessage = error.response ? error.response.data.message : 'Invalid email or password';
        console.log(errorMessage);
        toast.error(errorMessage);
      }
      
    };



  return (
    <Box display="flex" justifyContent="center" alignItems='center' height="100vh">
    <FormControl
      isRequired
      w="30%"
      p={5}
      m={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      borderRadius="1rem"
      boxShadow="2xl"
      bg="orange.120"
    >
      <Text
        fontSize="1.2em"
        fontWeight="extrabold"
        textTransform="uppercase"
        letterSpacing="2px"
        textAlign="center"
        mb={5}
      >
        Login
      </Text>

      <Input
        onChange={e => handleChange(e)}
        value={data.email}
        type="email"
        id="email"
        mt={2}
        placeholder="Email"
        required='required'
      />
      <InputGroup size='md'>
      <Input
        onChange={e => handleChange(e)}
        type={show ? 'text' : 'password'}
        value={data.password}
        id="password"
        mt={2}
        placeholder="Password"
        required='required'
      />
      <InputRightElement width='4.5rem' h='3.5rem' onClick={handleClick}>
          {show ? <BiShow /> : <BiHide />}
      </InputRightElement>
      </InputGroup>

      <Input
        onChange={e => handleChange(e)}
        value={data.hostEmail}
        isRequired
        id="hostEmail"
        placeholder="Host email"
        mt={2}
        required='required'
      />
       
      {/* <Input
        onChange={e => handleChange(e)}
        value={data.host}
        isRequired
        id="host"
        placeholder="Who are you visiting?"
        mt={2}
      >
        {employee ? (
          employee.map(user => {
            return <option value={user._id}>{user.fullName}</option>;
          })
        ) : (
          <option value="yvonne smith">Yvonne Smith</option>
        )}

        {/*  */}
       

      <Button
        onClick={handleSubmit}
        type="submit"
        colorScheme="orange"
        variant="solid"
        mt={4}
      >
        Login
      </Button>

      <Text textAlign='center' mt={3}>Don't have an account? <button onClick={() => {
        navigate("/signUp")
      }} style={{fontWeight: 900, color: 'blue', textDecoration: 'underline'}}>Sign up</button> here</Text>
    </FormControl>
  </Box>
  )
}

export default Login