import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Box, Typography, Paper, Divider, Button,
    Stack, Chip, IconButton, Skeleton, Container
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Event as EventIcon,
    PrecisionManufacturing as RobotIcon,
    Person as PersonIcon,
    ArrowBack as BackIcon
} from "@mui/icons-material";
import FtcApi from "../../api/api.js";

const NoteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const data = await FtcApi.getNoteById(id);
                setNote(data);
            } catch (error) {
                console.error("Error fetching note:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchNote();
    }, [id]);

    // Handle Loading State 
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!note) {
        return (
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h5" color="error">Note not found.</Typography>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Container>
        );
    }

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this scouting note? This cannot be undone.");

        if (confirmed) {
            try {
                // Ensure this method exists in your api.js (we can double-check that next)
                await FtcApi.deleteNote(id);

                // Success! Head back to the previous list (Team or Event page)
                navigate(-1);
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Could not delete the note. Please try again.");
            }
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {/* Back Button */}
            <Button
                startIcon={<BackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Back to Scouting
            </Button>

            <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                {/* Header Section */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="overline" color="secondary" sx={{ fontWeight: 'bold' }}>
                        Note Title
                    </Typography>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                        {note.note_title}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center"
                        alignItems="center">
                        <Chip
                            icon={<EventIcon />}
                            label={`Event: ${note.eventCode}`}
                            color="primary"
                            variant="outlined"
                        />
                        <Chip
                            icon={<RobotIcon />}
                            label={`Team ${note.teamNumber}`}
                            color="primary"
                        />
                    </Stack>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Main Content */}
                <Typography variant="h6" gutterBottom color="text.secondary">
                    Scout Observations
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 4, fontSize: '1.1rem' }}>
                    {note.noteText}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Metadata & Actions */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PersonIcon fontSize="small" color="action" />
                            <Typography variant="subtitle2">
                                Scouted by: <strong>{note.username}</strong>
                            </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                            Record created: {new Date(note.createdAt).toLocaleString()}
                        </Typography>
                    </Box>

                    {/* Action Buttons: Only visible to the author */}
                    {note.username === FtcApi.getCurrentUsername() && (
                        <Stack direction="row" spacing={2}>
                            <Button
                                component={Link}
                                to={`/notes/${id}/edit`}
                                variant="contained"
                                startIcon={<EditIcon />}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Paper>
        </Container>
    );
}

export default NoteDetail;