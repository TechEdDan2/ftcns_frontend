import React from "react";
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@mui/material";
import {
    AutoGraph as InnovationIcon,
    Groups as TeamworkIcon,
    Lightbulb as DiscoveryIcon,
    EmojiEvents as ImpactIcon,
    AccountCircle as LoginIcon,
    PersonAdd as SignupIcon
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../assets/ftcns.png";

const Home = ({ isLoggedIn }) => {
    return (
        <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
            {isLoggedIn ? (
                <Paper elevation={0} sx={{ p: 4, bgcolor: 'transparent' }}>
                    <Box component="img" src={logo} alt="FTC Note Scout Logo" sx={{ width: 220, mb: 4 }} />

                    <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                        Scouting with Gracious Professionalism
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}>
                        As an FTC Note Scout, your observations drive our strategy and celebrate the <strong>INNOVATION</strong> of our community.
                    </Typography>

                    <List sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, textAlign: 'left', p: 2 }}>
                        <ListItem>
                            <ListItemIcon><DiscoveryIcon color="primary" /></ListItemIcon>
                            <ListItemText
                                primary="DISCOVERY over Derision"
                                secondary="Focus on what you've learned about a team's unique mechanisms or path to success."
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemIcon><InnovationIcon color="primary" /></ListItemIcon>
                            <ListItemText
                                primary="INCLUSION in Information"
                                secondary="Every team brings value to the field. Scout with an open mind regardless of rank."
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemIcon><TeamworkIcon color="primary" /></ListItemIcon>
                            <ListItemText
                                primary="IMPACT through Integrity"
                                secondary="Accurate data helps foster TEAMWORK. Ensure notes are honest and objective."
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                            <ListItemIcon><ImpactIcon color="primary" /></ListItemIcon>
                            <ListItemText
                                primary="Coopertition® in Action"
                                secondary="Compete like crazy, but treat every team with respect in the stands."
                            />
                        </ListItem>
                    </List>

                    <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>
                        Let's make scouting <Box component="span" color="secondary.main">FUN</Box> and impactful!
                    </Typography>
                </Paper>
            ) : (
                <Box sx={{ py: 4, marginTop: -5 }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 800, mb: 1 }}>
                        FTC Note Scout
                    </Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ fontStyle: 'italic', mb: 4 }}>
                        Scouting Simplified
                    </Typography>

                    <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.6, mb: 5 }}>
                        Welcome to the simplified tool for efficient scouting in the <strong>FIRST Tech Challenge</strong>.
                        Collect, organize, and review data to focus on what matters most—improving your performance
                        and achieving your goals on the field.
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<LoginIcon />}
                            component={NavLink}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<SignupIcon />}
                            component={NavLink}
                            to="/signup"
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Home;