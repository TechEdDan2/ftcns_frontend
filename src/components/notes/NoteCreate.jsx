import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    MenuItem,
    Select,
    InputLabel,
} from "@mui/material";
import FtcnsApi from "../../api/api.js";
import UserContext from "../../helpers/UserContext.js";


/**
 * 
 * The NoteCreate component allows users to create a new note by filling 
 *  out a form with team number, event code, note title, and note content. 
 *  It fetches the list of teams and events from the API to populate the 
 *  dropdowns, and it also retrieves the current user's ID to associate 
 *  the note with the correct scout. 
 *
 * 
 * @param {function} onCreateNote - A callback function passed from the parent component to handle the creation of a new note. 
 */
const NoteCreate = ({ onCreateNote }) => {
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        teamNumber: "",
        eventCode: "",
        noteTitle: "",
        noteText: "",
    });
    const [teams, setTeams] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchTeams() {
            try {
                const data = await FtcnsApi.getTeams();
                setTeams(data || []);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        }
        fetchTeams();
    }, []);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const data = await FtcnsApi.getAllEvents();
                setEvents(data.events || []);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }
        fetchEvents();
    }, []);

    // Fetch the current user's ID
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userData.id) {
            alert("Unable to create note: Scout ID not found.");
            return;
        }
        const formDataWithScoutId = { ...formData, userData }; // Add the scout ID to the form data
        onCreateNote(formDataWithScoutId); // Pass the form data to the parent component
        setFormData({ teamNumber: "", eventCode: "", noteTitle: "", noteText: "" }); // Reset the form
        alert("Note created successfully!");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "0 auto" }}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                Create a New Note
            </Typography>

            <InputLabel id="team-number-label" sx={{ color: "#f57e25" }}>Team Number</InputLabel>
            <Select
                labelId="team-number-label"
                name="teamNumber"
                value={formData.teamNumber}
                onChange={handleChange}
                sx={{ color: "#f57e25" }}
            >
                {teams.map((team) => (
                    <MenuItem key={team.team_number} value={team.team_number}>
                        {team.team_number}
                    </MenuItem>
                ))}
            </Select>

            <InputLabel id="event-code-label" sx={{ color: "#f57e25" }}>Event Code</InputLabel>
            <Select
                labelId="event-code-label"
                name="eventCode"
                value={formData.eventCode}
                onChange={handleChange}
                sx={{ color: "#f57e25" }}

            >
                {events.map((event) => (
                    <MenuItem key={event.event_code} value={event.event_code}>
                        {event.event_code}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                label="Note Title"
                name="noteTitle"
                value={formData.noteTitle}
                onChange={handleChange}
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ color: "#f57e25" }}
            />

            <TextField
                label="Note Content"
                name="noteText"
                helperText="Include details about the robot's performance, design, or any observations. Remember: Discovery, Teamwork, and Gracious Professionalism® guide our notes."
                value={formData.noteText}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                sx={{ color: "#f57e25" }}
            />

            <Button type="submit" variant="contained" color="primary">
                Create Note
            </Button>
        </Box>
    );
};

export default NoteCreate;