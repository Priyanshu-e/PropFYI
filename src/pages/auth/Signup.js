import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupImage from "../../images/auth/signup_imaeg.png";
import nameImage from "../../images/auth/name.png";
import email from "../../images/auth/email.png";

import line from "../../images/auth/line.png";
import close from "../../images/auth/close.png";
import otpImage from "../../images/auth/otp.png";
import "../auth/auth.css";
import { BASE_URL } from "../../route/BaseUrl";
import SocialLogins from "./SocialLogins";

const Signup = ({ closeModal }) => {
  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  console.log(userId);
  console.log(userData);
  const userSingUp = async () => {
    const formData = {
      full_name: userName,
      phone: userPhone,
      email: userEmail,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData).toString(),
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/register`,
        requestOptions
      );
      const result = await response.json();

      if (result.status == "failed") {
        let validation_msg = result.errors.join(",");
        toast.warning(validation_msg);
      } else {
        setUserData(result);
        console.log(result.data);
        setUserId(result?.data?.id);
        toast.success("enter the otp");
        setShowOtp(true);
      }
    } catch (error) {
      toast.warning("User already exist", error);
    }
  };
  const signOtp = async () => {
    const otpData = {
      user_id: userId,
      otp: otp,
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

      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        toast.success("Welcome to Propfyi");
        closeModal();
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      toast.warning("enter the correct otp");
    }
  };
  const resendOtp = async () => {
    const resendOtpData = {
      user_id: userId,
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
      console.log(result);
      if (result.result == "failed") {
        toast.warning(result.message);
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      toast.warning("enter the correct otp");
    }
  };
  return (
    <section className="modal_section">
      <img
        src={close}
        className="close_btn mobile_login hide_desktop"
        onClick={() => {
          closeModal();
        }}
      />
      <div>
        <div className="container-fluid">
          <div className="row login_modal">
            <div className="col-lg-6 image_col_6">
              <img
                src={signupImage}
                alt="property-selling"
                className="login_image "
              />
            </div>

            <div className="col-lg-6 content">
              <img
                src={close}
                className="close_btn hide_mobile"
                onClick={() => {
                  closeModal();
                }}
              />
              <div className="content_div">
                <h3 className="login_heading">Create Profile</h3>
                {showOtp === false ? (
                  <>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="input_div_signup">
                          <img src={nameImage} className="email" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="login_input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="input_div_signup">
                      <img src={otpImage} className="email" />
                      <input
                        type="tel"
                        placeholder="Phone"
                        className="login_input"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                      />
                    </div>
                    <div className="input_div_signup">
                      <img src={email} className="email" />
                      <input
                        type="email"
                        placeholder="Email"
                        className="login_input"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                    <div className="checkbox_input">
                      <input
                        type="checkbox"
                        className="input_checkbox"
                        checked
                      />
                      <label className="check_para">
                        I have read and agreed to the terms and conditions.
                      </label>
                    </div>
                    <div className="button_div mobile_font">
                      <button
                        className="carousel_btn"
                        onClick={() => {
                          if (!userName && !userEmail && !userPhone) {
                            toast.warning("please enter the  require field");
                          } else {
                            userSingUp();
                          }
                        }}
                      >
                        Send Otp
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
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className="button_div">
                      <button
                        className="carousel_btn mobile_font"
                        onClick={() => {
                          if (!otp) {
                            toast.warning("please enter the otp");
                          } else {
                            signOtp();
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
  );
};

export default Signup;
