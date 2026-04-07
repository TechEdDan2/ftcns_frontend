import axios from "axios";

const BASE_URL = process.env.API_URL || "http://localhost:3001";

/**
 * API Class to interact with the backend 
 * Contains static methods for each API route.
 * 
 */

class FtcnsAPI {
    // the token for interacting with the API
    static token;

    /**
     * Generic method to make API calls. 
     * Takes care of the token and error handling.
     * 
     * @param {string} endpoint - API endpoint (e.g., 'auth/login')
     * @param {object} data - Data to send with the request (for POST/PUT)
     * @param {string} method - HTTP method ('get', 'post', 'put', etc.)
     * @returns {object} - The response data from the API
     */
    static async request(endpoint, data = {}, method = "get") {


        const url = `${BASE_URL}/${endpoint}`;
        const headers = {
            Authorization: `Bearer ${FtcnsAPI.token}`,
        };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** 
     * Set the token for API requests
     *     
     */
    static setToken(token) {
        this.token = token;
        localStorage.setItem("token", token);// Save token to localStorage for persistence
    }

    /** 
     * Get the token from localStorage
     * @returns {string|null} The token if it exists, otherwise null
     */
    static getTokenFromStorage() {
        const token = localStorage.getItem("token");

        if (token) {
            this.token = token; // Set the token in the class for API calls
            return token;
        }
        return null;
    }

    ////////////////////////
    //  User API routes   //
    ////////////////////////

    /** Sign Up a New User */
    static async signup(data) {
        let res = await this.request("auth/register", data, "post");
        const token = res.token;
        const username = this.getUsernameFromToken(token); // Extract username from token
        if (!username) {
            throw new Error("Failed to extract username from token.");
        }
        this.setToken(token); // Save token to localStorage and class variable
        return { token, username }; // Return both token and username
    }

    /** Login a User */
    static async login(data) {
        let res = await this.request("auth/token", data, "post");
        const token = res.token;
        const username = this.getUsernameFromToken(token); // Extract username from token
        if (!username) {
            throw new Error("Failed to extract username from token.");
        }
        this.setToken(token); // Save token to localStorage and class variable
        return { token, username }; // Return both token and username
    }

    /** Get details on a user by username. */
    static async getCurrentUser(token, username) {
        console.log("API Info - Fetching current user with token:", token, "and username:", username); // Debugging

        if (!token) {
            throw new Error("No token found. Please log in.");
        }

        if (!username) {
            throw new Error("No username provided. Unable to fetch user details.");
        }

        const headers = { Authorization: `Bearer ${token}` }; // Use token from arguments
        const params = { username }; // Add username as a query parameter
        let res = await this.request(`users/${username}`, params, "get", headers);
        return res.user;
    }

    /** Helper to extract username from token. */
    static getUsernameFromToken(token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
            return payload.username;
        } catch (err) {
            console.error("Error decoding token:", err);
            return null;
        }
    }

    static getCurrentUsername() {
        const token = this.getTokenFromStorage(); // Get token from localStorage
        if (!token) {
            console.warn("No token found in storage. User is not logged in.");
            return null;
        }
        const username = this.getUsernameFromToken(token); // Extract username from token
        if (!username) {
            console.warn("Failed to extract username from token.");
            return null;
        }
        return username;
    }

    /** Future: Update user profile. */


    //------------------//
    //  Team Functions    //
    //------------------//

    /** 
     * GET a list of all teams if no filter is provided, 
     *  use the standard GET /teams route. If filter criteria is 
     *  provided, use the GET /teams/filter route with query 
     *  parameters. 
     * @param {string} searchTerm - Optional search term for filtering teams
     * @return {array} List of teams matching the criteria or all teams if no criteria provided
    */
    static async getTeams(searchTerm, searchType) {
        if (searchTerm) {
            let res = await this.request(`teams/filter`, { term: searchTerm, type: searchType });
            // console.log("Filtered teams response:", res);//Debugging 
            return res; // Return filtered teams
        } else {
            let res = await this.request(`teams`);
            console.log("All teams response:", res);//Debugging 
            return res; // Return all teams
        }
    }

    /** 
     * GET team by team number
     * 
     * @param {number} teamNumber - The team number to search for
     * @return {object} The team object matching the team number
     * 
     */
    static async getTeamsByNumber(teamNumber) {
        return await this.request(`teams/${teamNumber}`);
    }


    //---------------------------//
    //  Note Routes Functions    //
    //---------------------------//

    /**
    * POST create a new note - allows users to create a new note with specified details
    * @param {object} noteData - An object containing the details of the note to be created (e.g., teamNumber, eventCode, title, content)
    * @return {object} The newly created note object returned from the API
    */
    static async createNote(noteData) {
        console.log("API Info - Creating note with data:", noteData); // Debugging
        return await this.request(`notes`, noteData, "post");
    }

    /**
     * GET All notes - is a generic method to fetch all notes 
     * @return {array} An array of note objects retrieved from the API
     */
    static async getAllNotes() {
        return await this.request(`notes`);
    }

    /**
     * GET note by ID - fetches a single note based on its unique ID
     * @param {number} id - The unique identifier of the note to retrieve
     * @return {object} The note object matching the provided ID
     */
    static async getNoteById(id) {
        let res = await this.request(`notes/${id}`);
        return res.note; // Return the note object from the response
    }

    /**
     * updateNote - updates an existing note with new data based on its unique ID
     * 
     * @param {UUID} id 
     * @param {object} data
     * @returns 
     */
    static async updateNote(id, data) {
        try {
            console.log("API Info - Updating note with ID:", id, "and data:", data); // Debugging
            let res = await this.request(`notes/${id}`, data, "patch");
            return res.note; // Return the updated note object
        } catch (e) {
            console.error("Error updating note:", e);
            throw e; // Re-throw the error to be handled by the caller
        }
    }

    /**
     * 
     * deleteNote - deletes a note based on its unique ID, removing it from the database
     * 
     * @param {UUID} id 
     * @returns success message or error
     */
    static async deleteNote(id) {
        try {
            console.log("API Info - Deleting note with ID:", id); // Debugging
            await this.request(`notes/${id}`, {}, "delete");
            return { success: true }; // Indicate successful deletion
        } catch (e) {
            console.error("Error deleting note:", e);
            throw e; // Re-throw the error to be handled by the caller
        }
    }

    //------------------//
    //  Events Routes    //
    //------------------//
    // 
    /**
     * GET all events - retrieves a list of all events from the API
    */
    static async getAllEvents() {
        return await this.request(`events`);
    }

}


export default FtcnsAPI;