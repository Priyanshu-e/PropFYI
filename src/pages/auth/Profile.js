import React, { useEffect, useState } from "react";

import { FaUser } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import SavedProperties from "./SavedProperties";
import SavedSearch from "./SavedSearch";
import MyProfile from "./MyProfile";
import { AiFillLike } from "react-icons/ai";
import LikedProperties from "./LikedProperties";

const Profile = () => {
  const [showMyProfile, setShowMyProfile] = useState(true);

  const [showSavedProperties, setShowSavedProperties] = useState(false);
  const [showSavedSearch, setShowSavedSearch] = useState(false);
  const [showLikedProperties, setShowLikedProperties] = useState(false);

  return (
    <>
      <section className="profile_section mobile_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div
                className={`profile_div ${
                  showMyProfile ? "active_profile" : ""
                }`}
                onClick={() => {
                  setShowMyProfile(true);
                  setShowSavedProperties(false);
                  setShowSavedSearch(false);
                  setShowLikedProperties(false);
                }}
              >
                <FaUser
                  className={`user_icon ${showMyProfile ? "active_svg" : ""}`}
                />
                <p
                  className={`profile_para ${
                    showMyProfile ? "active_para" : ""
                  }`}
                >
                  Profile
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                className={`profile_div ${
                  showSavedProperties ? "active_profile" : ""
                }`}
                onClick={() => {
                  setShowSavedProperties(true);
                  setShowSavedSearch(false);
                  setShowMyProfile(false);
                  setShowLikedProperties(false);
                }}
              >
                <FaFileDownload
                  className={`user_icon ${
                    showSavedProperties ? "active_svg" : ""
                  }`}
                />
                <p
                  className={`profile_para ${
                    showSavedProperties ? "active_para" : ""
                  }`}
                >
                  Saved Properties
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                className={`profile_div ${
                  showSavedSearch ? "active_profile" : ""
                }`}
                onClick={() => {
                  setShowSavedSearch(true);
                  setShowSavedProperties(false);
                  setShowMyProfile(false);
                  setShowLikedProperties(false);
                }}
              >
                <FaBookmark
                  className={`user_icon ${showSavedSearch ? "active_svg" : ""}`}
                />
                <p
                  className={`profile_para ${
                    showSavedSearch ? "active_para" : ""
                  }`}
                >
                  Saved Search
                </p>
              </div>
            </div>
            <div className="col-lg-3">
              <div
                className={`profile_div ${
                  showLikedProperties ? "active_profile" : ""
                }`}
                onClick={() => {
                  setShowLikedProperties(true);
                  setShowSavedSearch(false);
                  setShowSavedProperties(false);
                  setShowMyProfile(false);
                }}
              >
                <AiFillLike
                  className={`user_icon ${
                    showLikedProperties ? "active_svg" : ""
                  }`}
                />
                <p
                  className={`profile_para ${
                    showLikedProperties ? "active_para" : ""
                  }`}
                >
                  Liked Properties
                </p>
              </div>
            </div>
          </div>
          {showMyProfile && (
            <div className="row mt-3">
              {" "}
              <MyProfile />
            </div>
          )}
          {showSavedProperties && (
            <div className="row mt-3">
              <SavedProperties />
            </div>
          )}
          {showSavedSearch && (
            <div className="row mt-3">
              <SavedSearch />
            </div>
          )}
          {showLikedProperties && (
            <div className="row mt-3">
              <LikedProperties />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
