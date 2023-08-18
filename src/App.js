import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header";
import AboutUs from "./AboutUs";
import Properties from "./Properties";
import MarketInsight from "./MarketInsight";
import PropertyForm from "./PropetyForm";

function App() {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setSelectedTabIndex(newIndex);
  };
  return (
    <div>
      <Header
        selectedTabIndex={selectedTabIndex}
        handleTabChange={handleTabChange}
      />
      {selectedTabIndex === 0 && <AboutUs />}
      {selectedTabIndex === 1 && <Properties />}
      {selectedTabIndex === 2 && <MarketInsight />}
      {selectedTabIndex === 3 && <PropertyForm />}
    </div>
  );
}

export default App;
