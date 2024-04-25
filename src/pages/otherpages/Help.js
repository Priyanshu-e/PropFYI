import React, { useState } from "react";
import user from "../../images/buy/user.png";
import { toast, ToastContainer } from "react-toastify";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { useDispatch, useSelector } from "react-redux";
import { saveEnquiry } from "../../redux/slices/helpSlice";

const Help = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.help.loading);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = () => {
    if (!name || !email || !phone || !message) {
      toast.warning("Please fill in all required fields");
    } else {
      dispatch(saveEnquiry({ name, email, phone, message })).then(
        (response) => {
          if (response.payload.status === "failed") {
            toast.warning(response.payload.errors[0]);
          } else {
            toast.success(response.payload.message);
            setName("");
            setEmail("");
            setPhone("");
            setMessage("");
          }
        }
      );
    }
  };

  return (
    <>
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <section className="help_section mobile_padding">
        <div className="container">
          <div className="row justify-content-center"> {/* Center the content */}
            <div className="col-lg-8">
              <h1 className="help_text">Help</h1>
              <div className="row mt-4">
                <div className="col-lg-12">
                  <input
                    type="text"
                    className="help_text_input"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="email"
                    className="help_email_input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <input
                    type="phone"
                    className="help_phone_input"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <textarea
                    className="help_textarea_input"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="col-lg-12">
                  <input
                    type="submit"
                    className="help_submit_btn"
                    value="Submit"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
    </>
  );
};

export default Help;
