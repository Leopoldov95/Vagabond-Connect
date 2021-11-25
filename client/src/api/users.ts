import * as api from "./index";

/* export const signin = async (formData, history) => {
  try {
    const { data } = await api.signin(formData);

    localStorage.setItem("userProfile", JSON.stringify(data));

    history.push("/");
  } catch (error) {
    if (error.response && error.response.data) {
     // console.log(error.response.data.message) // some reason error message
      return error.response.data.message;
    }
  }
};
 */
export const signup = async (formData: any, history: any) => {
  try {
    const data = await api.signup(formData);
    console.log(data);

    //localStorage.setItem("userProfile", JSON.stringify(data));

    //history.push("/");
  } catch (error) {
    console.error(error);
    /*  if (error.response && error.response.data) {
     // alert(error.response.data.message) // some reason error message
     return  error.response.data.message;
    } */
  }
};
