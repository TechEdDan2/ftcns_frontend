import { useState, useEffect } from 'react';
import FtcApi from '../../api/api.js';
import { useParams } from 'react-router-dom';


/**
 * TeamDetail Component
 * 
 * Displays details about a FIRST Tech Challenge team, including team name, number
 * 
 * @param team - The team object containing details about the team
 */

const TeamDetail = () => {
    const { team_number } = useParams();
    console.log("Extracted team_number from URL:", team_number); // Debugging

    const [teamData, setTeamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const data = await FtcApi.getTeamsByNumber(team_number);
                setTeamData(data);
                console.log("Fetched team data:", data); // Debugging
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
        return <div>Team not found.</div>;
    }

    return (
        <div>
            <h1>{teamData.team_name} (#{teamData.team_number})</h1>
            <p>Rookie Year: {teamData.rookie_year}</p>
            {/* Add more team details as needed */}
            {/* Possibly List Notes on that team? */}
        </div>
    );
}

export default TeamDetail;