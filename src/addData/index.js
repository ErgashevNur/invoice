export const addData = (formData, items, total) => {
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

  return {
    idd: generateId(),
    createdAt: new Date(),
    paymentDue: formData.date,
    description: formData.description,
    paymentTerms: formData.paymentTerms || "Net 7 days",
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    status: formData.status,
    senderAddress: {
      street: formData.streetAddress,
      city: formData.city,
      postCode: formData.postcode,
      country: formData.country,
    },
    clientAddress: {
      street: formData.clientStreetAddress,
      city: formData.clientCity,
      postCode: formData.clientPostcode,
      country: formData.clientCountry,
    },
    items: [
      {
        name: "Logo Re-design",
        quantity: 1,
        price: 3102.04,
        total: 3102.04,
      },
    ],
    total: total,
  };
};
