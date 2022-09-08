import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Text, Button, Alert, AlertIcon, AlertTitle, AlertDescription, Box, CloseButton, useDisclosure, Input, Stack } from '@chakra-ui/react';

const SignUp = () => {
    const { signup } = useMoralis();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <Stack spacing={3}>
            <Text fontSize='xl' align="center">New User</Text>
            <Input placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
            <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
            <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
            <Button onClick={() => signup(username, password, email)}>Sign Up</Button>
        </Stack>
    );
};

const Login = () => {
    const { login } = useMoralis();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    return (
        <Stack spacing={3}>
            <Text fontSize='xl' align="center">Existing User</Text>
            <Input placeholder="Username" value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
            <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
            <Button onClick={() => login(username, password)}>Login</Button>
        </Stack>
    );
};

export const Auth = () => {
    const { authenticate, isAuthenticating, authError } = useMoralis();

    const {
        isOpen,
        onClose,
        onOpen 
    } = useDisclosure({ defaultIsOpen: true });

    return (      
        <Stack spacing={6}>
            <SignUp />
            <Text align="center"><em>Or</em></Text>
            <Login />
            <Text align="center"><em>Or</em></Text>
            <Stack spacing={3}>
                <Text fontSize='xl' align="center">Authenticate With Your Metamask</Text>
                <Button colorScheme='blue' isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate Using Metamask</Button>
                {authError && (isOpen ? (
                    <Alert status='error'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Authentication has failed! Please try again</AlertTitle>
                            <AlertDescription>
                                {authError.message}
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                ) : (
                    <Button colorScheme='red' onClick={onOpen}>Show Error</Button>
                ))}
            </Stack>
        </Stack>
    );
}