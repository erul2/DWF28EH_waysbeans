import { jsonConfig, API, setAuthToken } from "../../api";
import { checkUser } from "../user";

export const login = async (type, form, dispatch, success, e) => {
  try {
    const loginData =
      type === "LOGIN" ? { email: form.email, password: form.password } : form;

    // data Body
    const body = JSON.stringify(loginData);

    // insert data login proccess
    const response = await API.post(
      type === "LOGIN" ? "/login" : "/register",
      body,
      jsonConfig
    );

    const token = response.data.data.user.token;
    localStorage.setItem("token", token);
    setAuthToken(token);
    await checkUser(dispatch);
    success();
  } catch (error) {
    if (error.response) {
      e(error.response.data.message);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};
