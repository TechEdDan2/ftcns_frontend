import React from "react";

// UserContext will be used to store the current user's information and authentication token across the app. It allows components to access and update user data without prop drilling. 
const UserContext = React.createContext();

export default UserContext;