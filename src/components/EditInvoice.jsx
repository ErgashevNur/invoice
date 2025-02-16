import { useState } from "react";

function EditInvoice({ add, onClose }) {
  const [item, setItem] = useState([]);
  const [defInvoice, setDefInvoice] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }

  return (
    <form>
      <div className="px-8">
        <h1 className="text-2xl font-bold mb-12 sticky top-0 left-0"></h1>
        <div className="">
          <h3 className="text-primary text-sm font-bold mb-6">Bill From</h3>
          <div className="mb-6 ">
            <label className="block font-normal text-light2 text-sm mb-2">
              Street Address
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-md border font-bold buttons border-gray-600"
              name="invoice.senderAddress.street"
              value={invoice.senderAddress.street}
              // onChange={(e) => {
              //   setStreetAddress(e.target.value);
              // }}
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
                name="invoice.senderAddress.city"
                value={invoice.senderAddress.city}
                // onChange={(e) => {
                //   setCity(e.target.value);
                // }}
              />
            </div>
            <div>
              <label className="block font-normal text-light2 text-sm mb-2">
                Post Code
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                name="invoice.senderAddress.postCode"
                value={invoice.senderAddress.postCode}
                // onChange={(e) => {
                //   setPostCode(e.target.value);
                // }}
              />
            </div>
            <div>
              <label className="block font-normal text-light2 text-sm mb-2">
                Country
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                name="invoice.senderAddress.country"
                value={invoice.senderAddress.country}
                // onChange={(e) => {
                //   setCountry(e.target.value);
                // }}
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-primary text-sm font-bold mb-6">Bill To</h3>
            <label className="block font-normal text-light2 text-sm mb-2 border-gray-600">
              Client's Name
            </label>
            <input
              type="text"
              className="w-full p-3 buttons rounded-md font-bold border border-gray-600"
              name="invoice.clientName"
              value={invoice.clientName}
              // onChange={(e) => {
              //   setClientName(e.target.value);
              // }}
            />
          </div>
          <div className="mb-6">
            <label className="block font-normal text-light2 text-sm mb-2">
              Client's Email
            </label>
            <input
              type="email"
              className="w-full border buttons p-3 font-bold rounded-md border-gray-600"
              name="invoice.clientEmail"
              value={invoice.clientEmail}
              // onChange={(e) => {
              //   setClientEmail(e.target.value);
              // }}
            />
          </div>
          <div className="mb-6">
            <label className="block font-normal text-light2 text-sm mb-2">
              Street Address
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-md border font-bold buttons border-gray-600"
              name="invoice.clientAddress.street"
              value={invoice.clientAddress.street}
              // onChange={(e) => {
              //   setStreetAddressTwo(e.target.value);
              // }}
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
                name="invoice.clientAddress.city"
                value={invoice.clientAddress.city}
                // onChange={(e) => {
                //   setCityTwo(e.target.value);
                // }}
              />
            </div>
            <div>
              <label className="block font-normal text-light2 text-sm mb-2">
                Post Code
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md font-bold buttons border border-gray-600"
                name="invoice.clientAddress.postCode"
                value={invoice.clientAddress.postCode}
                // onChange={(e) => {
                //   setPostCodeTwo(e.target.value);
                // }}
              />
            </div>
            <div>
              <label className="block font-normal text-light2 text-sm mb-2">
                Country
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md buttons font-bold border border-gray-600"
                name="invoice.clientAddress.country"
                value={invoice.clientAddress.country}
                // onChange={(e) => {
                //   setCountryTwo(e.target.value);
                // }}
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
                name="invoice.createdAt"
                value={invoice.createdAt}
                // onChange={(e) => {
                //   setDate(e.target.value);
                // }}
              />
            </div>

            <div className="w-full">
              <label className="block font-normal text-light2 text-sm mb-2">
                Payment Terms
              </label>
              <select
                value={invoice.paymentTerms}
                // onChange={(e) => {
                //   setPaymentTerm(e.target.value);
                // }}
                className="w-full inputs bg-inherit cursor-pointer border buttons font-bold rounded-md border-gray-600 p-4"
              >
                <option>Filter by status</option>
                <option value="1">Next 1 day</option>
                <option value="7">Next 7 days</option>
                <option value="14">Next 14 days</option>
                <option value="30">Next 30 days</option>
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
              name="invoice.description"
              value={invoice.description}
              // onChange={(e) => {
              //   setProject(e.target.value);
              // }}
            />
          </div>
          {/* <AddItemList /> */}
        </div>
      </div>
      {/* <div className="flex justify-between gap-3 font-bold text-sm mt-10 sticky left-0 bottom-0 bg-[white] inputs rounded-md py-5 max-w-[700px] w-full px-10">
        <button
          onClick={() => (document.getElementById("my-drawer").checked = false)}
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
      </div> */}
      <div className="btn btn-secondary" onClick={handleClose}>
        discard
      </div>
      ;
    </form>
  );
}

export default EditInvoice;
