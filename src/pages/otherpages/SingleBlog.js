import React, { useEffect, useState } from "react";
import "./otherpage.css";
import { useLocation } from "react-router-dom";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { BASE_URL } from "../../route/BaseUrl";
import { useParams } from "react-router-dom";

const SingleBlog = () => {
  const [loading, setLaoding] = useState();
  const { slug } = useParams();
  console.log(slug);
  const [blogDetails, setBlogDetails] = useState();
  const getSingleBlogDetails = async () => {
    setLaoding(true);
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${BASE_URL}/api/blogs/blog-details/${slug}`,
        requestAvtarOptions
      );

      const data = await response.json();

      console.log(data?.data?.blog);
      setBlogDetails(data?.data?.blog);
    } catch (error) {
      console.error(error);
    } finally {
      setLaoding(false);
    }
  };
  const formattedDate = blogDetails?.updated_at
    ? new Date(blogDetails.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : null;

  useEffect(() => {
    getSingleBlogDetails();
  }, []);
  return (
    <>
      <section className="single_blog_banner_section mobile_padding">
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
              <h1 className="blog_banner_heading">{blogDetails?.title}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="blog_first_section">
        <div className="container">
          <div className="row">
            <img src={blogDetails?.image} className="single_blog_image" />
            <div className="heading_div">
              <h1 className="single_blog_heading">{blogDetails?.title}</h1>
              <p className="blog_data_p">
                <span className="blog_data_span">Date </span>: {formattedDate}
              </p>
            </div>
            <p
              className="single_blog_para mt-4"
              dangerouslySetInnerHTML={{ __html: blogDetails?.content }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlog;
