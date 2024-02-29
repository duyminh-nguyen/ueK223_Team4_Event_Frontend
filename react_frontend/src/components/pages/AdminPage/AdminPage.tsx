import { Box, Button, Container, Link } from "@mui/material";
import { useStyles } from "./AdminPage.style";
import { useNavigate } from "react-router-dom";

// Component for the admin dashboard
const AdminPage = () => {
    // Hook for navigation
    const navigate = useNavigate();
    // Custom styles
    const adminPageStyles = useStyles();

    return (
        <div>
            {/* Button to navigate to home */}
            <Button
                variant='contained' color='primary'
                onClick={() => {
                    navigate('/main');
                }}>
                Home
            </Button>
            {/* Container for admin dashboard content */}
            <Container fixed>
                <Box className={adminPageStyles.contentBox}>
                    <h1>Admin Dashboard</h1>
                    {/* Container for links */}
                    <Container maxWidth="md">
                        {/* Link to manage users */}
                        <Link id="manageusers" href="/users">Manage Users</Link>
                        <br />
                        {/* Link to manage events */}
                        <Link id="manageevents" href="/event">Manage Events</Link>
                    </Container>
                </Box>
            </Container>
        </div>
    );
}

export default AdminPage;
