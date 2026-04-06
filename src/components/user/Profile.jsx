import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FtcnsApi from "../../api/api.js";
import UserContext from "../../helpers/UserContext.js";

import {
    Box, Typography, Container, Paper, Avatar,
    Grid, Card, CardContent, Divider, Chip,
    List, ListItem, ListItemText, ListItemIcon, Button
} from "@mui/material";
import {
    AccountCircle as AccountIcon,
    Badge as RoleIcon,
    Description as NoteIcon,
    Event as DateIcon,
    Edit as EditIcon,
    Settings as SettingsIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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

    // useEffect(() => {
    //     console.log("userData.notes:", userData?.notes);
    // }, [userData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

    return (
        <>
            <h1>Profile</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p>Role: {userData.role}</p>
            <h2>Notes:</h2>
            {userData.notes && userData.notes.length > 0 ? (
                <ul>
                    {userData.notes.map(note => (
                        <li key={note.id}>
                            <strong>Team: </strong> {note.teamnumber}&nbsp;
                            <strong>{note.title}</strong>:
                            {note.content}
                            (Created at: {new Date(note.created_at).toLocaleString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes available.</p>
            )}
        </>


    );
};

export default Profile;