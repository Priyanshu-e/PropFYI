import React, { useState } from "react";
import searchIcon from "../images/home/search.png";
import "../helper/helper.css";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../route/BaseUrl";
import newletter_banner from "../images/otherpages/newletter_banner.png";

const Newsletter = () => {
  const strongRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );
  const [email, setEmail] = useState("");
  const newsletter = async () => {
    const helpData = {
      email: email,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helpData),
    };

    try {
      const response = await fetch(
        `${BASE_URL}/api/website/post-newsletter`,
        requestOptions
      );
      const result = await response.json();

      if (result.status == "failed") {
        toast.warning(result?.errors[0]);
      } else {
        toast.success(result?.message);
        console.log(result);

        setEmail("");
      }
    } catch (error) {
      toast.warning("Error:", error);
    }
  };

  return (
    <>
      <section 
        className="newletter_div"
        style={{ backgroundImage: `url(${newletter_banner})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h3 className="newsletter_subheading"></h3>
              <h2 className="newletter_heading">Join our Newsletter</h2>
            </div>
            <div className="col-lg-7">
              <div className="newsletter_search_div">
                <img src={searchIcon} className="search_icon" />
                <input
                  type="search"
                  placeholder="Email id"
                  className="newsletter_search_input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="input_btn newsletter_btn"
                  onClick={() => {
                    if (!email) {
                      toast.warning("Please enter the email");
                    } else if (!strongRegex.test(email)) {
                      toast.warning("Please enter the valid email");
                    } else {
                      newsletter();
                    }
                  }}
                >
                  Subscribe
                </button>
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

export default Newsletter;
