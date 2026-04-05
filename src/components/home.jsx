import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import logo from "../assets/ftcns.png";

const Home = ({ isLoggedIn }) => {
    return (
        <div>

            {isLoggedIn ? (
                <>
                    <img src={logo} alt="FTC Note Scout Logo" style={{ width: "200px", marginBottom: "20px" }} />
                    <h2 style={{ color: "#f57e25" }}>
                        Scouting with Gracious Professionalism Guidelines
                    </h2>
                    <p>
                        As an FTC Note Scout, your observations drive our strategy and celebrate the INNOVATION of our community. When recording notes, remember:
                    </p>
                    <ul style={{ listStyleType: "square", padding: "1rem", listStyleType: "none" }}>
                        <li><strong>DISCOVERY over Derision:</strong>  Focus on what you've learned about a team's unique mechanisms or path to success.</li>
                        <li><strong>INCLUSION in Information:</strong> Every team—regardless of rank—brings value to the field. Scout with an open mind.</li>
                        <li><strong>IMPACT through Integrity:</strong> Accurate data helps foster TEAMWORK. Ensure your notes are honest, objective, and helpful.</li>
                        <li><strong>Coopertition® in Action:</strong> We compete like crazy on the field, but we treat every team with respect in the stands. Write notes that you wouldn't mind the other team reading.</li>
                    </ul>
                    <p>
                        Let's make scouting <strong>FUN</strong> and impactful!
                    </p>
                </>
            ) :
                <>
                    <h1>FTC Note Scout</h1>
                    <h2><i>Scouting Simplified</i></h2>
                    <p>
                        Welcome to FTC Note Scout, your simplified tool for efficient and effective scouting in the FIRST Tech Challenge. Our platform is designed to help teams easily collect, organize, and review data on their performance and their competitors. With FTC Note Scout, you can focus on what matters most - improving your team's performance and achieving your goals on the field, while curating a robust collection of notes.
                    </p>
                </>

            }
            <div>
                {isLoggedIn ? (
                    <>
                        {/* Remove buttons */}
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