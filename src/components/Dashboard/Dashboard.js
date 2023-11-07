import React, { useState } from 'react';
import {
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { BiHide, BiShow } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/axiosClient';
import { toast } from 'react-toastify';

// Dashboard Login
const Dashboard = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let navigate = useNavigate();

  const [state, setState] = useState({
    email: '',
    password: '',
  });



  const handleInputChange = e => {
    const value = e.target.value;

    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const userEmail = state.email;
  const password = state.password;

  const handleLogin = async () => {
    if (!userEmail || !password) {
      toast.warn('Fill all fields')
      return;
    } 

    try {
      const data = await API.post(
        '/user/login',
        { userEmail, password },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (data.status === 200)
      {
        localStorage.setItem("access_token", data.data.data.token)
        toast.success('Login successful');
        navigate('/dashboardPage');
      }
    } catch (error)
    {
      const errorMessage = error.response ? error.response.data.message : 'Invalid email or password';
      toast.error(errorMessage);
    }
  };

 

  return (
    <Center h="100vh" bg="blackAlpha.400">
      <FormControl
        w="25%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius="1rem"
        boxShadow="2xl"
        bg="gray.100"
        p={7}
      >
        <Heading size="lg">Login</Heading>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          mt={4}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <InputGroup size="md">
          <Input
            name="password"
            pr="3rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            mt={4}
            mb={8}
            onChange={handleInputChange}
            required
          />
          <InputRightElement
            width="3rem"
            h="4.5rem"
            size="sm"
            onClick={handleClick}
          >
            {show ? <BiShow /> : <BiHide />}
          </InputRightElement>
        </InputGroup>
        <Center>
        <Button bg="#e77449" color="white" size="md" onClick={handleLogin}>
            Submit
          </Button>
        </Center>
      </FormControl>
    </Center>
  );
};

export default Dashboard;
