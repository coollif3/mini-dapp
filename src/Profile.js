import { Container, Box, Input, Text, Button, Stack, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useDisclosure } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const { user, setUserData, userError, isUserUpdating } = useMoralis();
    const [username, setUsername] = useState(user.attributes.username);
    const [email, setEmail] = useState(user.attributes.email);
    const [password, setPassword] = useState('');
    
    let navigate = useNavigate();

    const {
        isOpen,
        onClose,
        onOpen 
    } = useDisclosure({ defaultIsOpen: true });

    const handleSave = () => {
        setUserData({
            username,
            email,
            password: password === '' ? undefined : password
        })
    }
    
    return (
        <Container>
            <Stack spacing={3}>
                {userError && (isOpen ? (
                        <Alert status='error'>
                            <AlertIcon />
                            <Box>
                                <AlertTitle>User Changes Has Failed</AlertTitle>
                                <AlertDescription>
                                    {userError.message}
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
                <Box>
                    <Stack spacing={3}>
                        <Text>Username</Text>
                        <Input value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
                        <Text>Email</Text>
                        <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
                        <Text>Password</Text>
                        <Input value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
                    </Stack>
                </Box>
                <Box>
                    <Button onClick={handleSave} isLoading={isUserUpdating}>Save New Changes</Button>
                </Box>
                <Box>
                    <Button colorScheme='blue' onClick={() => {navigate('/vault')}}>Go to Vault</Button>
                </Box>
            </Stack>
        </Container>
    )
}