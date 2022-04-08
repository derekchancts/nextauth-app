import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "./userTypes"
import axios from "axios"


export const loadUser = (email, user) => async (dispatch) => {
  // console.log({email})
  // console.log({user})

  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }


    let response = '';

    if (email) {
      const { data } = await axios.post(`/api/user/profile`, { email }, config)
      response = data
      // console.log("data", data)
    }
    // const res = await fetch('/api/user/profile', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ email }),
    //   headers: {'Content-Type': 'application/json'}
    // });

    // const data = await res.json();

    

    dispatch({
      type: LOAD_USER_SUCCESS,
      // payload: data || user,
      payload: response || user,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
