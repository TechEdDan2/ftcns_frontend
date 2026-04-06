// import { useState, useEffect } from 'react';
// import FtcApi from '../../api/api.js';
// import { useParams } from 'react-router-dom';


// /**
//  * TeamDetail Component
//  * 
//  * Displays details about a FIRST Tech Challenge team, including team name, number
//  * 
//  * @param team - The team object containing details about the team
//  */

// const TeamDetail = () => {
//     const { team_number } = useParams();
//     // console.log("Extracted team_number from URL:", team_number); // Debugging

//     const [teamData, setTeamData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         async function fetchTeamData() {
//             try {
//                 const data = await FtcApi.getTeamsByNumber(team_number);
//                 setTeamData(data);
//                 // console.log("Fetched team data:", data); // Debugging
//             } catch (error) {
//                 console.error('Error fetching team data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         fetchTeamData();
//     }, [team_number]);

//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!teamData) {
//         return <div>Team not found.</div>;
//     }

//     return (
//         <div>
//             <h1>{teamData.team_name} (#{teamData.team_number})</h1>
//             <p>Rookie Year: {teamData.rookie_year}</p>
//             {/* Add more team details as needed */}
//             {/* List Notes on that team? */}
//             <h2>Notes:</h2>
//             {teamData.notes && teamData.notes.length > 0 ? (
//                 <ul>
//                     {teamData.notes.map(note => (
//                         <li key={note.id}>
//                             <strong>{note.title}</strong>: {note.content} (Created at: {new Date(note.created_at).toLocaleString()})
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No notes available for this team.</p>
//             )}

//         </div>
//     );
// }

// export default TeamDetail;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Box, Typography, Container, Paper, Grid,
    Card, CardContent, CardActionArea, Chip,
    Divider, List, ListItem, CircularProgress, Button
} from "@mui/material";
import {
    PrecisionManufacturing as RobotIcon,
    History as HistoryIcon,
    Description as NoteIcon,
    Add as AddIcon
} from "@mui/icons-material";
import FtcApi from "../../api/api.js";

const TeamDetail = () => {
    const { team_number } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const data = await FtcApi.getTeamsByNumber(team_number);
                setTeamData(data);
            } catch (error) {
                console.error('Error fetching team data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTeamData();
    }, [team_number]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!teamData) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Team {team_number} not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Team Header Hero */}
            <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2, bgcolor: 'background.paper', borderLeft: '10px solid #f57e25' }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid >
                        <Typography variant="overline" color="secondary" sx={{ fontWeight: 'bold', letterSpacing: 1.5 }}>
                            FTC TEAM PROFILE
                        </Typography>
                        <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>
                            {teamData.team_name}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                            <Chip icon={<RobotIcon />} label={`#${teamData.team_number}`} color="primary" sx={{ fontWeight: 'bold' }} />
                            <Chip icon={<HistoryIcon />} label={`Rookie Year: ${teamData.rookie_year}`} variant="outlined" />
                        </Stack>
                    </Grid>
                    <Grid sx={{ textAlign: { md: 'right' } }}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            component={Link}
                            to={`/notes/create`}
                            sx={{ borderRadius: 5 }}
                        >
                            Add New Note
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
                <NoteIcon color="primary" /> Scouting Observations
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Notes Section */}
            {teamData.notes && teamData.notes.length > 0 ? (
                <List>
                    {teamData.notes.map(note => (
                        <ListItem key={note.id} alignItems="flex-start" sx={{ mb: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
                            <Button
                                component={Link}
                                to={`/notes/${note.id}`}
                                variant="text"
                                sx={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start', p: 0 }}
                            >
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {note.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {note.content}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(note.created_at).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Button>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                    No notes recorded for this team yet. Be the first to scout them!
                </Typography>
            )}
        </Container>
    );
}

//  internal helper for the  MUI
const Stack = ({ children, direction = "row", spacing = 0, sx = {} }) => (
    <Box sx={{ display: 'flex', flexDirection: direction, gap: spacing, ...sx }}>{children}</Box>
);

export default TeamDetail;