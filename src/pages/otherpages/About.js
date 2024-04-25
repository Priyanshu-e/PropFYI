import React, { useEffect, useState } from "react";
import aboutImage from "../../images/otherpages/about_banner.png";
import aboutFirstImage from "../../images/otherpages/about-first-image.png";
import WebsiteLoader from "../../helper/WebsiteLoader";
import aboutSecondImage from "../../images/otherpages/about-second-image.png";
import { BASE_URL } from "../../route/BaseUrl";

const About = () => {
  const [loading, setLaoding] = useState();
  const [aboutData, setAboutData] = useState();
  const getAboutUsdata = async () => {
    try {
      setLaoding(true);
      const requestAboutOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${BASE_URL}/api/website/about-us`,
        requestAboutOptions
      );

      const data = await response.json();
      console.log(data?.data, "dslf");
      setAboutData(data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getAboutUsdata();
  }, []);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const description = aboutData?.sections[0]?.section_description;
    if (!description) return null;

    const words = description.split(" ");
    const truncatedDescription = words.slice(0, 50).join(" ");
    const remainingDescription = words.slice(50).join(" ");

    return (
      <p className="about_last_para mt-3">
        {showFullDescription ? description : truncatedDescription}
        {!showFullDescription && (
          <a className="about_a" onClick={toggleDescription}>
            Read more...
          </a>
        )}
        {showFullDescription && (
          <span>
            {remainingDescription}
            <a className="about_a" onClick={toggleDescription}>
              Read less...
            </a>
          </span>
        )}
      </p>
    );
  };

  const [showFullDescriptionTwo, setShowFullDescriptionTwo] = useState(false);

  const toggleDescriptionTwo = () => {
    setShowFullDescriptionTwo(!showFullDescriptionTwo);
  };

  const renderDescriptionTwo = () => {
    const description = aboutData?.sections[1]?.section_description;
    if (!description) return null;

    const words = description.split(" ");
    const truncatedDescription = words.slice(0, 50).join(" ");
    const remainingDescription = words.slice(50).join(" ");

    return (
      <p className="about_last_para mt-3">
        {showFullDescriptionTwo ? description : truncatedDescription}
        {!showFullDescriptionTwo && (
          <a className="about_a" onClick={toggleDescriptionTwo}>
            Read more...
          </a>
        )}
        {showFullDescriptionTwo && (
          <span>
            {remainingDescription}
            <a className="about_a" onClick={toggleDescriptionTwo}>
              Read less...
            </a>
          </span>
        )}
      </p>
    );
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
      <section className="about_banner_section mobile_padding ">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 about_page_col">
              <div>
                <h1 className="about_banner_heading">
                  {aboutData?.about_us?.hero_title}
                </h1>
                <h3 className="about_banner_subheading">
                  {aboutData?.about_us?.hero_sub_title}
                </h3>
                <p className="about_banner_para">
                  {aboutData?.about_us?.hero_description}
                </p>
              </div>
            </div>
            <div className="col-lg-6 about_page_col_2">
              <img
                src={aboutData?.about_us?.hero_image}
                className="about_banner_image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="about_second_section_heading">
                {aboutData?.about_us?.main_title}
              </h1>
              <p
                className="privacy_para mt-5 text-center"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.about_us?.main_description,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="about_banner_section ">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6 ">
              <img
                src={aboutData?.sections[0]?.section_image}
                className="about_banner_first_image"
              />
            </div>
            <div className="col-lg-6 about_page_col">
              <div>
                <h1 className="about_last_heading">
                  {aboutData?.sections[0]?.section_title}
                </h1>

                {renderDescription()}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="about_banner_section ">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-6 about_page_col">
              <div>
                <h1 className="about_last_heading">
                  {aboutData?.sections[1]?.section_title}
                </h1>

                {renderDescriptionTwo()}
              </div>
            </div>
            <div className="col-lg-6 ">
              <img
                src={aboutData?.sections[1]?.section_image}
                className="about_banner_second_image"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
