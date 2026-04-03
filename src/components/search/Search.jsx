import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

/**
 * Search Component
 * 
 * A simple search component that allows users to input a search query and submit it.
 * The search query is passed to the parent component via the onSearch prop.
 * 
 * @param onSearch - A function that is called when the search form is submitted, with the search query as an argument
 */

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <TextField
                label="Search Teams"
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
}

export default Search;