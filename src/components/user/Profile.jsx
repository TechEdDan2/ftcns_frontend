import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FtcnsApi from "../../api/api.js";
import UserContext from "../../helpers/UserContext.js";

const Profile = () => {
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();



    const handleEditProfile = () => {
        navigate("/profile/edit");
    };

    useEffect(() => {
        const fetchUserData = async () => {

            if (!user || !user.token) {
                console.warn("No user or token found in context.");
                setIsLoading(false);
                return;
            }

            try {
                const data = await FtcnsApi.getCurrentUser(user.token, user.username);
                setUserData(data);

            } catch (err) {
                console.error("Error fetching user data:", err);
                if (err.response && err.response.status === 401) {
                    console.warn("Token expired or invalid. Logging out.");
                    handleLogout(); // Log the user out
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    // useEffect(() => {
    //     console.log("userData.notes:", userData?.notes);
    // }, [userData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data available.</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <p><strong>Username:</strong> {userData.username}</p>
            <p>Role: {userData.role}</p>
            <h2>Notes:</h2>
            {userData.notes && userData.notes.length > 0 ? (
                <ul>
                    {userData.notes.map(note => (
                        <li key={note.id}>
                            <strong>Team: </strong> {note.teamnumber}&nbsp;
                            <strong>{note.title}</strong>:
                            {note.content}
                            (Created at: {new Date(note.created_at).toLocaleString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No notes available.</p>
            )}
            {/* Add more user details as needed */}
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
};

export default Profile;