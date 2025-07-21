// src/DahbordTheme/Theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#38bdf8', // Tailwind sky-400
        },
        secondary: {
            main: '#a78bfa', // Tailwind purple-400
        },
        background: {
            default: '#0f172a', // Tailwind slate-900
            paper: '#1e293b',   // Tailwind slate-800
        },
        text: {
            primary: '#ffffff',
            secondary: '#94a3b8',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 'linear-gradient(to bottom right, #1e293b, #000)',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e293b',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: 'linear-gradient(to right, #1e293b, #0f172a)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1e293b',
                    color: '#ffffff',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;
