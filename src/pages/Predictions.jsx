import { useEffect, useState } from "react";
import CountryMedalChart from "../components/CountryMedalChart";
import TopCountriesTable from "../components/TopCountriesTable";

const Predictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getPredictions = async () => {
    const response = await fetch(`${apiUrl}/predict`);

    setPredictions(await response.json());
    setIsLoading(false);
  };

  useEffect(() => {
    getPredictions();
  }, []);

  if (isLoading)
    return (
      <p style={{ width: "max-content", margin: "56px auto" }}>Loading..</p>
    );

  return (
    <>
      <TopCountriesTable predictions={predictions} />
      <CountryMedalChart predictions={predictions} />
    </>
  );
};

export default Predictions;
