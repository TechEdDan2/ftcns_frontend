import { useState, useEffect } from "react";
import FtcApi from "../../api/api.js";
import TeamCard from "./TeamCard.jsx";
import Search from "../search/Search.jsx";

/**
 * TeamsList Component
 * 
 * Displays a list of FIRST Tech Challenge teams, with a search bar to filter teams by name or number.
 * Fetches team data from the API and renders a TeamCard for each team.
 */

const TeamsList = () => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onSearch = async ({ searchTerm }) => {
        try {
            const data = await FtcApi.getTeams(searchTerm);
            setTeams(data || []); // Ensure teams is always an array
        } catch (error) {
            console.error("Error fetching teams:", error);
            setTeams([]); // Fallback to an empty array on error
        }
    };

    useEffect(() => {
        async function fetchTeams() {
            try {
                const data = await FtcApi.getTeams();
                setTeams(data || []); // Ensure teams is always an array
                // console.log("Fetched teams:", data);// Debugging
            } catch (error) {
                console.error("Error fetching teams:", error);
                setTeams([]); // Fallback to an empty array on error
            } finally {
                setIsLoading(false);
            }
        }

        fetchTeams();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!teams || teams.length === 0) {
        return <div>No teams found.</div>;
    }

    return (
        <div>
            <h2>USNYLI Teams</h2>
            {/* <Search onSearch={onSearch} />//Update this feature in the future */}
            {teams.length === 0 ? (
                <p>No teams found.</p>
            ) : (
                teams.map((team) => <TeamCard key={team.team_number} team={team} />)
            )}
        </div>
    );
}

export default TeamsList;