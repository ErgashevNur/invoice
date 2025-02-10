import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layouts/MainLayout";
import NotFound from "./pages/ErrorPage";
import InvoiceDetails from "./pages/InvoiceDetails";
import { Toaster } from "react-hot-toast";
import InvoiceProvider from "./store/invoiceProvider";

function App() {
  return (
    <InvoiceProvider>
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/invoiceDetails/:id"
          element={
            <MainLayout>
              <InvoiceDetails />
            </MainLayout>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
      <Toaster />
    </InvoiceProvider>
  );
}

export default App;
