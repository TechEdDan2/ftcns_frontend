// import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';


const NavBar = ({ isLoggedIn, handleLogout }) => {
    return (
        <Box sx={{ height: 'auto', padding: 0 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white', textAlign: 'left' }}>
                        <img src="/src/assets/ftcns.png" alt="FTC Note Scout Logo" style={{ width: "32px" }} />
                    </Typography>

                    {isLoggedIn ? (
                        <>
                            <Button color="inherit" component={NavLink} to="/companies">
                                Teams
                            </Button>

                            <Button color="inherit" component={NavLink} to="/jobs">
                                Notes
                            </Button>

                            <Button color="inherit" component={NavLink} to="/profile">
                                Profile
                            </Button>

                            <Button color="inherit" onClick={handleLogout} component={Link} to="/login">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={NavLink} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={NavLink} to="/signup">
                                Sign Up
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;