export const setUser = (data) => async (dispatch) => {
  dispatch({
    type: "SET_USER",
    payload: {
      user: data,
    },
  });
};
