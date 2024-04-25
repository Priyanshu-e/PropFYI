import React, { useEffect, useState } from "react";
import "../mortgage/mortgage.css";
import mortgageBanner from "../../images/mortgage/mortgage_banner.png";
import Select from "react-select";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
import { BASE_URL } from "../../route/BaseUrl";
import WebsiteLoader from "../../helper/WebsiteLoader";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Mortgage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

  const dummyData = [
    { value: "30 ", label: "30 Years" },
    { value: "20 ", label: "20 Years" },
    { value: "15", label: "15 Years" },
    { value: "10", label: "10 Years" },
  ];

  const [price, setPrice] = useState("400000");
  const [percent, setPercent] = useState("20");

  const [propertyTax, setPropertyTax] = useState('280');
  const [homeInsurance, setHomeInsurance] = useState('66');
  const [hoa, setHoa] = useState('0');

  const initialPrice = price;
  const initialPercent = percent;
  const initialAmount = (
    (parseFloat(initialPrice) * parseFloat(initialPercent)) /
    100
  ).toFixed(0);

  const [amount, setAmount] = useState(initialAmount);
  const [annualIntrestRate, setAnnualIntrestRate] = useState("6.88");
  const [loanTerm, setLoanTerm] = useState(dummyData[0]);

  // useEffect(() => {
  //   const calculatedAmount = (price * percent) / 100;
  //   setAmount(calculatedAmount.toFixed(0));
  // });

  useEffect(() => {
    // Calculate initial amount based on default values
    const calculatedAmount = (price * percent) / 100;
    setAmount(calculatedAmount);
  }, []); // Run only once on component mount to calculate initial amount

  // Handle change in total price input
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
    if (value !== '') {
      const calculatedAmount = ((parseFloat(value) * parseFloat(percent)) / 100);
      setAmount(calculatedAmount);
    } else {
      setAmount('');
    }
  };

    // Handle change in price input
    const handleAmountChange = (e) => {
      const value = e.target.value;
      setAmount(value);
      if (value !== '') {
        const calculatedPercent = parseFloat(value) / parseFloat(price) * 100;
        setPercent(calculatedPercent.toFixed(2));
      } else {
        setPercent('');
      }
    };

  // Handle change in percent input
  const handlePercentChange = (e) => {
    const value = e.target.value;
    setPercent(value);
    if (value !== '') {
      const calculatedAmount =((parseFloat(price) * parseFloat(value)) / 100);
      setAmount(calculatedAmount);
    } else {
      setAmount('');
    }
  };

  const calculateMortage = async () => {
    const url = new URL("https://api.api-ninjas.com/v1/mortgagecalculator");
    url.searchParams.append("interest_rate", annualIntrestRate);
    url.searchParams.append("home_value", price);
    url.searchParams.append("downpayment", parseFloat(amount));
    url.searchParams.append("duration_years", parseFloat(loanTerm?.value));
    url.searchParams.append("annual_property_tax", propertyTax);
    // url.searchParams.append("annual_property_tax", price * (1.7 / 100));
    url.searchParams.append("annual_home_insurance", homeInsurance);
    url.searchParams.append("monthly_hoa", parseFloat(hoa));

    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": "S0uP7v1uafVC2+1MWNTlmg==rZuu3naXemu6jic3",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    try {
      const response = await fetch(url, options);
      console.log(response, "response");
      // return false;
      if (response.status === 200) {
        const data = await response.json();
        console.log(data, "response dataa======================");
        setMortageData(data);
      } else {
        console.error("Error----------------------:", response.statusText);
      }
    } catch (error) {
      console.error("Error+++++++++++++++++++++++++:", error);
    } finally {
      setLoading(false);
    }
  };
  const [mortageData, setMortageData] = useState();
  // const data = [
  //   {
  //     title: "Estimated Monthly Principal & Interest",
  //     value: mortageData?.monthly_payment?.mortgage,
  //     color: "#C96F3B",
  //   },
  //   {
  //     title: "Estimated Monthly Property Tax",
  //     value: mortageData?.monthly_payment?.property_tax,
  //     color: "#E88504",
  //   },
  //   { title: "Agent", value: 200, color: "#F0AC84" },
  //   { title: "Agent", value: 200, color: "#FD5E0D" },
  // ];

  const data = [
    {
      title: "Principal & Interest",
      value: mortageData?.monthly_payment?.mortgage, 
      color: "#C96F3B",
    },
    {
      title: "HOA Fees",
      value: mortageData?.monthly_payment?.hoa, 
      color: "#E88504",
    },
    { title: "Property Tax", 
      value: mortageData?.annual_payment?.property_tax,
      color: "#F0AC84" 
    },
    { 
      title: "Homeowner's insurance", 
      value: mortageData?.annual_payment?.home_insurance, 
      color: "#FD5E0D" 
    },
  ];

  const labelFormatter = (value) => {
    return `$${value} `;
  };
  useEffect(() => {
    calculateMortage();
  }, []);

  //get mortage data
  const [faq, setFaq] = useState();
  const getFaqDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/website/get-faq`,

        {
          params: {
            type: "mortgage",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = response.data;

      console.log(data.data, "Mortgage");
      setFaq(data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  //mortage contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const saveEnquiry = async () => {
    const helpData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      source_page: "mortgage",
    };
    console.log(helpData);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(helpData),
    };
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/website/register-contact-enquiry`,
        requestOptions
      );
      const result = await response.json();

      if (result.status == "failed") {
        toast.warning(result?.errors[0]);
      } else {
        toast.success(result?.message);
        window.open(
          "https://myloan.minutemortgage.com/becker@propfyi.com",
          "_blank"
        );
        console.log(result);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch (error) {
      toast.warning("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFaqDetails();
  }, []);

  return (
    <>
      {loading && (
        <section className="pre_loader">
          <div>
            <WebsiteLoader />
          </div>
        </section>
      )}
      <section
        className="mortgage_first_section"
        style={{ backgroundImage: `url(${mortgageBanner})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
              <div className="approved_div">
                <h2 className="approved_heading">
                  Get Pre-Approved in Minutes
                </h2>
              </div>
              <div className="mortgage_form">
                <div className="row">
                  <div className="col-lg-12">
                    <input
                      type="text"
                      className="mortgage_name_text focus"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 top_margin">
                    <input
                      type="text"
                      className="mortgage_name_text focus"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 top_margin">
                    <input
                      type="text"
                      className="mortgage_name_text focus"
                      placeholder="Email ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 top_margin">
                    <textarea
                      className="mortgage_name_text focus"
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 top_margin">
                    <button
                      className="carousel_btn mortgage_btn"
                      onClick={() => {
                        if (!name || !email || !phone || !message) {
                          toast.warning("enter the require field");
                        } else {
                          saveEnquiry();
                        }
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="col-lg-12">
                    <p className="mortgage_disclaimer_para">
                      <span>Disclaimer </span>: is simply dummy text of the
                      printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3"></div>
          </div>
        </div>
      </section>
      <section className="calculator_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <h2 className="mortage_heading">Mortgage</h2>
              <p className="mortgage_disclaimer_para">
                Estimate your monthly mortgage payment and property taxes based
                on past rates.
              </p>

              <div>
                <p className="mortage_lable">Home Price ($)</p>
                <input
                  type="number"
                  className="mortage_input"
                  value={price}
                  // onChange={(e) => setPrice(e.target.value)}
                  onChange={handlePriceChange}
                ></input>
              </div>
              <div>
                <p className="mortage_lable mt-2">Down Payment</p>
                <div className="row">
                  <div className="col-lg-7">
                    <p className="mortage_sublable">Amount($)</p>
                    <input
                      type="number"
                      className="mortage_input"
                      value={amount}
                      // onChange={(e) => setAmount(e.target.value)}
                      onChange={handleAmountChange}
                    ></input>
                  </div>
                  <div className="col-lg-1"></div>
                  <div className="col-lg-4">
                    <p className="mortage_sublable">Percentage(%) </p>
                    <input
                      type="number"
                      className="mortage_input"
                      min="1"
                      max="99"
                      value={percent}
                      // onChange={(e) => setPercent(e.target.value)}
                      onChange={handlePercentChange}
                    ></input>
                  </div>
                </div>
              </div>
              <div>
                <p className="mortage_lable mt-2">Loan Term</p>
                <Select
                  className="sale_dropdown_mortage mt-3"
                  options={dummyData}
                  value={loanTerm}
                  onChange={(selectedOption) => setLoanTerm(selectedOption)}
                ></Select>
              </div>
              <div>
                <p className="mortage_lable mt-2">
                  Annual Interest Rate (%)
                </p>
                <input
                  type="number"
                  className="mortage_input"
                  value={annualIntrestRate}
                  onChange={(e) => setAnnualIntrestRate(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="mortage_lable mt-2">
                  Property Tax ($)
                </p>
                <input
                  type="number"
                  className="mortage_input"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="mortage_lable mt-2">
                  Home Insurance ($)
                </p>
                <input
                  type="number"
                  className="mortage_input"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="mortage_lable mt-2">
                  HOA Dues ($)
                </p>
                <input
                  type="number"
                  className="mortage_input"
                  value={hoa}
                  onChange={(e) => setHoa(e.target.value)}
                ></input>
              </div>
              <button
                className="carousel_btn mortgage_btn mt-4"
                onClick={() => {
                  calculateMortage();
                }}
              >
                Calculate
              </button>
            </div>
            <div className="col-lg-7 piechart">
            <div>
                <p className="mortage_lable mt-2">
                  Principal & Interest (P & I): ${mortageData?.monthly_payment?.mortgage}
                </p>
                <p className="mortage_lable mt-2">
                  Property Tax: ${mortageData?.annual_payment?.property_tax}
                </p>
                <p className="mortage_lable mt-2">
                  Homeowner's insurance: ${homeInsurance}
                </p>
                <p className="mortage_lable mt-2">
                  HOA Fees: ${hoa}
                </p>
              </div>
              <PieChart
                style={{
                  width: "400px",
                  height: "400px",
                  margin: "0 auto",
                }}
                data={data}
                lineWidth={30}
                radius={40}
                label={({ dataEntry }) => {
                  if (
                    dataEntry.title === "Principal & Interest"
                  ) {
                    const annualPayment =  mortageData?.monthly_payment?.mortgage +
                    mortageData?.annual_payment?.property_tax +
                    mortageData?.annual_payment?.home_insurance +
                    mortageData?.monthly_payment?.hoa+ "/mo"
                    return "$"+ annualPayment;
                  } else {
                    return "";
                  }
                }}
                labelStyle={(index) => ({
                  fontSize: "8px",
                  fontFamily: "sans-serif",
                  fontWeight: 500,
                  fill: "#424242",
                })}
                labelPosition={0}
              />
            </div>
          </div>
        </div>
      </section>
      <section ection className="help_section faq_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="help_text mb-5">
                Frequently asked questions about mortgages
              </h1>
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                {faq?.map((item, index) => {
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
    </>
  );
};

export default Mortgage;
