import { useDispatch } from "react-redux";
import { signIn } from "../api";

export const setUser = (data) => async (dispatch) => {
  dispatch({
    type: "SET_USER",
    payload: {
      user: data,
    },
  });
};
