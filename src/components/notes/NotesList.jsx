import { useState, useEffect } from "react";
import FtcApi from "../../api/api.js";
import NoteCard from "./NoteCard.jsx";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Divider, Typography } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';

// Implement search functionality in the future
// import Search from "../search/Search.jsx";

/**
 * NotesList Component
 * 
 * Displays a list of notes created by the user, with a search bar to filter notes by team number or content.
 * Fetches note data from the API and renders a NoteCard for each note.
 */

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Implement search functionality in the future
    // const onSearch = async ({ searchTerm }) => {
    //     try {
    //         const data = await FtcApi.getNotes(searchTerm);
    //         setNotes(data || []); // Ensure notes is always an array
    //     } catch (error) {
    //         console.error("Error fetching notes:", error);
    //         setNotes([]); // Fallback to an empty array on error
    // };

    useEffect(() => {
        async function fetchNotes() {
            try {
                const data = await FtcApi.getAllNotes();
                setNotes(Array.isArray(data.notes) ? data.notes : []); // Ensure notes is always an array
            } catch (error) {
                console.error("Error fetching notes:", error);
                setNotes([]); // Fallback to an empty array on error
            } finally {
                setIsLoading(false);
            }
        }

        fetchNotes();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!notes || notes.length === 0) {
        return <div>No notes found.</div>;
    }

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Notes
            </Typography>
            <Button
                // onClick={handleCreateNote}
                variant="contained"
                size="large"
                startIcon={<EditNoteIcon />}
                component={NavLink}
                to="/notes/create"
            >
                Create Note
            </Button>

            <Divider component="li" />

            {/* <Search onSearch={onSearch} />//Update this feature in the future */}

            {notes.length === 0 ? (
                <p>No notes found.</p>
            ) : (
                notes.map((note) => <NoteCard key={note.id} note={note} />)
            )}
        </div>
    );
}

export default NotesList;