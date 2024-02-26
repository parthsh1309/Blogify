import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";

import React, { useEffect, useState } from "react";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import blogService from "../../databaseService/Blog";
import { useLocation } from "react-router-dom";
import BlogStructure from "./BlogStructure";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const activeParam = params.get("blog-category");
      blogService.getBlogs(false, activeParam||"All", 5,).then((res) => {
        if (!res) return;
        setBlogs(res.data);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [location]);

  const options = {
    type: "loop",
    gap: "1rem",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    height: "15rem",
  };

  return loading ? (
    <div>Loading...</div>
  ) : blogs.length ? (
    // if desktop
    <>
      <div className="sm:flex w-full h-90vh px-2 py-5 gap-3 hidden">
        <BlogStructure
          blogs={blogs[0]}
          classNamePrimary={"w-4/12"}
          classNameTitle={"text-2xl"}
          classNameDate={"text-sm font-bold"}
        />

        <div className="w-8/12 h-full flex flex-wrap">
          {blogs.map((blog, i) =>
            i === 0 ? null : (
              <BlogStructure
                blogs={blog}
                key={blog.uuid}
                classNamePrimary={"w-1/2 h-1/2 p-2"}
                classNameSecondary={"right-2 left-2/5"}
                classNameTitle={"text-xl"}
                classNameText={"text-sm"}
                classNameDate={"text-xs font-bold"}
              />
            )
          )}
        </div>
      </div>

      <div className="w-full h-50vh px-2 py-5 gap-3 mb-16 sm:hidden ">
        <div className="wrapper h-full">
          <Splide
            options={options}
            aria-labelledby="autoplay-example-heading"
            hasTrack={false}
            className="h-full"
          >
            <div style={{ position: "relative" }}>
              <SplideTrack className="h-50vh">
                {blogs.map((blog) => (
                  <SplideSlide key={blog.uuid}>
                    <BlogStructure
                      blogs={blog}
                      classNamePrimary={"w-full h-50vh flex-shrink-0 gap-2"}
                      classNameTitle={"text-xl"}
                      classNameDate={"text-sm font-bold"}
                    />
                  </SplideSlide>
                ))}
              </SplideTrack>
            </div>

            <div className="splide__progress">
              <div className="splide__progress__bar" />
            </div>
          </Splide>
        </div>
      </div>
    </>
  ) : (
    <div className="text-white text-3xl text-center p-5">No blogs found</div>
  );

  // if Mobile
}

export default Blog;
