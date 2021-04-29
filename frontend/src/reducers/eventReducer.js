const initState = {
  showEvent: false,
  events: [],
};

export const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_EVENT":
      return {
        ...state,
        showEvent: true,
      };
    case "HIDE_EVENT":
      return {
        ...state,
        showEvent: false,
      };

    case "GET_EVENTS":
      console.log(action.payload.events, "EVENT REDUCER");
      return {
        ...state,
        events: action.payload.events,
      };
    default:
      return state;
  }
};
