import React, { useEffect, useState } from "react";
import "./otherpage.css";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { BASE_URL } from "../../route/BaseUrl";
import { useNavigate } from "react-router-dom";
import blog_banner from "../../images/otherpages/blog_banner.png";

const Blog = () => {
  const navigate = useNavigate();
  const [loading, setLaoding] = useState();

  //get blog data

  const [blog, setBlog] = useState();

  const getBlogData = async () => {
    setLaoding(true);
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      const response = await fetch(
        `${BASE_URL}/api/blogs/listing`,
        requestAvtarOptions
      );

      const data = await response.json();
      setBlog(data?.data);
    } catch (error) {
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const handleBlogDetailsClick = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section
        className="blog_banner_section mobile_padding"
        style={{ backgroundImage: `url(${blog_banner})` }}
      >
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
              <h1 className="blog_banner_heading">Our Latest Blog</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="blog_first_section">
        <div className="container">
          <div className="row">
            {blog?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-lg-4 mt-5 blog_div"
                  onClick={() => handleBlogDetailsClick(item.slug)}
                >
                  <div className="blog_sub_div">
                    <img
                      src={item.image}
                      className="blog_image"
                      alt={item.title}
                    />
                    <h3 className="blog_heading">{item.title}</h3>
                    <p
                      className="blog_para"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    <a className="blog_read_more" onClick={handleClick}>
                      Read More...
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
