import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getAllData } from "../axios";

function Table({}) {
  const [data, setData] = useState();
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllData()
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    if (data?.length > 0) {
      localStorage.setItem("invoices", JSON.stringify(data));
    }
  }, [data]);

  function handleInvoice(id, data) {
    localStorage.setItem("selectedData", JSON.stringify(data));
    navigate(`/invoiceDetails/${id}`);
  }

  return (
    <>
      <div className="z-10 max-w-[900px] mx-auto mt-16 px-5 h-[550px] overflow-y-auto scrollbar-custom">
        {data?.length > 0 && (
          <ul className="table  table-xs table-pin-rows table-pin-cols max-w-[900px] mx-auto">
            {data?.length > 0 &&
              data?.map((d, index) => (
                <li
                  onClick={() => handleInvoice(d.id, d)}
                  className="bg-[#ffffff] inputs bg-slate-20000 p-[16px] rounded-lg mb-4"
                  key={index}
                >
                  <div className="items-center grid grid-cols-2 md:grid-cols-5 md:pl-[32px]">
                    <p className="">#{d.id}</p>
                    <p className="">Due {d.paymentDue}</p>
                    <p className="">{d.clientName}</p>
                    <p className="w-10">{d.total}</p>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => console.log(d.status)}
                        className={`py-3 rounded-md flex items-center justify-center w-[104px] gap-2 capitalize ${
                          statusColors[d.status]
                            ? statusColors[d.status]
                            : statusColors.default
                        }`}
                      >
                        <span
                          className={`w-[10px] h-[10px] rounded-full ${
                            statusSpan[d.status]
                              ? statusSpan[d.status]
                              : statusSpan.default
                          }`}
                        ></span>
                        {d.status}
                      </button>
                      <p>
                        <MdNavigateNext className="w-5" />
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
        {data?.length == 0 && (
          <div className="mx-auto w-[242px] text-center mb-[185px]">
            <img src="/no-users.png" alt="No Users" className="mx-auto mt-28" />
            <p className="text-xl font-bold text-[#0C0E16] text-color mb-6 mt-16">
              There is nothing here
            </p>
            <p className="font-normal text-[12px] mx-auto text-[#888EB0] txt-color w-[195px]">
              Create an invoice by clicking the{" "}
              <span className="font-bold">New Invoice</span> button and get
              started
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Table;
