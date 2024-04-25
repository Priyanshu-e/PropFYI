import React, { useEffect, useState } from "react";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { BASE_URL } from "../../route/BaseUrl";

const Faq = () => {
  const [loading, setLaoding] = useState();
  const [faqDetails, setFaqDetails] = useState();
  const getFaqDetails = async () => {
    setLaoding(true);
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${BASE_URL}/api/website/get-faq`,
        requestAvtarOptions
      );

      const data = await response.json();

      console.log(data.data);
      setFaqDetails(data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getFaqDetails();
  }, []);
  return (
    <>
      <section ection className="help_section faq_section mobile_padding">
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
              <h1 className="help_text mb-5">Frequently asked questions</h1>
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                {faqDetails?.map((item, index) => {
                  return (
                    <div className="accordion-item" key={index}>
                      <h2
                        className="accordion-header"
                        id={`flush-heading${index + 1}`}
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${index + 1}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${index + 1}`}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={`flush-collapse${index + 1}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-collapse${index + 1}`}
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">{item.answer}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
