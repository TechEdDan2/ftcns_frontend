import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

/**
 * Search Component
 * 
 * A search component that allows users to input a search query and submit it.
 * The component automatically determines whether to search for teams or notes based on the input.
 * 
 * @param onSearch - A function that is called when the search form is submitted, with the search query and type as arguments
 */

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate search term
        if (!searchTerm.trim()) {
            console.warn("Search term cannot be empty.");
            return;
        }

        // Pass both search term and type to the parent
        onSearch({ term: searchTerm });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                sx={{ backgroundColor: 'white' }}
            />

            <Button type="submit" variant="contained" color="primary">
                Search
            </Button>
        </Box>
    );
};

export default Search;