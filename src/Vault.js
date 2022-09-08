import { Container, Box, Image, Badge, Text, Stack, Button, Input} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useWeb3ExecuteFunction, useMoralis } from 'react-moralis';

export const Vault = () => {
    const [tokenAmt, setTokenAmt] = useState();
    const contractProcessor = useWeb3ExecuteFunction();
    const { isAuthenticated } = useMoralis();


    async function deposit() {
        let options = {
            contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            functionName: "deposit",
            abi: [
                {
                    "inputs": [
                        {
                        "internalType": "uint256",
                        "name": "referrerID",
                        "type": "uint256"
                        }
                    ],
                    "name": "deposit",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                }
            ],
            params: {
                referrerID: 0
            }
        }

        await contractProcessor.fetch({
            params: options,
            onSuccess: () => {
                console.log("deposit successful");
            },
            onError: (error) => {
                alert(error.data.message)
            }
        });
    }

    return (
        <Container centerContent>
            <Box w="400px" borderWidth='2px' rounded="20px" overflow="hidden" mt={10}>
                <Image src=
        "https://media.geeksforgeeks.org/wp-content/uploads/20210727094649/img1.jpg"
                    alt="Card Image" boxSize="400px">
                </Image>
                <Box p={5}>
                    <Stack align="center">
                        <Badge variant="solid" colorScheme="yellow" 
                        rounded="full" px={2}>
                        Vault
                        </Badge>
                    </Stack>
                    <Stack align="center">
                        <Text as="h2" fontWeight="normal" my={2} >
                        Staking Tokens for Yield
                        </Text>
                    </Stack>
                    <Stack align="center"> 
                        <Input type="number" placeholder="0.0" size="md" /> 
                        <Button variant="solid" 
                        colorScheme="green" size="sm">
                        Stake Tokens                           
                        </Button>
                    </Stack>
                </Box>
            </Box> 
        </Container>
    )
}