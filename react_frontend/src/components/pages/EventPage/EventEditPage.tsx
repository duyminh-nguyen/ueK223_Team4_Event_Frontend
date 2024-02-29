import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Event } from "../../../types/models/Event.model";
import EventForm from "../../molecules/UserForm/EventForm";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";

// Component for editing an event
const EventEditPage = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // Accessing event ID from URL parameters
  const { eventId } = useParams();
  // Accessing active user context
  const { user } = useContext(ActiveUserContext);
  // State variable for managing event data
  const [event, setEvent] = useState<Event>({
    id: "",
    name: "",
    date: "",
    location: "",
    description: "",
    owner_id: "",
    owner: { id: "", firstName: "", lastName: "", email: "", roles: [] },
    guests: [],
  });

  // Fetch event data when component mounts
  useEffect(() => {
    if (eventId) {
      // Fetch event details and update state
      EventService.getEventById(eventId)
        .then((res) => {
          console.log(res);
          return setEvent(res);
        })
        .catch((error) => {
          console.log(error + " failed to get event");
        });
    }
  }, [eventId]);

  // Function to handle form submission
  const submitActionHandler = (values: Event) => {
    let valuesToSubmit = values;
    valuesToSubmit.owner.id = user?.id ?? "";
    // Update event details on the server
    EventService.updateEvent(valuesToSubmit).then(() => {
      navigate("/event/");
    });
  };

  return (
    <EventForm
      event={event}
      submitActionHandler={submitActionHandler}
    />
  );
};

export default EventEditPage;
