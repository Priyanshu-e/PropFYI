import React, { useEffect, useState } from "react";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { BASE_URL } from "../../route/BaseUrl";

const DetailPage = ({ slug }) => {
  const [loading, setLaoding] = useState();
  const [pageDetails, setPageDetails] = useState();
  const [pageTitle, setPageTitle] = useState("");

  const getThirdPartyDetailsData = async () => {
    setLaoding(true);
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${BASE_URL}/api/cms/cms-details/${slug}`,
        requestAvtarOptions
      );

      const data = await response.json();

      console.log(data?.data?.page_title);
      setPageTitle(data?.data?.page_title);
      setPageDetails(data?.data?.page_content);
    } catch (error) {
      console.error(error);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getThirdPartyDetailsData();
  }, [slug]);
  return (
    <>
      <section className="privacy_banner_section mobile_padding">
        {loading && (
          <section className="pre_loader">
            <div>
              <WebsiteLoader />
            </div>
          </section>
        )}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="privacy_banner_heading">{pageTitle}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="privacy_first_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="privacy_para"
                dangerouslySetInnerHTML={{ __html: pageDetails }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
