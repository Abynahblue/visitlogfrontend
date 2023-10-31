import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Center,
  Heading,
} from '@chakra-ui/react';
import Logo from '../../assets/amalitech-logo-1.svg';
import { useNavigate } from 'react-router-dom';

// Homepage

const Home = () => {
  const navigate = useNavigate();

    return (
      <Box height="100vh" className="home_container">
        <Flex flexDirection="column" alignItems="center" gap="1.2rem">
          <Box
            p="0 1rem"
            w="70%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="0.5rem"
          >
            <Box display="flex" alignItems="center">
              <Image src={Logo} alt="logo" />
              <Text fontSize="2em" fontWeight="extrabold" color="#e45c29">
                ViLog
              </Text>
            </Box>

            {/* Parent container */}
            {/* <Box display="flex" gap="1rem">
              <Button
                rightIcon={<MdDashboard />}
                colorScheme="orange"
                variant="solid"
                fontWeight="bold"
                onClick={() => {
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </Button>
            </Box> */}
          </Box>

          <Center
            h="70vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="white"
          >
            {/* <Heading size="4xl">Hello...</Heading> */}
            <Text fontSize="4xl" letterSpacing="1.5px" mt="2">
              Please, sign up or login below
            </Text>
            <Box display="flex" gap="40px" marginTop="20px">
              <Button colorScheme="orange" variant="solid" onClick={() => {
                navigate("/signUp")
              }}>
                Sign up
              </Button>{' '}
              <Button colorScheme="green" variant="solid" onClick={() => {
                navigate("/visitorLogin")
              }}>
                Login
              </Button>
            </Box>
          </Center>
          
        
          {/* <Box style={{ position: 'absolute', right: '10px', top: '10%'}}>
            <QRCodeScanner />
        </Box> */}
          
          <Center color="white" letterSpacing="1.5px">
            <Text fontSize="xl">
              Scan to Logout{' '}
              <button className='qrcode_btn'
                onClick={() => {
                  navigate('/qrscanner');
                }}
                style={{
                  backgroundColor: '#e77449',
                  padding: '3px 10px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
              >
                QR Code
              </button>{' '}
            </Text>
          </Center>

        
          <Center color="white" letterSpacing="1.5px">
            <Text fontSize="xl">
              Fast check-in? Scan with{' '}
              <button className='qrcode_btn'
                onClick={() => {
                  navigate('/qrscanner');
                }}
                style={{
                  backgroundColor: '#e77449',
                  padding: '3px 10px',
                  fontWeight: 'bold',
                  borderRadius: '5px',
                }}
              >
                QR Code
              </button>{' '}
            </Text>
          </Center>
        </Flex>
      </Box>
    );
  };

export default Home;
