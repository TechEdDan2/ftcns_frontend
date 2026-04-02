
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { GitHub, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box sx={{ height: 'auto', padding: 0, marginTop: '1rem' }}>
            <AppBar position="sticky" sx={{ top: 'auto', bottom: 0, backgroundColor: '#f5f5f5', color: 'black' }}>
                <Toolbar>
                    <Typography variant="body2" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        © {new Date().getFullYear()} DNel2
                    </Typography>

                    <IconButton
                        component="a"
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <GitHub />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <LinkedIn />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Footer;