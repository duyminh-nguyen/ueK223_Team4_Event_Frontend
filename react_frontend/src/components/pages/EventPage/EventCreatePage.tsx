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

const EventCreatePage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { user } = useContext(ActiveUserContext);
  const [event, setBlogPost] = useState<Event>({
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
        EventService.createEvent(event)
          .then((res) => {
            return setBlogPost(res);
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
    if (eventId !== undefined) {
      EventService.updateEvent(values).then(() => {
        navigate("/event/" + values.id);
      });
    } else {
      EventService.updateEvent(values).then(() => {
        navigate("/event/" + valuesToSubmit.owner.id);
      });
    }
  };

  return (
    <EventForm
      event={event}
      submitActionHandler={submitActionHandler}
    />
  );
};

export default EventCreatePage;