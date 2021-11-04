import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  const updateSpots = function (state, appointments) {
    //find the day Object
    const day = state.days.find((d) => d.name === state.day);
    //get the appointments ids array
    let spots = 0;
    //iterate id's -> get appointment object
    for (const id of day.appointments) {
      const appointment = appointments[id];
      // if ! interview increment counter
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...day, spots };
    const newDays = state.days.map((d) => (d.name === state.day ? newDay : d));

    return newDays;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          days: updateSpots(state, appointments),
          appointments,
        });
      });
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          days: updateSpots(state, appointments),
          appointments,
        });
      });
  }

  return { state, updateSpots, setDay, bookInterview, cancelInterview };
}
