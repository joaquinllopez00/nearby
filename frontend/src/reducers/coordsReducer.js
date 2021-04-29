const initState = {
  coords: null,
};

export const coordsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_COORDS":
      return {
        coords: action.payload.coords,
      };
    default:
      return state;
  }
};
