import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Header from "../component/Header";
import Footer from "../component/Footer";
import PropertyModal from "../pages/propertymodal/PropertyModal";
import SellProperty from "../pages/sell/SellProperty";
import Profile from "../pages/auth/Profile";
import Blog from "../pages/otherpages/Blog";

import About from "../pages/otherpages/About";
import Help from "../pages/otherpages/Help";
import Faq from "../pages/otherpages/Faq";
import SingleBlog from "../pages/otherpages/SingleBlog";
import Mortgage from "../pages/mortgage/Mortgage";

import { BASE_URL } from "./BaseUrl";
import AppNotification from "../helper/AppNotification";
import Properties from "../pages/buy/Properties";
import Error from "../pages/otherpages/Error";
import DetailPage from "../pages/otherpages/DetailPage";
import { websiteSetting } from "../redux/slices/websiteSettingSlice";

import { useDispatch, useSelector } from "react-redux";
import WebsiteLoader from "../helper/WebsiteLoader";
const Routing = () => {
  const [loading, setLoading] = useState(true);
  const [cmsSlug, setCmsSlug] = useState();
  const getCmsDetails = async () => {
    try {
      const requestGetOptions = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      };
      const res = await fetch(
        `${BASE_URL}/api/cms/details-cms`,
        requestGetOptions
      );
      const cmsData = await res.json();

      setCmsSlug(cmsData?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const dispatch = useDispatch();

  const websiteSettingData = useSelector(
    (state) => state?.websiteSetting?.data?.data[0]
  );
  const [isLoginIn, setIsLogin] = useState();
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    const details = JSON.parse(userDetails);
    setIsLogin(details);
  }, []);
  useEffect(() => {
    dispatch(websiteSetting());
    getCmsDetails();
  }, [dispatch]);

  return (
    <>
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <BrowserRouter>
        {/* <AppNotification /> */}
        <Header />
        <Routes>
          <Route path="*" element={<Error />} />
          <Route path="/" element={<Home />} />
          <Route
            path={`/${websiteSettingData?.footer_home_links[1]?.home_link}`}
            element={<Properties />}
          />
          <Route
            path={`/${websiteSettingData?.footer_home_links[0]?.home_link}`}
            element={<SellProperty />}
          />
          <Route
            path="/profile"
            element={isLoginIn === null ? <Home /> : <Profile />}
          />
          <Route path="/blog" element={<Blog />} />

          {cmsSlug?.map((item, index) => {
            return (
              <Route
                key={index}
                path={`/${item.slug}`}
                element={<DetailPage slug={item.slug} />}
              />
            );
          })}
          <Route
            path={`/${websiteSettingData?.footer_home_links[3]?.home_link}`}
            element={<About />}
          />
          <Route path="/help" element={<Help />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog/:slug" element={<SingleBlog />} />
          <Route path="/mortgage" element={<Mortgage />} />

          <Route
            path="/properties/:singlePropertyId"
            element={<PropertyModal />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Routing;
