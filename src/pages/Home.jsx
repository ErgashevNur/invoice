import { useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

function Home() {
  const [data, setData] = useState([]);
  return (
    <section className="">
      <Header data={data} setData={setData} />
      <Table data={data} />
    </section>
  );
}

export default Home;
