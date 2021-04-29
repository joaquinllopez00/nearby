import axios from "axios";

const base_url = "http://localhost:4000";

export const getEventData = async () => {
  try {
    const { data } = await axios.get(`${base_url}/events`);
    console.log(data);
    console.log(base_url);
    return data;
  } catch (err) {
    console.log({ message: err });
  }
};

export const createUser = async (username, password, email) => {
  try {
    const { data } = await axios.post(`${base_url}/user/register`, {
      username: username,
      password: password,
      email: email,
    });
    return data;
  } catch (err) {
    return { message: err.message };
  }
};

export const signIn = async (username, password) => {
  try {
    const { data } = await axios.post(`${base_url}/user/login`, {
      username: username,
      password: password,
    });
    console.log(data, "signIn");
    return data;
  } catch (err) {
    return { message: err };
  }
};

export const addToParticipants = async (id, eventId, participants) => {
  participants = [...participants, id];
  try {
    const { data } = await axios.patch(`${base_url}/events`, {
      id: eventId,
      participants: participants,
    });
    console.log(data, "addToParticipants");
    return data;
  } catch (err) {
    return { message: err };
  }
};
