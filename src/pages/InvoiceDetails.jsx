import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "../store/useDelete";
import { useInvoice } from "../store/invoiceProvider";
import EditInvoice from "../components/EditInvoice";

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
    toast.error("Invoice deleted successfully");
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

  return (
    <section className="mt-24 xl:ml-[103px] sm:h-[100vh] z-30">
      <div className="px-5 w-full xl:mb-14 max-w-[930px] mx-auto">
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

          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => handleEditInvoice(id)}
              className="px-6 py-4 text-[#7E88C3] bg-[#eef1fe] hover:bg-[#c6cfff] detailEditButton rounded-full font-bold"
            >
              Edit
            </button>

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

        <div className="inputs mt-4 p-6 rounded-md w-full">
          <div className="sm:flex sm:flex-row sm:justify-between">
            <div className="mb-8">
              <p className="font-bold text-color ">
                <span className="text-[#7E88C3]">#</span>
                {invoice?.idd}
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
            {invoice?.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-xs">{item.name}</h3>
                  <p className="text-[#888EB0] text-sm">
                    {item.quantity} x £{item.price.toFixed(2)}
                  </p>
                </div>
                <p>£{item.total}</p>
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
                {invoice?.items.map((item, index) => (
                  <tr key={index} className="">
                    <td className="py-2 font-semibold">{item.name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">
                      £{item.price.toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      £{item.total.toFixed(2)}
                    </td>
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
      {add == true && (
        <EditInvoice
          add={add}
          onClose={() => {
            setAdd(false);
          }}
        />
      )}
    </section>
  );
}

export default InvoiceDetails;
