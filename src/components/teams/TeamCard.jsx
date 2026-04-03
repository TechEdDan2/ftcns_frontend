import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

/**
 * TeamCard Component
 * 
 * Displays a card with basic information about a FIRST Tech Challenge team, including team name and number.
 * The card is clickable and links to the team's detail page.
 * 
 * @param team - The team object containing details about the team
 */

const TeamCard = ({ team }) => {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {team.team_name} (#{team.team_number})
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Rookie Year: {team.rookie_year}
                </Typography>
            </CardContent>
            <Typography
                variant="button"
                display="block"
                gutterBottom
                component={Link}
                to={`/teams/${team.team_number}`}
                sx={{ padding: 1, textDecoration: 'none' }}
            >
                View Details
            </Typography>
        </Card>
    );
}

export default TeamCard;