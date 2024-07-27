import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const useAuthentication = () => {
  const info = secureLocalStorage.getItem("UserData");

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = (loginData, location, navigate) => {
    setIsLoading(false);

    let body = JSON.stringify({
      Email: loginData.email,
      Password: loginData.password,
    });

    let url = `https://flyfarladies-apiv2.appspot.com/user/login`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        if (data.status === "success") {
          secureLocalStorage.setItem("user-info", data?.jwtToken);
          const url = `https://flyfarladies-apiv2.appspot.com/user/verify`;
          let body1 = JSON.stringify({
            jwtToken: data?.jwtToken,
          });
          fetch(url, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: body1,
          })
            .then((res) => res.json())
            .then((data) => {
              secureLocalStorage.setItem("UserData", data);
              navigate(0);
            });
        } else {
          secureLocalStorage.removeItem("user-info");
          setError(data.message);
        }
      })
      .finally(() => setIsLoading(true));
  };

  const logout = () => {
    secureLocalStorage.removeItem("user-info");
    secureLocalStorage.removeItem("UserData");
    navigate("/");
  };

  return {
    loginUser,
    logout,
    isLoading,
    error,
  };
};

export default useAuthentication;
