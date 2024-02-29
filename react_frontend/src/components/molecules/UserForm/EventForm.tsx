import { useFormik } from "formik";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Event } from "../../../types/models/Event.model";
import { useContext, useEffect, useState } from "react";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";
import UserService from "../../../Services/UserService";
import { User } from "../../../types/models/User.model";

interface EventProps {
  event: Event;
  submitActionHandler: (values: Event) => void;
}

const EventForm = ({ event, submitActionHandler }: EventProps) => {
  const navigate = useNavigate();
  const { user } = useContext(ActiveUserContext);

  const formik = useFormik({
    initialValues: {
      id: event.id,
      name: event ? event.name : "",
      date: event ? event.date : "",
      location: event ? event.location : "",
      description: event ? event.description : "",
      owner: event
        ? event.owner
        : { id: "", email: "", firstName: "", lastName: "", roles: [] },
      guests: event.guests || [],
      owner_id: undefined,
    },
    validationSchema: object({
      name: string().required().min(2).max(20),
      date: string().required().matches(/^(\d{2}).(\d{2}).(\d{4})$/, 'Bitte geben Sie ein gültiges Datum im Format TT.MM.YYYY ein.'),
      location: string().required().min(2).max(20),
      description: string().required().min(2).max(200),
    }),
    onSubmit: (values: Event) => {
      submitActionHandler(values);
      console.log(values);
    },
    enableReinitialize: true,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [eventGuests, setEventGuests] = useState<User[]>([]);
  const [guests, setGuests] = useState<User[]>([]); // Define guests state variable

  useEffect(() => {
    UserService.getAllUsers().then((data: any) => {
      setUsers(data.data);
    });
  }, []);

  useEffect(() => {
    if (event.id) {
      EventService.getEventGuests(event.id, { page: 0, size: 10 }).then((guests) => {
        setEventGuests(guests);
      }).catch((error) => {
        console.error('Error fetching event guests:', error);
      });
    }
  }, [event.id]);

  const handleUserChange = (event: React.SyntheticEvent, newValue: User[] | null) => {
    if (newValue) {
      setGuests(newValue);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h1>Create Event</h1>
        <Box sx={{ paddingTop: "15px" }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            sx={{ paddingRight: "10px" }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.name && formik.errors.name)}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            sx={{ paddingRight: "10px" }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.date && formik.errors.date)}
            value={formik.values.date}
          />
          {formik.errors.date && formik.touched.date ? (
            <div style={{ color: "red" }}>{formik.errors.date}</div>
          ) : null}
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            sx={{ paddingRight: "10px" }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.location && formik.errors.location)}
            value={formik.values.location}
          />
          {formik.errors.location && formik.touched.location ? (
            <div style={{ color: "red" }}>{formik.errors.location}</div>
          ) : null}
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            sx={{ paddingRight: "10px" }}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.touched.description && formik.errors.description)}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description ? (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          ) : null}
           <Autocomplete
          multiple
          options={users}
          getOptionLabel={(option) => option.email}
          onChange={handleUserChange}
          value={guests}
          renderInput={(params) => <TextField {...params} variant="standard" label="Users" />}
        />
        </Box>
        <div>
          <Button
            sx={{ marginTop: "15px", marginRight: "10px" }}
            variant="contained"
            color="success"
            type="submit"
            disabled={!(formik.dirty && formik.isValid)}
          >
            {event.id ? "Save" : "Create"}
          </Button>
          <Button
            sx={{ marginTop: "15px" }}
            variant="contained"
            color="error"
            onClick={() => {
              navigate("/event/");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
