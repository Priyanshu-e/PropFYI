import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import loginImage from "../../images/auth/login_image.png";
import loginLogo from "../../images/auth/login_logo.png";
import email from "../../images/auth/email.png";
import google from "../../images/auth/google.png";
import facebook from "../../images/auth/facebook.png";
import apple from "../../images/auth/apple.png";
import line from "../../images/auth/line.png";
import close from "../../images/auth/close.png";
import otpImage from "../../images/auth/otp.png";
import "../auth/auth.css";
import Signup from "./Signup";
import { BASE_URL } from "../../route/BaseUrl";
import { useNavigate } from "react-router-dom";
import WebsiteLoader from "../../helper/WebsiteLoader";
import SocialLogins from "./SocialLogins";

const Login = ({ closeModal, openSignupModal }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [loginField, setLoginField] = useState();
  const [loginOtp, setLoginOtp] = useState();
  const [userData, setUserData] = useState();

  const singIn = async () => {
    const loginData = {
      username: loginField,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(loginData).toString(),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/login`,
        requestOptions
      );
      const result = await response.json();

      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        setUserData(result?.data?.user_id);
        toast.success(result.message);
        setShowOtp(true);
        setLoginField("");
        setLoginOtp("");
      }
    } catch (error) {
      toast.success("Error:", error);
    }
  };
  const submitLoginOtp = async () => {
    const otpData = {
      user_id: userData,
      otp: loginOtp,
    };
    const otpOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(otpData).toString(),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/verify-otp`,
        otpOptions
      );
      const result = await response.json();
      localStorage.setItem("userDetails", JSON.stringify(result));
      console.log(result, "submitOTP");
      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        toast.success("Welcome to Propfyi");
        window.location.reload();
        closeModal();
      }
    } catch (error) {
      toast.warning("enter the correct otp");
    }
  };

  const resendOtp = async () => {
    const resendOtpData = {
      user_id: userData,
    };
    const resendOtpOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(resendOtpData).toString(),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/resend-otp`,
        resendOtpOptions
      );
      const result = await response.json();
      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      toast.warning("enter the correct otp");
    }
  };
  return (
    <>
      <section className="modal_section">
        {loading && (
          <section className="pre_loader">
            <div>
              <WebsiteLoader />
            </div>
          </section>
        )}
        <img
          src={close}
          className="close_btn mobile_login hide_desktop"
          onClick={() => {
            closeModal();
          }}
        />
        <div>
          <div className="container-fluid zero-padding">
            <div className="row login_modal">
              <div className="col-lg-6 image_col_6">
                <img
                  src={loginImage}
                  alt="property-selling"
                  className="login_image"
                />
              </div>

              <div className="col-lg-6 content">
                <img
                  src={close}
                  className="close_btn mobile_login hide_mobile"
                  onClick={() => {
                    closeModal();
                  }}
                />
                <div className="content_div">
                  <h3 className="login_heading">Welcome To</h3>
                  <img src={loginLogo} className="login_logo" />

                  {showOtp === false ? (
                    <>
                      <div className="input_div">
                        <img src={email} className="email" />
                        <input
                          type="text"
                          placeholder="Email or Phone"
                          className="login_input"
                          value={loginField}
                          onChange={(e) => setLoginField(e.target.value)}
                        />
                      </div>
                      <div className="button_div">
                        <button
                          className="carousel_btn mobile_font"
                          onClick={() => {
                            if (!loginField) {
                              toast.warning("please enter the require field");
                            } else {
                              singIn();
                            }
                          }}
                        >
                          Send Otp
                        </button>
                        <button
                          className="carousel_btn_2 mobile_font"
                          onClick={() => {
                            openSignupModal();
                            closeModal();
                          }}
                        >
                          Create Profile
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="input_div">
                        <img src={otpImage} className="email" />
                        <input
                          type="text"
                          placeholder="Enter Otp"
                          className="login_input"
                          value={loginOtp}
                          onChange={(e) => setLoginOtp(e.target.value)}
                        />
                      </div>
                      <div className="button_div">
                        <button
                          className="carousel_btn mobile_font"
                          onClick={() => {
                            if (!loginOtp) {
                              toast.warning("please enter the require field");
                            } else {
                              submitLoginOtp();
                            }
                          }}
                        >
                          Submit Otp
                        </button>
                        <button
                          className="carousel_btn_2 mobile_font"
                          onClick={() => {
                            resendOtp();
                          }}
                        >
                          Resend Otp
                        </button>
                      </div>
                    </>
                  )}

                  <div className="para-div">
                    <img src={line} className="line" />
                    <p className="login_para">Or continue with</p>
                    <img src={line} className="line" />
                  </div>

                  <SocialLogins />
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </section>
    </>
  );
};

export default Login;
