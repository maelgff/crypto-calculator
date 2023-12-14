import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
	Avatar,
	Badge,
	Box,
	Center,
	Heading,
	Stack,
	Text,
	useColorModeValue
} from '@chakra-ui/react'
import { CoinDetail } from '../api/coinsApi'

interface Props {
	isOpen: boolean
	onClose: () => void
	currentCoinDetail: CoinDetail | undefined
}

export const SimpleModal = ({ isOpen, onClose, currentCoinDetail }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent padding={'0px'}>
				<ModalCloseButton />
				<ModalBody padding={'0px'}>
					<Center>
						<Box
							w={'full'}
							bg={useColorModeValue('white', 'gray.900')}
							boxShadow={'2xl'}
							rounded={'lg'}
							p={6}
							textAlign={'center'}
						>
							<Avatar size={'xl'} src={currentCoinDetail?.image.large} mb={4} pos={'relative'} />
							<Heading fontSize={'2xl'} fontFamily={'body'}>
								{currentCoinDetail?.name}
							</Heading>
							<Text fontWeight='600' color={'gray.500'} mb={4}>
								{currentCoinDetail?.symbol}
							</Text>
							<Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
								{currentCoinDetail?.description.en.substring(0, 430)}...
							</Text>

							<Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
								<Badge
									px={2}
									py={1}
									bg={useColorModeValue('gray.50', 'gray.800')}
									fontWeight={'400'}
								>
									Genesis date :{' '}
									{currentCoinDetail?.genesis_date &&
										new Date(currentCoinDetail?.genesis_date).toLocaleDateString()}
								</Badge>
							</Stack>
							<Stack mt={8} direction={'row'} spacing={4}>
								<Button
									isDisabled
									flex={1}
									fontSize={'sm'}
									rounded={'full'}
									_focus={{
										bg: 'gray.200'
									}}
								>
									Show more details
								</Button>
								<Button
									isDisabled
									flex={1}
									fontSize={'sm'}
									rounded={'full'}
									bg={'blue.400'}
									color={'white'}
									boxShadow={
										'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
									}
									_hover={{
										bg: 'blue.500'
									}}
									_focus={{
										bg: 'blue.500'
									}}
								>
									Buy
								</Button>
							</Stack>
						</Box>
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
