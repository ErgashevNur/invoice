import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export const useInvoice = () => useContext(InvoiceContext);

function InvoiceProvider({ children }) {
  const [state, setState] = useState({
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    streetAddressTwo: "",
    cityTwo: "",
    postCodeTwo: "",
    countryTwo: "",
    date: "",
    paymentTerm: "Next 1 day",
    project: "",
    items: [],
  });

  return (
    <InvoiceContext.Provider value={{ state, setState }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceProvider;
