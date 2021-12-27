import { API } from "../../api";

export const checkUser = async (dispatch) => {
  try {
    const response = await API.get("/checkuser");

    const payload = response.data.data.users;
    // send data to useContext
    payload.token = localStorage.getItem("token");
    dispatch({
      type: "LOGIN_SUCCESS",
      payload,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOGOUT",
    });
  }
};
