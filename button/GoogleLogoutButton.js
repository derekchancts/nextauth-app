import React from "react";
import {createButton} from "react-social-login-buttons";

const config = {
  text: "Sign up with Google",
  icon: "google",
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};
export const GoogleLogoutButton = createButton(config);
