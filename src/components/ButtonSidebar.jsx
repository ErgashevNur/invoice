import { IoAddOutline } from "react-icons/io5";
import AddItemList from "./AddItemList";
import { useEffect, useState } from "react";
import { addData } from "../addData/index";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { SiNetdata } from "react-icons/si";

export const InvoiceForm = ({ data, setData }) => {
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [streetAddressTwo, setStreetAddressTwo] = useState("");
  const [cityTwo, setCityTwo] = useState("");
  const [postCodeTwo, setPostCodeTwo] = useState("");
  const [countryTwo, setCountryTwo] = useState("");
  const [date, setDate] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("Next 1 day");
  const [project, setProject] = useState("");
  const [items, setItems] = useState([]);
  console.log(data);

  const navigate = useNavigate();

  function validate() {
    if (!streetAddress) {
      toast.error("Please enter Street Address!");
      return false;
    } else if (streetAddress.length < 3) {
      toast.error("Street Address must be at least 3 characters long!");
      return false;
    }

    if (!city) {
      toast.error("Please enter City!");
      return false;
    } else if (city.length < 3) {
      toast.error("City must be at least 3 characters long!");
      return false;
    }

    if (!postCode) {
      toast.error("Please enter Post Code!");
      return false;
    } else if (postCode.length < 3) {
      toast.error("Post Code must be at least 3 characters long!");
      return false;
    }

    if (!country) {
      toast.error("Please enter Country!");
      return false;
    } else if (country.length < 3) {
      toast.error("Country must be at least 3 characters long!");
      return false;
    }

    if (!clientName) {
      toast.error("Please enter Client Name!");
      return false;
    } else if (clientName.length < 3) {
      toast.error("Client Name must be at least 3 characters long!");
      return false;
    }

    if (!clientEmail) {
      toast.error("Please enter Client Email!");
      return false;
    } else if (!clientEmail.endsWith("@gmail.com")) {
      toast.error("The Email address must end with `@gmail.com`");
      return false;
    }

    if (!streetAddressTwo) {
      toast.error("Please enter Street Address!");
      return false;
    } else if (streetAddressTwo.length < 3) {
      toast.error("Street Address must be at least 3 characters long!");
      return false;
    }

    if (!cityTwo) {
      toast.error("Please enter City!");
      return false;
    } else if (cityTwo.length < 3) {
      toast.error("City must be at least 3 characters long!");
      return false;
    }

    if (!postCodeTwo) {
      toast.error("Please enter Post Code!");
      return false;
    } else if (postCodeTwo.length < 3) {
      toast.error("Post Code must be at least 3 characters long!");
      return false;
    }

    if (!countryTwo) {
      toast.error("Please enter Country!");
      return false;
    } else if (countryTwo.length < 3) {
      toast.error("Country must be at least 3 characters long!");
      return false;
    }

    if (!date) {
      toast.error("Please enter date");
      return false;
    }

    if (!project) {
      toast.error("Please enter date");
      return false;
    } else if (project.length < 3) {
      toast.error("Project must be at least 3 characters long");
      return false;
    }

    return true;
  }

  function handleDraftInvoice(event) {
    event.preventDefault();

    let isValid = validate();
    if (!isValid) {
      return;
    }

    function generateId() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "12345678910";
      let idd = "";

      for (let i = 0; i < 6; i++) {
        if (Math.random() < 0.5) {
          idd += letters[Math.floor(Math.random() * letters.length)];
        } else {
          idd += numbers[Math.floor(Math.random() * numbers.length)];
        }
      }

      return idd;
    }

    let newInvoice = {
      idd: generateId(),
      status: "draft",
      senderAddress: {
        street: streetAddress,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientName: clientName,
      clientEmail: clientEmail,
      clientAddress: {
        street: streetAddressTwo,
        city: cityTwo,
        postCode: postCodeTwo,
        country: countryTwo,
      },
      paymentDue: paymentTerm,
      createdAt: date,
      description: project,
      items: items,
      total: items.reduce(
        (sum, item) => sum + Number(item.qty) * Number(item.price),
        0
      ),
    };
    axios
      .post("https://json-api.uz/api/project/Invoice/data", newInvoice, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        toast.success("Invoice added successfully! ");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Api da xatolikka duch keldingiz!");
        console.log(error);
      });
  }

  function handleAddInvoice(e) {
    e.preventDefault();

    let isValid = validate();
    if (!isValid) {
      return;
    }

    function generateId() {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "12345678910";
      let idd = "";

      for (let i = 0; i < 6; i++) {
        if (Math.random() < 0.5) {
          idd += letters[Math.floor(Math.random() * letters.length)];
        } else {
          idd += numbers[Math.floor(Math.random() * numbers.length)];
        }
      }

      return idd;
    }

    let newInvoice = {
      idd: generateId(),
      status: "pending",
      senderAddress: {
        street: streetAddress,
        city: city,
        postCode: postCode,
        country: country,
      },
      clientName: clientName,
      clientEmail: clientEmail,
      clientAddress: {
        street: streetAddressTwo,
        city: cityTwo,
        postCode: postCodeTwo,
        country: countryTwo,
      },
      paymentDue: paymentTerm,
      createdAt: date,
      description: project,
      items: items,
      total: items.reduce(
        (sum, item) => sum + Number(item.qty) * Number(item.price),
        0
      ),
    };
    axios
      .post("https://json-api.uz/api/project/Invoice/data", newInvoice, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        toast.success("Invoice added successfully! ");
        window.location.reload();
      })
      .catch((error) => {
        toast.error("Api da xatolikka duch keldingiz!");
        console.log(error);
      });
  }

  return (
    <div className="drawer max-w-[300px]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn bg-[#7C5DFA] hover:bg-[#6349ca] w-32 text-white md:w-40 rounded-full flex md:justify-between pl-2 pr-6 drawer-button"
        >
          <span className="rounded-full w-6 h-6 bg-white">
            <IoAddOutline className="w-full h-full text-[#7C5DFA] font-bold" />
          </span>
          <span className="hidden md:flex"> New Invoice</span>
          <span className="md:hidden">New</span>
        </label>
      </div>
      <div className="drawer-side lg:ml-[80px] z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu p-0 bg-white sidebarr text-base-content min-h-full pt-[56px] xl:ml-3 md:w-[616px] lg:w-[700px]">
          <form>
            <div className="px-8">
              <h1 className="text-2xl font-bold mb-12 ">New Invoice</h1>
              <div className="">
                <h3 className="text-primary text-sm font-bold mb-6">
                  Bill From
                </h3>

                <div className="mb-6 ">
                  <label className="block font-normal text-light2 text-sm mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-md border font-bold buttons border-gray-600"
                    name="senderStreet"
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-12">
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                      name="senderCity"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Post Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                      name="senderPostcode"
                      value={postCode}
                      onChange={(e) => {
                        setPostCode(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                      name="senderCountry"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-primary text-sm font-bold mb-6">
                    Bill To
                  </h3>
                  <label className="block font-normal text-light2 text-sm mb-2 border-gray-600">
                    Client's Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 buttons rounded-md font-bold border border-gray-600"
                    name="clientName"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-normal text-light2 text-sm mb-2">
                    Client's Email
                  </label>
                  <input
                    type="email"
                    className="w-full border buttons p-3 font-bold rounded-md border-gray-600"
                    name="clientEmail"
                    value={clientEmail}
                    onChange={(e) => {
                      setClientEmail(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-normal text-light2 text-sm mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-md border font-bold buttons border-gray-600"
                    name="clientStreet"
                    value={streetAddressTwo}
                    onChange={(e) => {
                      setStreetAddressTwo(e.target.value);
                    }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-12">
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                      name="clientCity"
                      value={cityTwo}
                      onChange={(e) => {
                        setCityTwo(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Post Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                      name="clientPostcode"
                      value={postCodeTwo}
                      onChange={(e) => {
                        setPostCodeTwo(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                      name="clientCountry"
                      value={countryTwo}
                      onChange={(e) => {
                        setCountryTwo(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2  gap-6 mb-6">
                  <div className="w-full ">
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Project Description
                    </label>
                    <input
                      type="date"
                      className="w-full border cursor-pointer buttons p-3 rounded-md font-bold border-gray-600"
                      name="date"
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>

                  <div className="w-full">
                    <label className="block font-normal text-light2 text-sm mb-2">
                      Payment Terms
                    </label>
                    <select
                      value={paymentTerm}
                      onChange={(e) => {
                        setPaymentTerm(e.target.value);
                      }}
                      className="w-full inputs bg-inherit cursor-pointer border buttons font-bold rounded-md border-gray-600 p-4"
                    >
                      <option>Filter by status</option>
                      <option>Next 1 day</option>
                      <option>Next 7 days</option>
                      <option>Next 14 days</option>
                      <option>Next 30 days</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-normal  text-light2 text-sm mb-2">
                    Project Description
                  </label>
                  <input
                    type="text"
                    className="w-full border buttons p-3 rounded-md font-bold border-gray-600"
                    name="description"
                    value={project}
                    onChange={(e) => {
                      setProject(e.target.value);
                    }}
                  />
                </div>

                <AddItemList />
              </div>
            </div>

            <div className="flex justify-between gap-3 font-bold text-sm mt-10 sticky left-0 bottom-0 bg-[white] inputs rounded-md py-5 max-w-[700px] w-full px-10">
              <button
                onClick={() =>
                  (document.getElementById("my-drawer").checked = false)
                }
                className="bg-[#F9FAFE] text-[#7E88C3] px-5 rounded-full"
              >
                Discard
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDraftInvoice}
                  type="button"
                  className="px-6 py-4 list-a rounded-3xl bg-[#373B53] text-[#888EB0] draftbtn drafttxt"
                >
                  Save as Draft
                </button>

                <button
                  onClick={handleAddInvoice}
                  type="button"
                  className="px-6 py-3 rounded-3xl bg-[#7C5DFA] text-[#ffffff]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
