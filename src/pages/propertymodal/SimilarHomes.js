import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../route/BaseUrl";

const SimilarHomes = ({ latCoordinates, longCoordinates }) => {
  const [schoolData, setSchoolData] = useState();
  const getSchoolData = async () => {
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      let url = `${BASE_URL}/api/property/nearby-schools?radius=${latCoordinates},${longCoordinates}&in_radius=25&limit=5`;

      const response = await fetch(url, requestAvtarOptions);
      const data = await response.json();

      setSchoolData(data?.schoolsData?.result?.schools);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSchoolData();
  }, [latCoordinates, longCoordinates]);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 3959;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  return (
    <>
      <section className="mb-3 similar_section_header">
        <div className="container">
          <div className="row">
            {schoolData?.map((data) => {
              return (
                <div className="col-lg-4 mt-5">
                  <div className="school_rating_div">
                    <div className="school_rating_one">
                      <p className="school_rating_para_one">
                        {data.rating ? data.rating : "A+"}
                      </p>
                    </div>
                    <div className="school_rating_two">
                      <p
                        className="school_rating_para_two"
                        onClick={() => {
                          window.open(data.url, "_blank");
                        }}
                      >
                        {data.name}
                      </p>
                      <p className="school_rating_para_three">
                        Grades: {data.gradeLow}-{data.gradeHigh}
                      </p>
                      <p>
                        Distance:{" "}
                        {getDistance(
                          latCoordinates,
                          longCoordinates,
                          data.coordinates.latitude,
                          data.coordinates.longitude
                        ).toFixed(1)}{" "}
                        mi
                      </p>
                    </div>
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

export default SimilarHomes;
