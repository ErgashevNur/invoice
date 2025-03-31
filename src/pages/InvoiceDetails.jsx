import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "../store/useDelete";
import { useInvoice } from "../store/invoiceProvider";
import { useData } from "../context/useStates";

import axios from "axios";

function InvoiceDetails({ children }) {
  const [add, setAdd] = useState(false);
  const [invoice, setInvoice] = useState();
  const { deleteInvoice, editInvoice, invoices } = useDelete();
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, setState } = useInvoice();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("selectedData")) || [];

    if (storedData) {
      setInvoice(storedData);
    } else {
      navigate(`/`);
    }
  }, [id]);

  const statusColors = {
    paid: "text-[#33D69F] bg-[rgba(51,214,159,0.1)]",
    pending: "text-[#FF8F00] bg-[rgba(255,143,0,0.1)]",
    default: "text-[#373B53] table-text bg-[rgba(55,59,83,0.1)] ",
  };

  const statusSpan = {
    paid: "bg-[#33D69F]",
    pending: "bg-[#FF8F00]",
    default: "table-bg bg-[#373B53]",
  };

  function handleDeleteData(id) {
    deleteInvoice(Number(id));
    toast.success("Invoice deleted successfully");
    navigate("/");
  }

  function StatusChange() {
    if (!invoice) return;

    const updatedInvoice = { ...invoice, status: "paid" };

    editInvoice(invoice.id, updatedInvoice);

    setInvoice(updatedInvoice);
    toast.success("Invoice marked as paid");
  }

  function handleEditInvoice(id) {
    setAdd(true);
    const invoice = invoices.find((invoice) => invoice.id === Number(id));
    if (!invoice) return;

    setState({
      streetAddress: invoice.senderAddress.street,
      city: invoice.senderAddress.city,
      postCode: invoice.senderAddress.postCode,
      country: invoice.senderAddress.country,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      streetAddressTwo: invoice.clientAddress.street,
      cityTwo: invoice.clientAddress.city,
      postCodeTwo: invoice.clientAddress.postCode,
      countryTwo: invoice.clientAddress.country,
      date: invoice.createdAt,
      paymentTerm: invoice.paymentTerms,
      project: invoice.description,
    });
  }

  const handleEditData = async () => {
    if (!invoice) return;

    const updatedInvoice = { ...invoice, ...state };
    editInvoice(invoice.id, updatedInvoice);
    setInvoice(updatedInvoice);
    toast.success("Ma'lumotlar o'zgartirildi");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prev) => {
      if (["street", "city", "postCode", "country"].includes(name)) {
        return {
          ...prev,
          senderAddress: {
            ...prev.senderAddress,
            [name]: value,
          },
        };
      }

      if (
        [
          "clientStreet",
          "clientCity",
          "clientPostCode",
          "clientCountry",
        ].includes(name)
      ) {
        return {
          ...prev,
          clientAddress: {
            ...prev.clientAddress,
            [name.replace("client", "").toLowerCase()]: value,
          },
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <section className="mt-24 xl:ml-[103px] sm:h-[100vh] z-30">
      <div className="px-5 w-full max-w-[930px] mx-auto">
        <a href="/" className="flex items-center gap-6">
          <IoChevronBack />
          <span> Go back</span>
        </a>

        <div className="flex inputs items-center justify-between p-6 mt-9 rounded-md w-full">
          <div className="flex items-center justify-between md:gap-4">
            <p>Status</p>
            <button
              className={`py-3 rounded-md flex items-center justify-center w-[120px] gap-2 capitalize ${
                statusColors[invoice?.status]
                  ? statusColors[invoice?.status]
                  : statusColors.default
              }`}
            >
              <span
                className={`w-[10px] h-[10px] rounded-full
                            ${
                              statusSpan[invoice?.status]
                                ? statusSpan[invoice?.status]
                                : statusSpan.default
                            }`}
              ></span>
              {invoice?.status}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 max-w-[600px]">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content w-20">
                <label
                  onClick={handleEditInvoice}
                  htmlFor="my-drawer"
                  className="px-6 py-4 text-[#7E88C3] bg-[#eef1fe] hover:bg-[#c6cfff] detailEditButton rounded-full font-bold"
                >
                  Edit
                </label>
              </div>
              <div className="drawer-side lg:ml-[95px]">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <div className="menu list-a bg-base-200 text-base-content min-h-full max-w-[600px] w-full p-5">
                  <form>
                    <div className="px-8">
                      <h1 className="list-a bg-[#f8f8fb] py-3 text-2xl font-bold mb-12 sticky top-0 left-0">
                        #{invoice?.id}
                      </h1>
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
                            defaultValue={invoice?.senderAddress.street}
                            onChange={handleChange}
                            name="street"
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
                              defaultValue={invoice?.senderAddress.city}
                              onChange={handleChange}
                              name="city"
                            />
                          </div>

                          <div>
                            <label className="block font-normal text-light2 text-sm mb-2">
                              Post Code
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                              defaultValue={invoice?.senderAddress.postCode}
                              onChange={handleChange}
                              name="postCode"
                            />
                          </div>

                          <div>
                            <label className="block font-normal text-light2 text-sm mb-2">
                              Country
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                              defaultValue={invoice?.senderAddress.country}
                              onChange={handleChange}
                              name="country"
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
                            defaultValue={invoice?.clientName}
                            onChange={handleChange}
                            name="clientName"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block font-normal text-light2 text-sm mb-2">
                            Client's Email
                          </label>
                          <input
                            type="email"
                            className="w-full border buttons p-3 font-bold rounded-md border-gray-600"
                            defaultValue={invoice?.clientEmail}
                            onChange={handleChange}
                            name="clientEmail"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block font-normal text-light2 text-sm mb-2">
                            Street Address
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 rounded-md border font-bold buttons border-gray-600"
                            defaultValue={invoice?.clientAddress.street}
                            onChange={handleChange}
                            name="street"
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
                              defaultValue={invoice?.clientAddress.city}
                              onChange={handleChange}
                              name="city"
                            />
                          </div>
                          <div>
                            <label className="block font-normal text-light2 text-sm mb-2">
                              Post Code
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                              defaultValue={invoice?.clientAddress.postCode}
                              onChange={handleChange}
                              name="postCode"
                            />
                          </div>
                          <div>
                            <label className="block font-normal text-light2 text-sm mb-2">
                              Country
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                              defaultValue={invoice?.clientAddress.country}
                              onChange={handleChange}
                              name="country"
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
                              defaultValue={invoice?.createdAt}
                              onChange={handleChange}
                              name="createdAt"
                            />
                          </div>

                          <div className="w-full">
                            <label className="block font-normal text-light2 text-sm mb-2">
                              Payment Terms
                            </label>
                            <select
                              defaultValue={invoice?.paymentTerms}
                              onChange={handleChange}
                              name="paymentTerms"
                              className="w-full inputs bg-inherit cursor-pointer border buttons font-bold rounded-md border-gray-600 p-4"
                            >
                              <option>Filter by status</option>
                              <option value="Number(1)">Next 1 day</option>
                              <option value="Number(7)">Next 7 days</option>
                              <option value="Number(14)">Next 14 days</option>
                              <option value="Number(30)">Next 30 days</option>
                            </select>
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block font-normal  text-light2 text-sm mb-2">
                            Project Description
                          </label>
                          <input
                            type="text"
                            onChange={handleChange}
                            className="w-full border buttons p-3 rounded-md font-bold border-gray-600"
                            defaultValue={invoice?.description}
                            name="description"
                          />
                        </div>
                        {/* <AddItemList />*/}
                      </div>
                    </div>
                  </form>

                  <div className="flex justify-between gap-3 font-bold text-sm mt-10 sticky left-0 bottom-0 bg-[white] inputs rounded-md py-5 max-w-[700px] w-full px-10">
                    <button
                      onClick={() =>
                        (document.getElementById("my-drawer").checked = false)
                      }
                      className="bg-[#F9FAFE] text-[#7E88C3] px-5 rounded-full"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleEditData}
                      type="button"
                      className="px-6 py-3 rounded-3xl bg-[#7C5DFA] text-[#ffffff]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div onClick={() => document.getElementById("delete").showModal()}>
              <button className="px-6 py-4 hover:bg-[rgba(255,151,151,1)] bg-[#EC5757] rounded-full text-white font-bold">
                Delete
              </button>

              <dialog id="delete" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg ">O'chirishni Tasdiqlash</h3>
                  <p className="py-4 text-white">
                    Rostdan ham o'chirishni hohlaysizmi?
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button
                        className="btn btn-primary mr-5"
                        onClick={() =>
                          (document.getElementById("delete").checked = false)
                        }
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => {
                          handleDeleteData(id);
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>

            <div>
              {invoice?.status !== "pending" ||
                ("draft" && (
                  <button
                    className="w-36 px-3 py-4 hover:bg-[rgba(146,119,255,1)] bg-[#7C5DFA] rounded-full text-white font-bold"
                    onClick={() => StatusChange(id)}
                  >
                    Mark as Paid
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="inputs mt-4 p-6 rounded-md w-full">
          <div className="sm:flex sm:flex-row sm:justify-between">
            <div className="mb-8">
              <p className="font-bold text-color ">
                <span className="text-[#7E88C3]">#</span>
                {invoice?.id}
              </p>
              <p className="font-normal">{invoice?.description}</p>
            </div>

            <div className="text-[#7E88C3] txt-color  mb-8 text-sm sm:text-end">
              <p>{invoice?.senderAddress.street}</p>
              <p>{invoice?.senderAddress.city}</p>
              <p>{invoice?.senderAddress.postCode}</p>
              <p>{invoice?.senderAddress.country}</p>
            </div>
          </div>

          <div className="sm:flex sm:gap-24">
            <div className="flex items-start gap-10 mb-9">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <p className="text-[##7E88C3] txt-color font-normal">
                    Create Invoice
                  </p>
                  <p className="text-[#0C0E16] text-color font-bold">
                    {invoice?.createdAt}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[#0C0E16] text-color font-normal">
                    Payment Due
                  </p>
                  <p className="font-bold text-[#0C0E16] text-color">
                    {invoice?.paymentDue}
                  </p>
                </div>
              </div>

              <div className="text-[#7e88c3] txt-color font-normal text-sm">
                <p className="mb-2">Bill to</p>
                <p className="font-bold text-[#0C0E16] text-color text-base mb-2">
                  {invoice?.clientName}
                </p>
                <p>{invoice?.clientAddress.street}</p>
                <p>{invoice?.clientAddress.city}</p>
                <p>{invoice?.clientAddress.postCode}</p>
                <p>{invoice?.clientAddress.country}</p>
              </div>
            </div>

            <div>
              <p>Send to</p>
              <p>{invoice?.clientEmail}</p>
            </div>
          </div>

          <div className="sm:hidden bg-[#252945] p-6 rounded-tl-lg rounded-tr-lg mt-10 flex gap-6 flex-col text-white">
            {invoice?.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs">{item.name}</h3>
                  <p className="text-[#888EB0] text-sm">
                    {item.quantity} x £{item.price.toFixed(2)}
                  </p>
                </div>
                <p>£{(item?.total).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="hidden sm:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-400 text-left">
                  <th className="pb-2">Item Name</th>
                  <th className="pb-2 text-center">QTY.</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice?.items?.map((item, index) => (
                  <tr key={index} className="">
                    <td className="py-2 font-semibold">{item.name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">
                      £{item.price.toFixed(2)}
                    </td>
                    <td className="py-2 text-right">£{item?.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-6 bg-[#060e16] rounded-bl-lg rounded-br-lg">
            <p className="text-white">Amount Due</p>
            <span className="text-white font-bold text-xl">
              £{invoice?.total}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center sm:hidden justify-between py-5 px-6 bg-[#1E2139] mt-14 min-w-[300px] w-full">
        <div className="flex items-center gap-4">
          <button className="px-6 py-4 hover:bg-[rgba(255,255,255,1)] hover:text-[#7E88C3] bg-[#252945] rounded-full text-white font-bold">
            Edit
          </button>

          <div>
            <button
              className="px-6 py-4 hover:bg-[rgba(255,151,151,1)] bg-[#EC5757] rounded-full text-white font-bold"
              onClick={() => document.getElementById("deleted").showModal()}
            >
              Delete
            </button>

            <dialog id="deleted" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg ">O'chirishni Tasdiqlash</h3>
                <p className="py-4 text-white">
                  Rostdan ham o'chirishni hohlaysizmi?
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn btn-primary mr-5"
                      onClick={() =>
                        (document.getElementById("delete").checked = false)
                      }
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-error"
                      onClick={() => {
                        handleDeleteData(id);
                      }}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          {invoice?.status !== "pending" ||
            ("draft" && (
              <button
                className="px-6 py-4 hover:bg-[rgba(146,119,255,1)] bg-[#7C5DFA] rounded-full text-white font-bold"
                onClick={() => StatusChange(id)}
              >
                Mark as Paid
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}

export default InvoiceDetails;
