import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { BASE_URL } from "../../route/BaseUrl";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SavedSearch = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const [searchData, setSearchData] = useState();
  //saved search
  const getSaveSearchData = async () => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString).token;

    try {
      setLoading(true);
      const requestSavedOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userDetails}`,
        },
      };

      const response = await fetch(
        `${BASE_URL}/api/property/saved-searches`,
        requestSavedOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const data = await response.json();
        setSearchData(data?.data);
        console.log(data?.data, "_--------------------------");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //delete search
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const deleteSaveSearch = async (id) => {
    const userDetailsString = localStorage.getItem("userDetails");
    const userDetails = JSON.parse(userDetailsString)?.token;

    if (!userDetails) {
      toast.warning("Please login First");
    } else {
      const deleteSavedSearch = {
        id: id,
      };

      console.log(deleteSavedSearch);

      const deleteSavedSearchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userDetails}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(deleteSavedSearch).toString(),
      };
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/property/delete-search`,
          deleteSavedSearchOptions
        );
        const result = await response.json();
        if (result.result == "failed") {
          console.log(result.message);
        } else {
          toast.success("Saved search delete successfully");
          console.log(result.message);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
      getSaveSearchData();
    }
  };

  useEffect(() => {
    getSaveSearchData();
  }, []);
  return (
    <section>
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      {searchData?.length == 0 ? (
        <p className="dont_like_message">You didn't have any search !!</p>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            {searchData?.map((item) => {
              return (
                <>
                  <div
                    className="saved_col mt-3"
                    onClick={() => {
                      window.location.href = `/properties?${item.route}`;
                    }}
                  >
                    <div className="saved_first_div">
                      <div>
                        <HiMagnifyingGlassPlus className="magnifying" />
                      </div>
                      <div>
                        <p className="saved_title">{item?.name}</p>
                        <p className="sale_title">
                          {item?.parameters?.property_type}
                        </p>
                      </div>
                    </div>
                    <div className="delete_releative_div">
                      <MdDelete
                        className="delete_icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedId(item.id);

                          setShowDelete(true);
                        }}
                      />
                      {showDelete && selectedId === item.id && (
                        <div className="delete_search_modal">
                          <div>
                            <p className="delete_para">
                              Are you really want to delete?
                            </p>
                          </div>
                          <div className="button_delete_modal_div">
                            <button
                              className="button_delete_modal"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSaveSearch(selectedId);
                                setShowDelete(false);
                              }}
                            >
                              Yes
                            </button>
                            <button
                              className="button_delete_modal_two"
                              onClick={() => {
                                setShowDelete(false);
                              }}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}

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

export default SavedSearch;
