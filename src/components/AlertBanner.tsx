import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	CloseButton,
	useDisclosure
} from '@chakra-ui/react'

interface Props {
	content: string
}

export const AlertBanner = ({ content }: Props) => {
	const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

	return (
		isVisible && (
			<Alert status='error'>
				<AlertIcon />
				<Box width='100%'>
					<AlertTitle>Error!</AlertTitle>
					<AlertDescription>{content}</AlertDescription>
				</Box>
				<CloseButton
					alignSelf='flex-start'
					position='relative'
					right={-1}
					top={-1}
					onClick={onClose}
				/>
			</Alert>
		)
	)
}
