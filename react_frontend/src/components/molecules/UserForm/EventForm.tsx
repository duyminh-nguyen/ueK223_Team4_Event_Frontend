import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { date, object, string } from 'yup';
import EventService from '../../../Services/EventService';
import { CreateEvent, Event } from '../../../types/models/Event.model';
import { User } from '../../../types/models/User.model';
import ActiveUserContext from '../../../Contexts/ActiveUserContext';
import UserService from '../../../Services/UserService';



export default function EventForm() {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(ActiveUserContext)

    const [event, setEvent] = useState<Event>({
        id: '',
        name: '',
        date: '',
        location: '',
        description: '',
        guests: [],
        owner: {
            id: '', firstName: '', lastName: '',
            email: '',
            roles: []
        }
    });

    const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAllUsers().then((data: any) => {
      setUsers(data.data);
    });
  }, []);


    const formik = useFormik({
        initialValues: {
            name: event.name,
            date: event.date,
            location: event.location,
            description: event.description,
            guests: event.guests,
            owner: event.owner
        },
        validationSchema: object({
            name: string().required().min(2).max(50),
            date: string().required().matches(/^(\d{2})-(\d{2})-(\d{4})$/, 'Bitte geben Sie ein gültiges Datum im Format TT.MM.YYYY ein.'),
            location: string().required(),
            description: string().required().min(10).max(200) // Adding validation for description
        }),
        onSubmit: (values: CreateEvent) => {
            handleSubmit(values);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
    };

    const handleSubmit = async (values: CreateEvent) => {
        try {
            if (eventId) {
                await EventService.updateEvent({ ...values, id: eventId });
                console.log('Event erfolgreich aktualisiert');
            } else {
                await EventService.createEvent(values);
                console.log('Event erfolgreich hinzugefügt');
                console.log(values)
            }
            navigate('/event');
        } catch (error) {
            console.error('Fehler beim Speichern des Events: ', error);
        }
    };

    return (
        <div>
            <h1>{eventId ? 'Edit Event' : 'Create Event'}</h1>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <TextField
                        name="name"
                        label="Event Name"
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onChange={handleInputChange}
                        error={Boolean(formik.touched.name && formik.errors.name)}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div style={{ color: 'red' }}>{formik.errors.name}</div>
                    ) : null}
                    <TextField
                        name="date"
                        label="Date"
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onChange={handleInputChange}
                        error={Boolean(formik.touched.date && formik.errors.date)}
                        value={formik.values.date}
                    />
                    {formik.errors.date && formik.touched.date ? (
                        <div style={{ color: 'red' }}>{formik.errors.date}</div>
                    ) : null}
                    <TextField
                        name="location"
                        label="Location"
                        variant="outlined"
                        onBlur={formik.handleBlur}
                        onChange={handleInputChange}
                        error={Boolean(formik.touched.location && formik.errors.location)}
                        value={formik.values.location}
                    />
                    {formik.errors.location && formik.touched.location ? (
                        <div style={{ color: 'red' }}>{formik.errors.location}</div>
                    ) : null}
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        onBlur={formik.handleBlur}
                        onChange={handleInputChange}
                        error={Boolean(formik.touched.description && formik.errors.description)}
                        value={formik.values.description}
                    />
                    {formik.errors.description && formik.touched.description ? (
                        <div style={{ color: 'red' }}>{formik.errors.description}</div>
                    ) : null}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!formik.isValid}
                    >
                        {eventId ? 'Update' : 'Create'}
                    </Button>
                    <Button 
                        variant="contained"
                        color="primary"
                        type="submit"
                        href="/event"
                    >
                        {eventId ? 'cancel' : 'cancel'}
                    </Button>
                    <Autocomplete
            multiple
            id="tags-standard"
            options={users}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Users"
              />
            )}
          />
                </Box>
            </form>
        </div>
    );
}
