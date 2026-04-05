import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NoteCard = ({ note }) => {
    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {note.note_title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Team {note.teamNumber} - {note.eventCode}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {note.noteText.length > 100 ? note.noteText.substring(0, 100) + "..." : note.noteText}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', marginTop: 1 }}>
                    Created on {new Date(note.createdAt).toLocaleDateString()} by {note.username}
                </Typography>
                <Link to={`/notes/${note.id}`} style={{ textDecoration: 'none', marginTop: 10, display: 'inline-block' }}>
                    <Typography variant="button" color="primary">
                        View Details
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
};

export default NoteCard;