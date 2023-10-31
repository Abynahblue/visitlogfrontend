import React, { useState } from 'react';
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  InputGroup,
  InputRightElement,
  useToast,
  Select
} from '@chakra-ui/react';
import { API } from '../../api/axiosClient';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

// Visitor submission form
const Forms = () => {
  // const [employee, setEmployee] = useState([]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast()

  const navigate = useNavigate();

  // const fetchEmployeesData = async () => {
  //   const { data } = await API.get('/guest/search');
  //   setEmployee(data?.data ?? []);
  // };

  // useEffect(() => {
  //   fetchEmployeesData();
  // }, []);

  // Get check in time
  const timestamp = new Date(Date.now()).toISOString();
  console.log(timestamp);

  const [data, setData] = useState({
    name: '',
    company: '',
    tel: '',
    email: '',
    password: '',
    position: '',
    hostEmail:''
  });

  const handleChange = e => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const visitorName = data.name
  const visitorCompany = data.company
  const visitorPhone = data.tel
  const visitorEmail = data.email
  const visitorPassword = data.password
  const visitorHost = data.hostEmail


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = Object.assign(data, { timestamp: timestamp });

    if (!visitorName || !visitorCompany || !visitorPhone || !visitorEmail || !visitorPassword 
       || !visitorHost
    )
    {
      toast({
        title: 'Fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return;
    } 

    try {
       const {data} = await API.post('/guest', newData);

      if (data)
      {
        console.log("data response", data)
        toast({
          title: 'Sign up successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/signedIn');
      }
    } catch(error) {
      toast({
        title: 'Failed login',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }

  };

  return (
    <Box display="flex" justifyContent="center" alignItems='center' height="95vh" className='sign_up_container'>
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
          Tell us about yourself
        </Text>

        <Input
          onChange={e => handleChange(e)}
          value={data.name}
          type="text"
          id="name"
          placeholder="Full name"
          required="required"
        />
        <Input
          onChange={e => handleChange(e)}
          value={data.company}
          type="text"
          id="company"
          mt={2}
          placeholder="Company"
          required="required"
        />
        <Input
          onChange={e => handleChange(e)}
          value={data.tel}
          type="tel"
          id="tel"
          mt={2}
          placeholder="Phone"
          required="required"
        />
        <Input
          onChange={e => handleChange(e)}
          value={data.email}
          type="email"
          id="email"
          mt={2}
          placeholder="Email"
          required="required"
        />
        <InputGroup size="md">
          <Input
            onChange={e => handleChange(e)}
            value={data.password}
            id="password"
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Password"
            required="required"
            mt={2}
          />
          
          <InputRightElement width="3rem" h="3.5rem" onClick={handleClick}>
            {show ? <BiShow /> : <BiHide />}
          </InputRightElement>
        </InputGroup>

        <Input
            onChange={e => handleChange(e)}
            value={data.hostEmail}
            type='hostEmail'
            id='hostEmail'
            mt={2}
            placeholder='Host email'
            required="required"
          />
        <Select
          onChange={e => handleChange(e)}
          value={data.position}
          isRequired
          id="position"
          placeholder="Select your position"
          mt={2}
          required="required"
        >
          <option value="visitor">Visitor</option>
          <option value="contractor">Contractor</option>
        </Select>
       
        <Button
          onClick={e => handleSubmit(e)}
          type="submit"
          colorScheme="orange"
          variant="solid"
          mt={4}
        >
          Sign Up
        </Button>

        <Text textAlign="center" mt={5}>
          Already signed up? <span> <button onClick={() => {
            navigate("/visitorLogin")
          }} style={{color: 'blue', fontWeight: 900, textDecoration: 'underline'}}>Login</button> </span> here
        </Text>
      </FormControl>
    </Box>
  );
};

export default Forms;
