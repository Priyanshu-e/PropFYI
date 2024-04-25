import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import myUserImage from "../../images/auth/user_image.png";
import camera from "../../images/auth/camera.png";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);

  //get user data
  const getUserData = async () => {
    try {
      setLoading(true);
      const userDetailsString = localStorage.getItem("userDetails");
      const userDetails = JSON.parse(userDetailsString)?.token;
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

      if (!res.ok) {
        throw new Error(`Failed to fetch user profile: ${res.status}`);
      }

      const userdata = await res.json();
      setUpdateName(userdata?.data?.full_name);
      setUpdatePhone(userdata?.data?.phone);
      setUpdateEmail(userdata?.data?.email);
      setImage(userdata?.data?.image);
      // console.log(userdata, "userdata---------------------------");
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  //update user data
  const [updateName, setUpdateName] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [image, setImage] = useState();

  //upload image
  const [profileImage, setProfileImage] = useState(null);
  const [imageUri, serImageUri] = useState(null);

  const inputRef = useRef(null);
  const handelClickImage = () => {
    inputRef.current.click();
  };

  const handelImageChange = (event) => {
    const file = event.target.files[0];
    serImageUri(file);
    setProfileImage(URL.createObjectURL(file));
    setSelectedAvatar(null);
  };

  //get avtar
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const getSelectedAvatarImageURL = () => {
    const selectedAvatarData = avtar.find((item) => item.id === selectedAvatar);
    return selectedAvatarData ? selectedAvatarData.image : null;
  };

  const [avtar, setAvtar] = useState();
  const [showAvtar, setShowAvtar] = useState(false);

  const getAvtar = () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;
    console.log(userDetails);
    const requestAvtarOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userDetails}`,
        "Access-Control-Allow-Credentials": true,
      },
    };

    fetch(`${BASE_URL}/api/website/get-avatars`, requestAvtarOptions)
      .then((res) => res.json())
      .then((avtardata) => {
        setAvtar(avtardata.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //update profile
  const updateProfile = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    const formData = new FormData();
    formData.append("full_name", updateName);
    formData.append("email", updateEmail);
    formData.append("phone", updatePhone);

    if (selectedAvatar && imageUri) {
      toast.error(
        "Please select either an avatar or upload an image, not both."
      );
      return;
    }
    if (selectedAvatar) {
      formData.append("avatar_id", selectedAvatar);
    }

    if (imageUri) {
      formData.append("image", imageUri);
    }

    const updateOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userDetails}`,
      },
      body: formData,
    };
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/users/update-profile`,
        updateOptions
      );
      const result = await response.json();

      if (result.status == "failed") {
        let validation_msg = result.errors.join(",");
        console.log(validation_msg);
      } else {
        toast.success("profile update successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    getAvtar();
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <section className="mt-4 ">
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <div className="row">
        <div className="col-lg-4">
          <div className="first_profile_my_div">
            <img src={camera} className="camera" onClick={handelClickImage} />
            <input
              type="file"
              ref={inputRef}
              onChange={handelImageChange}
              style={{ display: "none" }}
            />
            <p className="text-center">
              {selectedAvatar ? (
                <img
                  src={getSelectedAvatarImageURL()}
                  className="my_user_image"
                />
              ) : profileImage ? (
                <img src={profileImage} className="my_user_image" />
              ) : (
                <img src={image} className="my_user_image" />
              )}
            </p>
            <p className="text-center">
              <button
                className="carousel_btn avtar_btn avtar_btn"
                onClick={() => {
                  setShowAvtar(true);
                }}
              >
                Select Avtar
              </button>
              {showAvtar && (
                <div className="avtar_upper_div">
                  <div className="first_profile_my_div avtar_div">
                    <div>
                      <h2 className="avtar_heading">Use Avatar</h2>
                    </div>

                    <div>
                      {avtar.map((item) => {
                        return (
                          <img
                            key={item.id}
                            src={item.image}
                            className={`my_avtar_image ${
                              selectedAvatar === item.id ? "selected" : ""
                            }`}
                            onClick={() => {
                              setSelectedAvatar(item.id);
                              console.log(item.id, item.image);
                              setShowAvtar(false);
                              setProfileImage(null);
                            }}
                          />
                        );
                      })}
                    </div>
                    <div>
                      <button
                        className="carousel_btn avtar_btn avtar_btn"
                        onClick={() => {
                          setShowAvtar(false);
                        }}
                      >
                        Use Avatar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </p>
          </div>
        </div>
        <div className="col-lg-8 ">
          <div className="saved_col_profile">
            <div className="profile_first_div">
              <div>
                <FaUser className="user_icon profile-icon" />
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="profile_input_edit"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
              </div>
            </div>
            <div>{/* <p className="profile_edit">Edit</p> */}</div>
          </div>
          <div className="saved_col_profile mt-3">
            <div className="profile_first_div">
              <div>
                <FaPhone className="user_icon profile-icon" />
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="number"
                  className="profile_input_edit"
                  placeholder="+123-123-1234"
                  value={updatePhone}
                  onChange={(e) => setUpdatePhone(e.target.value)}
                />
              </div>
            </div>
            <div>{/* <p className="profile_edit">Edit</p> */}</div>
          </div>
          <div className="saved_col_profile mt-3">
            <div className="profile_first_div">
              <div>
                <MdEmail className="user_icon_email profile-icon" />
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="email"
                  className="profile_input_edit"
                  placeholder="user@email.com"
                  value={updateEmail}
                  onChange={(e) => setUpdateEmail(e.target.value)}
                />
              </div>
            </div>
            <div>{/* <p className="profile_edit">Edit</p> */}</div>
          </div>

          <div className="logout_div">
            <button
              className="carousel_btn avtar_btn"
              onClick={() => {
                logOutUser();
              }}
            >
              Logout
            </button>
            <button
              className="carousel_btn avtar_btn"
              onClick={() => {
                if (!updateName) {
                  toast.warning("please enter name");
                } else if (!updatePhone) {
                  toast.warning("please enter phone");
                } else if (!updateEmail) {
                  toast.warning("please enter email");
                } else {
                  updateProfile();
                }
              }}
            >
              Submit
            </button>
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

export default MyProfile;
