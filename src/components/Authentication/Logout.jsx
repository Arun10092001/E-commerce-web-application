import React, { useEffect } from "react";
import { logout } from "../../service/userservices";

const Logout = ({ setUser }) => {
  useEffect(() => {
    logout();
    setUser(null);
    window.location = "/";
  }, [setUser]);

  return null;
};

export default Logout;
