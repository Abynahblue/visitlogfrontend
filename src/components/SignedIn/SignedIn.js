import { Text, Box } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
//import { API } from '../../api/axiosClient';
import { useEffect } from 'react';

// Signed In
const SignedIn = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname
  console.log("signedIn", location);

  const handleMessage = () => {
    const el = document.getElementById("message")
    if (el)
    {
      el.textContent = "Please wait, contacting your host in no time..." 
      }
  }

  

  const handleConfirmedMessage = () => {
    const el = document.getElementById("message")
    if (el)
    {
      el.textContent = "Your host has been notified. Kindly wait for him/her" 
    }
   
  }
  useEffect(() => { 
    if (location === "/signedIn")
    {
          setTimeout(handleMessage, 5000)
          setTimeout(handleConfirmedMessage, 10000)
      setTimeout(() =>{ navigate("/visitorPage")}, 10000)
    }

  },[location, navigate])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   await API.put('/guest/logout', { visitLogId: localStorage.getItem('visitLogId') })
  //   localStorage.clear()

  //   toast({
  //     title: 'See you another time. Logout successful',
  //     status: 'success',
  //     duration: 5000,
  //     isClosable: true,
  //     position: 'top',
  //   });

  //   navigate("/")
  // };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="3rem"
      className='logout_container'
      color='white'
    >
      <Box display="flex" alignItems="center" gap="2rem">
        <Text fontSize="5xl" fontWeight="bold">
          Logged-In!
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="2rem"
      >
        <Text fontSize="1.1em" fontWeight="normal" fontStyle="italic">
          <span id="message"></span>
        </Text>

       {/* <button onClick={handleSubmit} className='logout_btn' style={{ backgroundColor: 'red', padding: '10px 35px', borderRadius: '10px', color: 'white', fontWeight: 600, letterSpacing: '1.5px', fontSize:'1.3em', marginTop: "4rem"}}>Logout</button> */}
      </Box>
    </Box>
  );
};

export default SignedIn;
