import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import FtcnsApi from "../../api/api";

const NoteEditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        noteTitle: "",
        noteText: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [formErrors, setFormErrors] = useState([]);
    const [isSaving, setIsSaving] = useState(false);



    // Fetch original note data to populate the form
    useEffect(() => {
        async function getNoteDetails() {
            console.log("Fetching note with ID:", id);
            try {
                const note = await FtcnsApi.getNoteById(id);
                setFormData({
                    noteTitle: note.note_title,
                    noteText: note.noteText,
                });
                console.log("Note data loaded into form:", note); // Debugging
                console.log("Form data state after loading note:", formData); // Debugging
            } catch (err) {
                setFormErrors(["Could not load note data."]);
            } finally {
                setIsLoading(false);
            }
        }
        getNoteDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors([]);
        setIsSaving(true);

        try {
            console.log("Submitting updated note data:", formData); // Debugging
            await FtcnsApi.updateNote(id, formData);
            // Redirect back to the team page or note list
            navigate(-1);
        } catch (err) {
            // setFormErrors(Array.isArray(err) ? err : [err]);
            console.error("Error updating note:", err); // Debugging
            const errorMessage = err.response?.data?.error || "An unexpected error occurred.";
            setFormErrors([errorMessage]);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" color="primary" gutterBottom>
                    Edit Scouting Note
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Update your observations to maintain accurate team data.
                </Typography>

                {formErrors.map((error, idx) => (
                    <Alert severity="error" key={idx} sx={{ mb: 2 }}>{error}</Alert>
                ))}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Note Title"
                        name="noteTitle"
                        value={formData.noteTitle}
                        onChange={handleChange}
                        margin="normal"
                        required
                        placeholder="e.g., Innovative Intake Mechanism"
                    />

                    <TextField
                        fullWidth
                        label="Note Observations"
                        name="noteText"
                        value={formData.noteText}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={6}
                        required
                        placeholder="Describe the robot's performance, autonomous path, or teleop efficiency..."
                    />

                    <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default NoteEditForm;