import "./App.css";
import Card from "./components/card/Card";
import Header from "./components/header/Header";
import { useSelector } from "react-redux";

function App() {
  const jobs = useSelector((state) => state.jobs.jobs);
  return (
    <>
      <Header />
      {jobs.map((job) => {
        const img = require(`${job.logo}`);
        return <Card job={job} key={job.id} image={img} />;
      })}
    </>
  );
}

export default App;
