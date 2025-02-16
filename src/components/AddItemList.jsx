import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

function AddItemList() {
  const [iteems, setIteems] = useState([]);
  const formRef = useRef(null);

  const addItem = () => {
    setIteems([...iteems, { id: Date.now(), name: "", qty: 0, price: 0.0 }]);
  };

  const removeItem = (id) => {
    const isConfirm = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (isConfirm) {
      setIteems(iteems.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    setIteems(
      iteems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };
  return (
    <div>
      <h2 className="font-bold text-[18px]">Item List</h2>
      <div className="rounded-lg">
        <div className="flex gap-10 pb-2 font-semibold text-sm mt-5">
          <span className="mr-24">Item Name</span>
          <span className="ml-5">Qty.</span>
          <span className="">Price</span>
          <span className="">Total</span>
        </div>

        {iteems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center py-2">
            <form ref={formRef}>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => updateItem(item.id, "name", e.target.value)}
                className="p-4 rounded-md w-[214px]"
                placeholder="Banner Design"
              />
              <input
                type="number"
                name="qty"
                value={item.qty}
                onChange={(e) =>
                  updateItem(item.id, "qty", Number(e.target.value))
                }
                className="p-4 rounded-md w-[55px] text-center"
                min="1"
              />
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) =>
                  updateItem(item.id, "price", Number(e.target.value))
                }
                className="p-4 rounded-md w-[55px] text-center mr-8"
                step="0.01"
                min="0.0"
              />
            </form>

            <div className="flex items-center justify-between max-w-60 w-full">
              <p className="text-gray-600 font-medium">
                {(item.qty * item.price).toFixed(2)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className=""
              >
                <FaTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            if (
              iteems.length > 0 &&
              iteems[iteems.length - 1].name.trim().length === 0
            ) {
              // formRef.current["name"][items.length - 1].focus();
              toast.error("Item Name kiritining");
            } else {
              addItem();
            }
          }}
          className="mt-4 w-full py-4 text-[#7E88C3] text-xs font-bold sidebar-text-footer inputs bg-[#F9FAFE] rounded-lg"
        >
          + Add New Item
        </button>
      </div>
    </div>
  );
}

export default AddItemList;
