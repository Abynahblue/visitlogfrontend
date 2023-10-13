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
import { MdDashboard } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Homepage
const Home = () => {
  const navigate = useNavigate();

  return (
    <Box height="100vh" className="homepage_container">
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
          <Box display="flex" gap="1rem">
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
          </Box>
        </Box>

        <Center
          h="70vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="white"
        >
          <Heading size="4xl">Welcome...</Heading>
          <Text fontSize="3xl" letterSpacing="1.5px" mt="2">
            Please, sign in or login below
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
