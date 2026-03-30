import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserContext from "../../helpers/UserContext";

/** 
 * Login form component
 * Allows user to log in to their account
 * Uses onLogin prop to call parent function on successful login
 */
const LoginForm = () => {
    const { onLogin } = useContext(UserContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const success = await onLogin(formData);
        console.log("Login success:", success);
        if (success) {
            console.log("Navigating to home page...");
            navigate("/");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "0 auto",
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#ffffff" // Set a white background for the form
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#f57e25" }}>
                Log In
            </Typography>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" }, // Label color
                    "& .MuiInputBase-input": { color: "#000" }  // Input text color
                }}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{
                    "& .MuiInputLabel-root": { color: "#000" },
                    "& .MuiInputBase-input": { color: "#000" }
                }}
            />
            <Button type="submit" variant="contained" color="primary">
                Log In
            </Button>
        </Box>
    );
};

export default LoginForm;