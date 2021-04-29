export const setCoords = (pos) => async (dispatch) => {
  // const error = (err) => {
  //   console.warn(`ERROR(${err.code}): ${err.message}`);
  // };
  // const success = async (pos) => {
  //   console.log("successfully got coordinates", pos.coords);
  //   await setCoords([pos.coords.longitude, pos.coords.latitude]);
  // };

  // const getCoordinates = () => {

  await navigator.geolocation.getCurrentPosition(async (position) => {
    const pos = position.coords;
    console.log(pos);
    dispatch({
      type: "SET_COORDS",
      payload: {
        coords: [pos.longitude, pos.latitude],
      },
    });
  });
};
