import { useState } from "react";

function EditInvoice({ add, onClose }) {
  const [item, setItem] = useState([]);
  const [defInvoice, setDefInvoice] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 300);
  }

  return <div onClick={handleClose}>discard</div>;
}

export default EditInvoice;
