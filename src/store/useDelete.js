import axios from "axios";
import { create } from "zustand";

const API_URL = "https://json-api.uz/api/project/Ergashev's/data";

export const useDelete = create((set) => ({
  invoices: [],
  setInvoices: (newInvoices) => set({ invoices: newInvoices }),

  deleteInvoice: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        invoices: state.invoices.filter((invoice) => invoice.id !== id),
      }));
    } catch (error) {
      console.log("O'chirishda xatolik yuz berdi: ", error);
    }
  },

  editInvoice: async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);

      set((state) => ({
        invoices: state.invoices.map((invoice) =>
          invoice.id === id ? { ...invoice, ...updatedData } : invoice
        ),
      }));
    } catch (error) {
      console.log("Tahrirlashda xatolik yuz berdi: ", error);
    }
  },

  addStatusDraft: async (id, updatedForDraft) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedForDraft);

      set((state) => ({
        invoices: state.invoices.map((invoice) =>
          invoice.id === id ? response.data : invoice
        ),
      }));
    } catch (error) {
      console.log("Tahrirlashda xatolik yuz berdi: ", error);
    }
  },
}));
