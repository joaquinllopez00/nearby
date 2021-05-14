import axios from "axios";

const base_url = "http://localhost:4000";

export const getAddress = async (add, city, state, zip) => {
  try {
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${add}%20${state}%20${state}%20${zip}.json?access_token=pk.eyJ1Ijoiam9hcXVpbmxsb3BlejAwIiwiYSI6ImNrbmdscXVsMjF1NDgycG1pdWRoYWxxYWQifQ.tDXw5R4ecE0ss_PbRxk2_A`,
    );
    return data;
  } catch (err) {
    return err.message;
  }
};

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

export const createEvent = async (title, address, privacy, password, time, type, date, description, user) => {
  console.log(title, address, privacy, password, time, type, date, description, user);
  const splitAddress = address.split(",");
  console.log(splitAddress);
  try {
    const location = await getAddress(splitAddress[0], splitAddress[1], splitAddress[2], splitAddress[3]);
    console.log(location.features[0].center);
    const { data } = await axios.post(`${base_url}/events`, {
      title: title,
      address: address,
      location: location.features[0].center,
      private: privacy,
      password: password,
      time: time,
      type: type,
      date: date,
      description: description,
      host: user.name,
      hostId: user.id,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }

  // try {

  // }catch(err){
  //   console.log(err)
  // }
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

export const editProfilePage = async (OriginalUsername, username, name, description) => {
  try {
    const { data } = await axios.patch(`${base_url}/user`, {
      OriginalUsername: OriginalUsername,
      username: username,
      name: name,
      description: description,
    });
    return data;
  } catch (err) {
    return { message: err };
  }
};
