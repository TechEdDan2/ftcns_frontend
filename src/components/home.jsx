import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import logo from "../assets/ftcns.png";

const Home = ({ isLoggedIn }) => {
    return (
        <div>
            <h1>FTC Note Scout</h1>
            <h2><i>Scouting Simplified</i></h2>
            <p>
                Welcome to FTC Note Scout, your simplified tool for efficient and effective scouting in the FIRST Tech Challenge. Our platform is designed to help teams easily collect, organize, and review data on their performance and their competitors. With FTC Note Scout, you can focus on what matters most - improving your team's performance and achieving your goals on the field, while curating a robust collection of notes.
            </p>
            <div>
                {isLoggedIn ? (
                    <>
                        <img src={logo} alt="FTC Note Scout Logo" style={{ width: "200px", marginBottom: "20px" }} />
                    </>) : (
                    <>
                        <Button variant="contained" color="primary" component={NavLink} to="/login" sx={{ mr: 2 }}>
                            Login
                        </Button>
                        <Button variant="outlined" color="primary" component={NavLink} to="/signup">
                            Sign Up
                        </Button>
                    </>)
                }

            </div>

        </div>
    );
};

export default Home;