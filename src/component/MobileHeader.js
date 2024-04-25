import React, { useEffect, useState, useRef } from "react";
import logo from "../images/header/logo.png";
import { RiMenu2Line } from "react-icons/ri";
import { IoIosCloseCircleOutline } from "react-icons/io";
import phone from "../images/footer/phone.png";
import email from "../images/footer/email.png";
import location from "../images/footer/location.png";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../route/BaseUrl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MobileHeaeder = () => {
  const deleteRef = useRef(null);

  const navigate = useNavigate();

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );

  const [showModal, setShowModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const openSignupModal = () => {
    setShowSignupModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const [userData, setUserData] = useState();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    setUserData(userDetails);
  });
  const [image, setImage] = useState();
  const getUserData = async () => {
    try {
      const userDetailsString = localStorage.getItem("userDetails");
      const userDetails = JSON.parse(userDetailsString).token;
      const requestGetOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Access-Control-Allow-Credentials": true,
        },
      };

      const res = await fetch(
        `${BASE_URL}/api/users/profile`,
        requestGetOptions
      );

      const userdata = await res.json();
      setImage(userdata.data.image);
    } catch (error) {}
  };
  useEffect(() => {
    getUserData();
  });
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [showDeleteDiv, setShowDeleteDiv] = useState(false);
  const logOutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const deleteUser = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;
    const deleteOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userDetails}`,
        "Access-Control-Allow-Credentials": true,
      },
    };
    try {
      const response = await fetch(
        `${BASE_URL}/api/users/delete-an-account`,
        deleteOptions,
        userDetails
      );
      const result = await response.json();
      localStorage.clear();
      window.location.href = "/";
      console.log(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setShowDeleteDiv(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [deleteRef]);
  return (
    <>
      <section className="mobile_header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 px-0">
              <div className="mobile_sub_div">
                <RiMenu2Line
                  className="menu-mobile"
                  onClick={() => {
                    openNav();
                  }}
                />

                <div id="mySidenav" className="sidenav">
                  <IoIosCloseCircleOutline
                    onClick={() => {
                      closeNav();
                    }}
                    className="mobile_side_close"
                  />
                  <a
                    href={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=sale`}
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Buy
                  </a>
                  {/* <NavLink
                    to={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=sale`}
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Buy
                  </NavLink> */}
                  <a
                    href={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=rental`}
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Rent
                  </a>
                  {/* <NavLink
                    to={`/${websiteSettingData?.footer_home_links[1]?.home_link}?pageNumber=1&location=&pageSize=10&property_type=rental`}
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Rent
                  </NavLink> */}
                  <NavLink
                    to="/sell"
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Sell
                  </NavLink>
                  <NavLink
                    to="/mortgage"
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Mortage
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Blog
                  </NavLink>
                  <NavLink
                    to="/help"
                    className="mobile_anchor"
                    onClick={() => {
                      closeNav();
                      handleClick();
                    }}
                  >
                    Help
                  </NavLink>
                  <ul className="footer_ul mobile_side_ul">
                    <li className="footer_li">
                      <img src={phone} className="contact_icon" />
                      <a
                        href={`tel:${websiteSettingData?.phone}`}
                        className="footer_anchor"
                      >
                        {websiteSettingData?.phone
                          ? websiteSettingData?.phone
                          : "+1 (713) 539-9244"}
                      </a>
                    </li>
                    <li className="footer_li">
                      <img src={email} className="contact_icon" />
                      <a
                        href={`mailto:${websiteSettingData?.email}`}
                        className="footer_anchor"
                      >
                        {websiteSettingData?.email
                          ? websiteSettingData?.email
                          : "team@propfyi.com"}
                      </a>
                    </li>
                  </ul>
                </div>

                <img
                  src={logo}
                  className="mobile_logo"
                  onClick={() => {
                    navigate("/");
                  }}
                />

                {userData === null ? (
                  <p
                    className="mobile_singin_heading"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Sign In
                  </p>
                ) : (
                  <NavLink
                    // onMouseOver={}
                    className="mobile_singin_heading"
                    onClick={() => {
                      setShowDeleteDiv(true);
                    }}
                  >
                    <img src={image} className="header_login header_avatar" />
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {showDeleteDiv && (
        <div ref={deleteRef} className="delete_div">
          <ul>
            <li>
              <NavLink to="/profile" className="user_hover">
                Profile
              </NavLink>
            </li>
            <li
              onClick={() => {
                setShowDelete(true);
              }}
            >
              Delete Account
            </li>
            <li
              onClick={() => {
                logOutUser();
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
      {showDelete && (
        <div className="sure_delete_div">
          <div>
            <p>Are you sure ?</p>
          </div>
          <div className="delete_btn_div">
            <button
              className="button_delete_modal"
              onClick={() => {
                deleteUser();
              }}
            >
              Yes
            </button>
            <button
              className="button_delete_modal_two"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      {showModal && (
        <Login closeModal={closeModal} openSignupModal={openSignupModal} />
      )}
      {showSignupModal && (
        <Signup closeModal={() => setShowSignupModal(false)} />
      )}
    </>
  );
};

export default MobileHeaeder;
