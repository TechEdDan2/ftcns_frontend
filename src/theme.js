import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', // Most scouting apps look great in Dark Mode
        primary: {
            main: '#f57e25', // FIRST Orange
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#0066b3', // FIRST Blue
        },
        background: {
            default: '#121212', // Deep Black/Gray
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 700,
            color: '#f57e25', // Titles default to Orange
        },
    },
    components: {
        // This section "fixes" all TextFields and Selects globally
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& fieldset': {
                        borderColor: 'rgba(245, 126, 37, 0.5)', // Subtle orange border
                    },
                    '&:hover fieldset': {
                        borderColor: '#f57e25 !important', // Bright orange on hover
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#f57e25', // Solid orange when typing
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#b0b0b0',
                    '&.Mui-focused': {
                        color: '#f57e25',
                    },
                },
            },
        },
    },
});

export default theme;