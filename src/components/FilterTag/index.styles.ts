import { styled, Box } from '@mui/material';

export const ChipBox = styled(Box)(({ disabled }: { disabled: boolean }) => ({
    '@media (hover: hover)': {
        '&:hover': {
            border: '1px solid #ffffff40',
            background: '#131322',

            '& p': {
                color: '#EBEFF8'
            }
        }
    },
    pointerEvents: disabled ? 'none' : 'auto',
    opacity: disabled ? 0.38 : 1,
    border: `1px solid ${disabled ? '#ffffff40' : '#199FD9'}`,
    cursor: 'pointer'
}));
