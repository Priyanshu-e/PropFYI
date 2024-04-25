import React, { useCallback, useEffect, useState } from "react";
import google from "../../images/auth/google.png";
import facebook from "../../images/auth/facebook.png";
import apple from "../../images/auth/apple.png";
import { jwtDecode } from "jwt-decode";
import {
  LoginSocialFacebook,
  LoginSocialApple,
  IResolveParams,
} from "reactjs-social-login";
import { useGoogleLogin } from "@react-oauth/google";
import { BASE_URL } from "../../route/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import "../auth/auth.css";
import axios from "axios";

const SocialLogins = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo? 
            access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          const googleData = {
            full_name: res?.data?.name,
            email: res?.data?.email,
            google_id: res?.data?.id,
          };
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(googleData).toString(),
          };
          try {
            const response = await fetch(
              `${BASE_URL}/api/users/social-auth/google`,
              requestOptions
            );

            const result = await response.json();
            console.log(result, "google responces");
            localStorage.setItem(
              "userDetails",
              JSON.stringify(result?.data?.userDetails)
            );

            if (result.result == "failed") {
              toast.warning(result.message);
            } else {
              toast.success("Welcome to Propfyi");
              window.location.href = "/";
            }
            console.log(result);
          } catch (error) {
            console.log("Error:", error);
          }
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const facebookLogin = async (data) => {
    const facebookData = {
      full_name: data?.name,
      email: data?.email,
      facebook_id: data?.id,
    };
    console.log(facebookData, "++++++++++++++++++++====");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(facebookData).toString(),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/social-auth/facebook`,
        requestOptions
      );

      const result = await response.json();
      console.log(result, "---------------------------");

      localStorage.setItem(
        "userDetails",
        JSON.stringify(result?.data?.userDetails)
      );
      console.log(result);
      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        console.log(result);
        toast.success("Welcome to Propfyi");
        window.location.href = "/";
      }
      console.log(result);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const onLoginStart = useCallback(() => {
    // alert("login start");
  }, []);
  const [provider, setProvider] = useState("");
  console.log(provider);
  const [profile, setProfile] = useState(null);
  const appleLogin = async (data) => {
    const appleData = {
      full_name: data?.name,
      email: data?.email,
      apple_id: data?.id,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(appleData).toString(),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/users/social-auth/apple`,
        requestOptions
      );

      const result = await response.json();

      localStorage.setItem(
        "userDetails",
        JSON.stringify(result?.data?.userDetails)
      );

      if (result.result === "failed") {
        toast.warning(result.message);
      } else {
        toast.success("Welcome to Propfyi");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="social_div">
      <LoginSocialApple
        client_id={"3DZVM2GN57"}
        scope={"name email"}
        redirect_uri={"https://www.propfyi.com/"}
        onLoginStart={onLoginStart}
        onResolve={({ provider, data }: IResolveParams) => {
          setProvider(provider);
          setProfile(data);
          appleLogin(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <img src={apple} className="social_image" alt="Apple" />
      </LoginSocialApple>

      <LoginSocialFacebook
        isOnlyGetToken
        appId="326322533717233"
        onResolve={async (response) => {
          console.log(response.data.accessToken);
          const facebookData = await fetch(
            "https://graph.facebook.com/v12.0/me?fields=email,name,id,picture&access_token=" +
              response.data.accessToken
          );
          const fbData = await facebookData.json();
          facebookLogin(fbData);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <img src={facebook} className="social_image" />
      </LoginSocialFacebook>

      <img
        src={google}
        className="social_image"
        alt="Google"
        onClick={() => googleLogin()}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default SocialLogins;
