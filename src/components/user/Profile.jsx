import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FtcnsApi from "../../api/api.js";
import UserContext from "../../helpers/UserContext.js";

import { Box, Typography, List, ListItem } from "@mui/material";


const Profile = () => {
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {

            if (!user || !user.token) {
                console.warn("No user or token found in context.");
                setIsLoading(false);
                return;
            }

            try {
                const data = await FtcnsApi.getCurrentUser(user.token, user.username);
                setUserData(data);

            } catch (err) {
                console.error("Error fetching user data:", err);
                if (err.response && err.response.status === 401) {
                    console.warn("Token expired or invalid. Logging out.");
                    handleLogout(); // Log the user out
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Typography variant="subtitle1"><strong>Username:</strong> {userData.username}</Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Role: {userData.role}</Typography>
            <Typography variant="h6" sx={{ mt: 3 }}>Notes</Typography>
            {userData.notes && userData.notes.length > 0 ? (
                <List>
                    {userData.notes.map(note => (
                        <ListItem key={note.id} alignItems="flex-start" sx={{ pl: 0, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1, mb: 2 }}>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    Team: {note.teamnumber} — {note.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {note.content}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Created at: {new Date(note.created_at).toLocaleString()}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="text.secondary">No notes available.</Typography>
            )}
        </Box>
    );
};

export default Profile;