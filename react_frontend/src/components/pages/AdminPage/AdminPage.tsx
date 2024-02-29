import { Box, Button, Container, Link } from "@mui/material";
import { useStyles } from "./AdminPage.style";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();
    const adminPageStyles= useStyles();
    return (
        <div>
            <Button
                variant='contained' color='primary'
                onClick={() => {
                    navigate('/main');
                }}>
                Home
            </Button>
            <Container fixed >
                <Box className={adminPageStyles.contentBox} >
                    <h1>Admin Dashboard</h1>
                    <Container maxWidth="md" >
                        <Link id="manageusers" href="/useredit">Manage Users</Link>
                        <br/>
                        <Link id="manageevents" href="event">Manage Events</Link>
                    </Container>
                </Box>
            </Container>
        </div>
    );
}

export default AdminPage;