const initState = {
  showEvent: false,
};

export const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_EVENT":
      return {
        showEvent: true,
      };
    case "HIDE_EVENT":
      return {
        showEvent: false,
      };
    default:
      return state;
  }
};
