import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/amalitech-logo-1.svg';
import { Button } from 'react-bootstrap';
import Navbutton from './Navbutton/NavButton';


const HomePage = ({role}) => {
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
            </Box>

            <Center
            h="70vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            color="white"
        >
          <Box display="flex" flexDirection="column" gap="40px" marginTop="40px">
            <Navbutton displayText={"Admin"} url={"/dashboard"} />
            <Navbutton displayText={"Visitor"} url={"/visitorPage"} />
            <Navbutton displayText={"Host"} url={"/hostpage"}/>
              </Box>
              </Center>
          </Flex>
      </Box>
   
  )
};
    
export default HomePage
  