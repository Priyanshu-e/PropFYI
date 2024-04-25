import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../route/BaseUrl";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { PieChart } from "react-minimal-pie-chart";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import mapMarker from "../../images/buy/map-marker.svg";
import mapMarkerTwo from "../../images/buy/neighbour.svg";
import { Colors } from "./Style";

const NeighbourHoodDetails = ({
  latCoordinates,
  longCoordinates,
  city,
  state,
}) => {
  const [neighbourlData, setNeighbourlData] = useState();
  const [selectedShowData, setSelectedShowData] = useState();
  console.log(neighbourlData, "neighbourhood data");
  const getNeighbourHoodData = async () => {
    try {
      const requestAvtarOptions = {
        method: "GET",
      };

      let url = `${BASE_URL}/api/property/neighborhoods?radius=${latCoordinates},${longCoordinates}&in_radius=10&postalCity=${city}&state=${state}&pageSize=25&pageNumber=1`;

      const response = await fetch(url, requestAvtarOptions);
      const data = await response.json();
      // console.log(
      //   data?.neigborhoodData?.result?.neighborhoods,
      //   "Neighbourhood Data"
      // );
      setNeighbourlData(data?.neigborhoodData?.result?.neighborhoods);
    } catch (error) {
      console.error(error);
    }
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJ79HBANEvKnm6Jin3sxjD2E29tena1Ic",
  });
  useEffect(() => {
    getNeighbourHoodData();
  }, [latCoordinates, longCoordinates]);
  useEffect(() => {
    if (neighbourlData && neighbourlData.length > 0) {
      setSelectedShowData(neighbourlData[0]);
    }
  }, [neighbourlData]);
  return (
    <>
      <section
        className="neighbourhood_section"
        style={{ isplay: neighbourlData?.length > 0 ? "flex" : "none" }}
      >
        <div className="row  property_second_row">
          {/* {neighbourlData && neighbourlData.length > 0 && ( */}
          <>
            <div className="col-lg-12">
              {neighbourlData && neighbourlData.length > 0 && (
                <h2 className="speacial_heading">Neighborhood Details</h2>
              )}
              <div className="container mt-5 mb-5">
                <div className="row income_div">
                  <div className="col-lg-12 col-pad">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{
                          width: "100%",
                          height: "400px",
                          display: neighbourlData?.length > 0 ? "flex" : "none",
                        }}
                        center={{
                          lat: latCoordinates,
                          lng: longCoordinates,
                        }}
                        zoom={11}

                        // mapTypeId="satellite"
                      >
                        {neighbourlData?.length > 0 &&
                          neighbourlData?.map((data, index) => {
                            return (
                              <Marker
                                key={index}
                                position={{
                                  lat: data?.centroid?.latitude,
                                  lng: data?.centroid?.longitude,
                                }}
                                icon={{
                                  url: mapMarkerTwo,
                                  scaledSize: new window.google.maps.Size(
                                    40,
                                    40
                                  ),
                                  origin: new window.google.maps.Point(0, 0),
                                  anchor: new window.google.maps.Point(20, 40),
                                }}
                                className="marker_property"
                                onClick={() => {
                                  setSelectedShowData(data);
                                }}
                              />
                            );
                          })}
                      </GoogleMap>
                    ) : (
                      <></>
                    )}
                  </div>
                  {neighbourlData && neighbourlData.length > 0 && (
                    <>
                      <p className="neighbour_property_heading mt-5">
                        {selectedShowData?.label}
                      </p>
                      <div className="neighbour_span_div">
                        <p className="neighbour_span_para">
                          Average Person Media Age:{" "}
                          <span className="neighbour_span">
                            {selectedShowData?.age?.median} years old
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <div className="row mt-3  neighbour_row">
                          <h2 className="neighbour_property_heading_income">
                            Income
                          </h2>
                          <p className="neighbour_span_para">
                            Average Person Income is:{" "}
                            <span className="neighbour_span">
                              ${selectedShowData?.income?.average}
                            </span>
                          </p>
                          <div className="col-lg-6">
                            <div>
                              <p className="neighbourhood_para mt-4">
                                <span className="income_point color_15"></span>
                                {selectedShowData?.income?.percent0_15}% 0-15k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_25"></span>
                                {selectedShowData?.income?.percent15_25}%
                                15k-25k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_35"></span>
                                {selectedShowData?.income?.percent25_35}%
                                25k-35k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_50"></span>
                                {selectedShowData?.income?.percent35_50}%
                                35k-50k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_75"></span>
                                {selectedShowData?.income?.percent50_75}%
                                50k-75k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_100"></span>
                                {selectedShowData?.income?.percent75_100}%
                                75k-100k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_125"></span>
                                {selectedShowData?.income?.percent100_125}%
                                100k-125k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_150"></span>
                                {selectedShowData?.income?.percent125_150}%
                                125k-150k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_200"></span>
                                {selectedShowData?.income?.percent150_200}%
                                150k-200k
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_250"></span>
                                {selectedShowData?.income?.percent200_up}%
                                up200k
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 graph_col">
                            <PieChart
                              style={{
                                width: "300px",
                              }}
                              data={[
                                {
                                  title: "0-15k",
                                  value:
                                    selectedShowData?.income?.percent0_15 || 0,
                                  color: "#C96F3B",
                                },
                                {
                                  title: "15k-25k",
                                  value:
                                    selectedShowData?.income?.percent15_25 || 0,
                                  color: "#F0AC84",
                                },
                                {
                                  title: "25k-35k",
                                  value:
                                    selectedShowData?.income?.percent25_35 || 0,
                                  color: "#FF8A00",
                                },
                                {
                                  title: "35k-50k",
                                  value:
                                    selectedShowData?.income?.percent35_50 || 0,
                                  color: "#FD5E0D",
                                },
                                {
                                  title: "50k-75k",
                                  value:
                                    selectedShowData?.income?.percent50_75 || 0,
                                  color: "#E88504",
                                },
                                {
                                  title: "75k-100k",
                                  value:
                                    selectedShowData?.income?.percent75_100 ||
                                    0,
                                  color: "rgb(0, 106, 255)",
                                },
                                {
                                  title: "100k-125k",
                                  value:
                                    selectedShowData?.income?.percent100_125 ||
                                    0,
                                  color: "rgb(135, 178, 255)",
                                },
                                {
                                  title: "125k-150k",
                                  value:
                                    selectedShowData?.income?.percent125_150 ||
                                    0,
                                  color: "#3DB2FF",
                                },
                                {
                                  title: "150k-200k",
                                  value:
                                    selectedShowData?.income?.percent150_200 ||
                                    0,
                                  color: "#59D5E0",
                                },
                                {
                                  title: "upto 200k",
                                  value:
                                    selectedShowData?.income?.percent200_up ||
                                    0,
                                  color: "#CDCDCD",
                                },
                              ]}
                              lineWidth={100}
                              radius={40}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row mt-3 neighbour_row">
                          <h2 className="neighbour_property_heading_income">
                            Education
                          </h2>

                          <div className="col-lg-6 education_col">
                            <div>
                              <p className="neighbourhood_para ">
                                <span className="income_point color_15"></span>
                                {selectedShowData?.education?.highschool}%
                                Highschool
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_25"></span>
                                {selectedShowData?.education?.associate}%
                                Associate
                              </p>

                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_50"></span>
                                {selectedShowData?.education?.bachelor}%
                                Bachelor
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_35"></span>
                                {selectedShowData?.education?.graduate}%
                                Graduate
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 graph_col">
                            <PieChart
                              style={{
                                width: "300px",
                              }}
                              data={[
                                {
                                  title: "0-15k",
                                  value:
                                    selectedShowData?.education?.highschool ||
                                    0,
                                  color: "#C96F3B",
                                },
                                {
                                  title: "15k-25k",
                                  value:
                                    selectedShowData?.education?.associate || 0,
                                  color: "#F0AC84",
                                },
                                {
                                  title: "25k-35k",
                                  value:
                                    selectedShowData?.education?.bachelor || 0,
                                  color: "#FF8A00",
                                },
                                {
                                  title: "35k-50k",
                                  value:
                                    selectedShowData?.education?.graduate || 0,
                                  color: "#FD5E0D",
                                },
                              ]}
                              lineWidth={100}
                              radius={40}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row mt-3 neighbour_row">
                          <h2 className="neighbour_property_heading_income">
                            Employment
                          </h2>

                          <div className="col-lg-6 education_col">
                            <div>
                              <p className="neighbourhood_para mt-4">
                                <span className="income_point color_15"></span>
                                {selectedShowData?.employment?.accommodations}%
                                Accommodations
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_25"></span>
                                {selectedShowData?.employment?.administration}%
                                Administration
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_35"></span>
                                {selectedShowData?.employment?.agriculture}%
                                Agriculture
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_50"></span>
                                {selectedShowData?.employment?.arts}% Arts
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_75"></span>
                                {selectedShowData?.employment?.construction}%
                                Construction
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_100"></span>
                                {selectedShowData?.employment?.education}%
                                Education
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_125"></span>
                                {selectedShowData?.employment?.finance}% Finance
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_150"></span>
                                {selectedShowData?.employment?.government}%
                                Government
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_200"></span>
                                {selectedShowData?.employment?.healthcare}%
                                Healthcare
                              </p>
                              <p className="neighbourhood_para">
                                <span className="income_point color_250"></span>
                                {selectedShowData?.employment?.management}%
                                Management
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 graph_col">
                            <PieChart
                              style={{
                                width: "300px",
                              }}
                              data={[
                                {
                                  title: "accommodations",
                                  value:
                                    selectedShowData?.employment
                                      ?.accommodations || 0,
                                  color: "#C96F3B",
                                },
                                {
                                  title: "administration",
                                  value:
                                    selectedShowData?.employment
                                      ?.administration || 0,
                                  color: "#F0AC84",
                                },
                                {
                                  title: "agriculture",
                                  value:
                                    selectedShowData?.employment?.agriculture ||
                                    0,
                                  color: "#FF8A00",
                                },
                                {
                                  title: "arts",
                                  value:
                                    selectedShowData?.employment?.arts || 0,
                                  color: "#FD5E0D",
                                },
                                {
                                  title: "construction",
                                  value:
                                    selectedShowData?.employment
                                      ?.construction || 0,
                                  color: "#E88504",
                                },
                                {
                                  title: "education",
                                  value:
                                    selectedShowData?.employment?.education ||
                                    0,
                                  color: "rgb(0, 106, 255)",
                                },
                                {
                                  title: "finance",
                                  value:
                                    selectedShowData?.employment?.finance || 0,
                                  color: "rgb(135, 178, 255)",
                                },
                                {
                                  title: "government",
                                  value:
                                    selectedShowData?.employment?.government ||
                                    0,
                                  color: "#3DB2FF",
                                },
                                {
                                  title: "healthcare",
                                  value:
                                    selectedShowData?.employment?.healthcare ||
                                    0,
                                  color: "#59D5E0",
                                },
                                {
                                  title: "management",
                                  value:
                                    selectedShowData?.employment?.management ||
                                    0,
                                  color: "#CDCDCD",
                                },
                              ]}
                              lineWidth={100}
                              radius={40}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row mt-3 neighbour_row">
                          <h2 className="neighbour_property_heading_income">
                            HouseHold
                          </h2>

                          <div className="col-lg-6 education_col">
                            <div>
                              <p className="neighbourhood_para ">
                                <span className="income_point color_15"></span>
                                {
                                  selectedShowData?.households?.occupancy
                                    ?.children
                                }
                                % Children
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_25"></span>
                                {
                                  selectedShowData?.households?.occupancy
                                    ?.families
                                }
                                % Families
                              </p>

                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_50"></span>
                                {
                                  selectedShowData?.households?.occupancy
                                    ?.married
                                }
                                % Married
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_35"></span>
                                {selectedShowData?.households?.occupancy?.owned}
                                % Owned Houser
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_75"></span>
                                {
                                  selectedShowData?.households?.occupancy
                                    ?.rented
                                }
                                % Rented House
                              </p>
                              <p className="neighbourhood_para mt-2">
                                <span className="income_point color_100"></span>
                                {
                                  selectedShowData?.households?.occupancy
                                    ?.vacant
                                }
                                % Vacant House
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 graph_col">
                            <PieChart
                              style={{
                                width: "300px",
                              }}
                              data={[
                                {
                                  title: "children",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.children || 0,
                                  color: "#C96F3B",
                                },
                                {
                                  title: "families",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.families || 0,
                                  color: "#F0AC84",
                                },
                                {
                                  title: "married",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.married || 0,
                                  color: "#FF8A00",
                                },
                                {
                                  title: "owned",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.owned || 0,
                                  color: "#FD5E0D",
                                },
                                {
                                  title: "rented",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.rented || 0,
                                  color: "#E88504",
                                },
                                {
                                  title: "vacant",
                                  value:
                                    selectedShowData?.households?.occupancy
                                      ?.vacant || 0,
                                  color: "rgb(0, 106, 255)",
                                },
                              ]}
                              lineWidth={100}
                              radius={40}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
          {/* )} */}
        </div>
      </section>
    </>
  );
};

export default NeighbourHoodDetails;
