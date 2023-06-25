import { ReactNode } from 'react'
import CalculatorPath from '../assets/img/calculator.png'

import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList
} from '@chakra-ui/react'
import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
	FiMenu,
	FiBell,
	FiChevronDown
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import ColorModeToggle from './ColorModeToggle'

interface LinkItemProps {
	name: string
	icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome },
	{ name: 'Trending', icon: FiTrendingUp },
	{ name: 'Explore', icon: FiCompass },
	{ name: 'Favourites', icon: FiStar },
	{ name: 'Settings', icon: FiSettings }
]

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	)
}

interface SidebarProps extends BoxProps {
	onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition='3s ease'
			bg={useColorModeValue('white', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}
		>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					<img src={CalculatorPath} alt='' width='50' />
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon}>
					{link.name}
				</NavItem>
			))}
		</Box>
	)
}

interface NavItemProps extends FlexProps {
	icon: IconType
	children: ReactText
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
	return (
		<Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'cyan.400',
					color: 'white'
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'white'
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	)
}

interface MobileProps extends FlexProps {
	onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize='2xl'
				fontFamily='monospace'
				fontWeight='bold'
			>
				<img src={CalculatorPath} alt='' width='50' />
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<ColorModeToggle />
				<IconButton isDisabled size='lg' variant='ghost' aria-label='open menu' icon={<FiBell />} />
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={
										'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80'
									}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'
								>
									<Text fontSize='sm'>Mael Geoffroy</Text>
									<Text fontSize='xs' color='gray.600'>
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}
						>
							<MenuItem isDisabled>Profile</MenuItem>
							<MenuItem isDisabled>Settings</MenuItem>
							<MenuItem isDisabled>Billing</MenuItem>
							<MenuDivider />
							<MenuItem isDisabled>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	)
}
