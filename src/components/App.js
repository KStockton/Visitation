import React, { useEffect, useRef, useState } from "react";
import Welcome from "./Welcome";
import Cities from "./Cities";
import { db } from "../firebase/firebase";
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

const filterInitState = [
  { name: "visited", isChecked: false, isDisabled: false },
  { name: "visit", isChecked: false, isDisabled: true },
];

function App() {
  const [cities, setCities] = useState(null);
  const [filters, setFilters] = useState(filterInitState);
  const [isLoading, setIsLoading] = useState(true);

  const citiesRef = useRef(null);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const cityData = Object.values(data.cities);
        setCities([...cityData]);
      }
    });
    setIsLoading(false);
  }, []);

  const handleFilterCheckbox = (event) => {
    const { name, checked } = event.target;

    const olfFilters = filters;
    const newFilters = olfFilters.map((item, index) => {
      if (name === item.name) {
        item.isChecked = checked;
        item.isDisabled = !item.isDisabled;
      } else {
        item.isDisabled = !item.isDisabled;
      }
      return item;
    });
    setFilters(newFilters);
  };

  const handleGetStarted = () => {
    citiesRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyFilter = (name) => {
    const searchBy = name === "visited" ? true : false;

    const results = query(
      ref(db, "cities/"),
      orderByChild("visited"),
      equalTo(searchBy)
    );
    get(results).then((snapshot) => {
      const filteredData = [];
      snapshot.forEach((snap) => {
        if (snap.val()) {
          filteredData.push(snap.val());
        }
      });
      setIsLoading(false);
      setCities(filteredData);
    });
  };

  const handleChangeVisited = async (id) => {
    const oldCityData = cities;
    const foundCity = oldCityData.find((city) => city.id === id);

    const updatedCity = { ...foundCity, visited: !foundCity.visited };

    await set(ref(db, "cities/" + id), { ...updatedCity });
    const cityUpdateRef = ref(db, "cities/" + id);

    onValue(cityUpdateRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  };

  return (
    <div className="App">
      <main>
        <Welcome onGetStarted={handleGetStarted} />
        <Cities
          ref={citiesRef}
          cities={cities}
          onFilterData={handleFilterCheckbox}
          filters={filters}
          onApplyFilter={handleApplyFilter}
          isLoading={isLoading}
          onChangeVisited={handleChangeVisited}
        />
      </main>
    </div>
  );
}

export default App;
