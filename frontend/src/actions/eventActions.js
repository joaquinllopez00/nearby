import { getEventData } from "../api";

export const showEventDetail = () => ({
  type: "SHOW_EVENT",
});

export const hideEventDetail = () => ({
  type: "HIDE_EVENT",
});

export const getEvents = () => async (dispatch) => {
  const data = await getEventData();
  console.log(data);
  dispatch({
    type: "GET_EVENTS",
    payload: {
      events: data,
    },
  });
};
