import React, { useEffect, useRef, useState, memo } from "react";
import Welcome from "../Welcome/Welcome";
import Cities from "../Cities/Cities";
import { db } from "../../firebase/firebase";
import {
  ref,
  get,
  onValue,
  query,
  equalTo,
  orderByChild,
  set,
} from "firebase/database";
import "./App.css";

function App() {
  const [cities, setCities] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const citiesRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const cityData = Object.values(data.cities);
        setCities([...cityData]);
      }
    });
    setIsLoading(false);
  }, []);

  const handleGetStarted = () => {
    citiesRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyFilter = (name) => {
    const searchBy = name === "visited";

    const results = query(
      ref(db, "cities/"),
      orderByChild("visited"),
      equalTo(searchBy)
    );
    get(results)
      .then(({ snapshots }) => {
        const filteredData = snapshots
          .filter((snapshot) => snapshot.exists())
          .map((snapshot) => snapshot.val());
        setIsLoading(false);
        setCities(filteredData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeVisited = async (id) => {
    const oldCityData = cities;
    const foundCity = oldCityData.find((city) => city.id === id);
    const updatedCity = { ...foundCity, visited: !foundCity.visited };
    await set(ref(db, "cities/" + id), { ...updatedCity });
  };

  return (
    <div className="App">
      <main>
        <Welcome onGetStarted={handleGetStarted} />
        <Cities
          ref={citiesRef}
          cities={cities}
          onApplyFilter={handleApplyFilter}
          isLoading={isLoading}
          onChangeVisited={handleChangeVisited}
        />
      </main>
    </div>
  );
}

export default memo(App);
