const initState = {
  user: [],
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload.user,
      };
    default:
      return state;
  }
};
