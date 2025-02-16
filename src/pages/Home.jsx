import { useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";
import { useData } from "../context/useStates";

function Home() {
  const { data, setData } = useData();
  return (
    <section className="h-[100vh] pt-20">
      <Header data={data} setData={setData} />
      <Table data={data} />
    </section>
  );
}

export default Home;
