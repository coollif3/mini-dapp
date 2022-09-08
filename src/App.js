import { useMoralis } from 'react-moralis'; 
import { Container, Heading, Button, Stack, Box, Flex, Link, Avatar, Spacer } from '@chakra-ui/react';
import { Auth } from './Auth.js'
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import { Vault } from './Vault.js';
import { Profile } from './Profile.js';
import { ErrorPage } from './ErrorPage.js';

function App() {
  const { isAuthenticated, user, logout } = useMoralis();
  let navigate = useNavigate();

  return (
      <Container>
        <Flex>
          <Link as={RouterLink} to="/">Home</Link>
          <Spacer />
          {isAuthenticated && 
            <Link as={RouterLink} to="/profile">
              <Avatar name={user.get('username')} />
            </Link>
          }
        </Flex>
        <Heading>Welcome, {user ? user.get('username'): 'authenticate please..'}!</Heading>    
        {isAuthenticated ? (
          <>
            <Stack spacing={3}>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <Box>
                <Button colorScheme='blue' onClick={() => { logout(); navigate('/'); } }>Logout</Button>
              </Box>
            </Stack>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/profile" element={<Auth />} />
            <Route path="/vault" element={<Auth />} />
            <Route path="*" element={<ErrorPage />} />   
          </Routes>        
        )}
      </Container>
  );
  
  // return (
  //   <Container>
  //     <Heading align='center'>Welcome to Mini-dApp</Heading>
  //     <Routes>
  //       <Route path="/" element={<Auth />} />
  //       <Route path="/profile" element={<Auth />} />
  //       <Route path="/vault" element={<Auth />} />
  //       <Route path="*" element={<ErrorPage />} />   
  //     </Routes>
  //   </Container>
  // );
}

export default App;