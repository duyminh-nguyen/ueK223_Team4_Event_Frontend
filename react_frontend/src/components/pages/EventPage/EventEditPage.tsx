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

const EventEditPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { user } = useContext(ActiveUserContext);
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

  useEffect(() => {
    return () => {
      if (eventId) {
        EventService.getEventById(eventId)
          .then((res) => {
            console.log(res);
            return setEvents(res);
          })
          .catch((error) => {
            console.log(error + " failed to get event");
          });
      }
    };
  }, [eventId]);

  const submitActionHandler = (values: Event) => {
    let valuesToSubmit = values;
    valuesToSubmit.owner.id = user?.id ?? "";
      EventService.updateEvent(values).then(() => {
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