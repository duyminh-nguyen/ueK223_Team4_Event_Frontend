import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Event } from "../../../types/models/Event.model";
import EventForm from "../../molecules/UserForm/EventForm";
import { useNavigate, useParams } from "react-router-dom";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import EventService from "../../../Services/EventService";

interface BlogPostProps {
  event: Event;
  submitActionHandler: (values: Event) => void;
}

// Component for creating a new event
const EventCreatePage = () => {
  // Hook for navigation
  const navigate = useNavigate();
  // Accessing parameters from the URL
  const { eventId } = useParams();
  // Accessing active user context
  const { user } = useContext(ActiveUserContext);
  // State variable for managing event data
  const [event, setEvents] = useState<Event>({
    id: "",
    name: "",
    date: "",
    location: "",
    description: "",
    owner_id: "",
    owner: { id: "", firstName: "", lastName: "", email: "", roles: [] },
    guests: [],
  });

  // Handler function for form submission
  const submitActionHandler = (values: Event) => {
    // Adding owner ID to the event
    let valuesToSubmit = values;
    valuesToSubmit.owner.id = user?.id ?? "";
    // Calling EventService to create the event
    EventService.createEvent(values).then(() => {
      // Navigating to the event list page after event creation
      navigate("/event/");
    });
  };

  return (
    // Rendering the EventForm component with event data and submission handler
    <EventForm
      event={event}
      submitActionHandler={submitActionHandler}
    />
  );
};

export default EventCreatePage;
