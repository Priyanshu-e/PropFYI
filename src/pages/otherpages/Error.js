import React from "react";
import errorImage from "../../images/otherpages/404.svg";
import SocialIcons from "../../helper/SocialIcons";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="error_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src={errorImage} style={{ width: "80%" }} />
            </div>
            <div className="col-lg-6 error_6">
              <div>
                <h1 className="about_banner_heading">Error 404</h1>
                <p className="not_found_span">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <SocialIcons className="error_social" />
                <button
                  className="carousel_btn mt-4"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Return to Propfyi
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
