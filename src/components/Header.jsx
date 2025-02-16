import { RiArrowDropDownLine } from "react-icons/ri";
import { InvoiceForm } from "./ButtonSidebar";
import { getAllData, getFilter } from "../axios";
import { useEffect, useState } from "react";

const filterItem = ["draft", "pending", "paid"];

function Header({ setData, data }) {
  const [filter, setFilter] = useState({
    draft: false,
    pending: false,
    paid: false,
  });

  useEffect(() => {
    getAllData()
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    getFilter(filter)
      .then((res) => {
        setData(res);
      })
      .catch(() => {})
      .finally(() => {});
  }, [filter]);

  return (
    <section className="justify-between flex items-center mx-auto lg:ml-0 bg-[#f8f8fb] list-a z-40 px-5">
      <div className="flex items-center justify-between max-w-[900px] h-28 w-full mx-auto">
        <div className="flex flex-col ">
          <h1 className="font-bold text-[20px] md:text-4xl text-[#0C0E16] text-color">
            Invoices
          </h1>

          {data && data.length > 0 ? (
            <div>
              <p className="hidden md:block font-normal text-xs md:text-sm text-[#888EB0]">
                There are {data.length} total invoices
              </p>
              <p className="md:hidden text-xs md:text-sm">
                {data.length} invoices
              </p>
            </div>
          ) : (
            <p className="font-normal text-xs md:text-sm text-[#888EB0]">
              No invoices
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-10">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="md:w-[154px] flex items-center m-1"
            >
              <span className="hidden md:block"> Filter by status</span>
              <span className="md:hidden"> Filter</span>
              <RiArrowDropDownLine className="w-8 h-8" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#fff] ddown rounded-lg w-40 p-2 shadow z-40"
            >
              {filterItem.map((item, index) => (
                <li key={index}>
                  <label>
                    <input
                      onChange={(e) => {
                        const key = e.target.name;
                        const checked = e.target.checked;
                        setFilter((res) => {
                          return { ...res, [key]: checked };
                        });
                      }}
                      checked={filter[item]}
                      name={item}
                      type="checkbox"
                      className="checkbox border-2 border-[#7C5DFA] [--chkbg:#7C5DFA] [--chkfg:white] checked:border-[#7C5DFA]"
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <InvoiceForm data={data} setData={setData} />
        </div>
      </div>
    </section>
  );
}

export default Header;
