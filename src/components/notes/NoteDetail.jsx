import { useState, useEffect } from "react";
import FtcApi from "../../api/api.js";
import { useParams } from "react-router-dom";

const NoteDetail = () => {
    const { id } = useParams();

    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchNote() {
            try {
                const data = await FtcApi.getNoteById(id);
                setNote(data.note);
            } catch (error) {
                console.error("Error fetching note:", error);
                setNote(null); // Clear note on error
            } finally {
                setIsLoading(false);
            }
        }

        fetchNote();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!note) {
        return <div>Note not found.</div>;
    }

    console.log("Note detail data FUN:", note); // Debugging

    return (
        <div>
            <h2>Event: {note.eventCode}</h2>
            <h2><strong>Team Number: </strong> {note.teamNumber}</h2>
            <h2><i>{note.note_title}</i></h2>
            <p><strong>Content: </strong> {note.noteText}</p>
            <p><strong>Created At: </strong> {new Date(note.createdAt).toLocaleString()}</p>
            <p><strong>Created By: </strong> {note.username} </p>
        </div>
    );
}

export default NoteDetail;