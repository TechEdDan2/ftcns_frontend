import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../../helpers/UserContext.js";
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import FtcnsApi from "../../api/api";

const NoteEditForm = () => {
    const { id } = useParams();
    const { user } = React.useContext(UserContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        noteTitle: "",
        noteText: "",
    });

    const [isLoading, setIsLoading] = useState(true);
    const [formErrors, setFormErrors] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function getNoteDetails() {
            try {
                const note = await FtcnsApi.getNoteById(id);
                console.log("LOOK LOOK LOOK Fetched Note Details:", note); // Debug log

                // Having Key Mismatch...?
                setFormData({
                    noteTitle: note.note_title || "",
                    noteText: note.note_text || note.noteText || "",
                });
            } catch (err) {
                console.error("Load Error:", err);
                setFormErrors(Array.isArray(err) ? err : ["Could not load note data."]);
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
            // const dataToSubmit = {
            //     note_title: formData.noteTitle,
            //     note_text: formData.noteText
            // };

            // console.log("Submitting Update with Data:", dataToSubmit); // Debug log

            await FtcnsApi.updateNote(id, formData);
            navigate(-1);
        } catch (err) {
            console.error("Submit Error:", err);
            // Ensure we are setting an array of strings for the .map() in the JSX
            setFormErrors(Array.isArray(err) ? err : [err.message || "Update failed."]);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                    Edit Scouting Note
                </Typography>

                {formErrors.map((error, idx) => (
                    <Alert severity="error" key={idx} sx={{ mb: 2 }}>
                        {typeof error === 'string' ? error : "An error occurred."}
                    </Alert>
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
                            disabled={isSaving}
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