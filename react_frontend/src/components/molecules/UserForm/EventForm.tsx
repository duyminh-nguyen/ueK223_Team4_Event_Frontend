import { useFormik } from "formik"; // Import useFormik hook for form handling
import { Autocomplete, Box, Button, TextField } from "@mui/material"; // Import UI components from Material-UI
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { object, string } from "yup"; // Import Yup for form validation
import { Event } from "../../../types/models/Event.model"; // Import Event model
import { useContext, useEffect, useState } from "react"; // Import React hooks
import ActiveUserContext from "../../../Contexts/ActiveUserContext"; // Import ActiveUserContext
import EventService from "../../../Services/EventService"; // Import EventService
import UserService from "../../../Services/UserService"; // Import UserService
import { User } from "../../../types/models/User.model"; // Import User model

// Define props interface for EventForm component
interface EventProps {
  event: Event; // Event object
  submitActionHandler: (values: Event) => void; // Handler for form submission
}

// Define EventForm component
const EventForm = ({ event, submitActionHandler }: EventProps) => {
  const navigate = useNavigate(); // Get navigation function from useNavigate hook
  const { user } = useContext(ActiveUserContext); // Get active user from context

  // Formik hook for form handling
  const formik = useFormik({
    initialValues: { /* Initial form values */ },
    validationSchema: object({ /* Form validation schema */ }),
    onSubmit: (values: Event) => { /* Submission handler */ },
    enableReinitialize: true, // Enable reinitialization of form values
  });

  // State variables for users and event guests
  const [users, setUsers] = useState<User[]>([]);
  const [eventGuests, setEventGuests] = useState<User[]>([]);
  const [guests, setGuests] = useState<User[]>([]); // Define guests state variable

  // Fetch all users on component mount
  useEffect(() => { /* Fetch all users */ }, []);

  // Fetch event guests if event ID changes
  useEffect(() => { /* Fetch event guests */ }, [event.id]);

  // Event handler for user selection in Autocomplete
  const handleUserChange = (event: React.SyntheticEvent, newValue: User[] | null) => { /* Handle user selection */ };

  // Render the component
  return (
    <> {/* Event form */}
      <form onSubmit={formik.handleSubmit}>
        {/* Text fields for event details */}
        <TextField id="name" label="Name" variant="outlined" sx={{ paddingRight: "10px" }} />
        {/* Repeat similar structure for other text fields */}
        <Autocomplete multiple options={users} onChange={handleUserChange} value={guests} renderInput={(params) => <TextField {...params} variant="standard" label="Users" />} />
        {/* Buttons for form submission and cancellation */}
        <Button variant="contained" color="success" type="submit" disabled={!(formik.dirty && formik.isValid)}>
          {event.id ? "Save" : "Create"} {/* Change button label based on whether it's an edit or create */}
        </Button>
        <Button variant="contained" color="error" onClick={() => { navigate("/event/"); }}>
          Cancel {/* Button to cancel event creation */}
        </Button>
      </form>
    </>
  );
};

export default EventForm; // Export EventForm component
