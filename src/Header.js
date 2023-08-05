import React from "react";
import { Divider, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AboutUs from "./AboutUs";
import Properties from "./Properties";
import MarketInsight from "./MarketInsight";
import PropertyForm from "./PropetyForm";

export default function Header(props) {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

  const handleTabChange = (event, newIndex) => {
    setSelectedTabIndex(newIndex);
  };

  return (
    <div>
      <Toolbar sx={{ alignItems: "center", mb: "6px" }}>
        <MapsHomeWorkIcon
          color="secondary"
          sx={{ fontSize: 40, alignItems: "end", pt: 1 }}
        />

        <Typography variant="h3" color="secondary" sx={{ pt: 1.8 }}>
          {" "}
          Logic Estate{" "}
        </Typography>
      </Toolbar>
      <Divider sx={{ backgroundColor: "#1976d2" }} />
      <Tabs
        value={selectedTabIndex}
        onChange={handleTabChange}
        textColor="secondary"
        centered
        sx={{ mt: "10px" }}
      >
        <Tab label="About us" sx={{ fontSize: "18px", mx: "10px" }} />
        <Tab label="Properties" sx={{ fontSize: "18px", mx: "10px" }} />
        <Tab label="Market Insight" sx={{ fontSize: "18px", mx: "10px" }} />
        <Tab label="Add Property" sx={{ fontSize: "18px", mx: "10px" }} />
      </Tabs>
      {selectedTabIndex === 0 && <AboutUs />}
      {selectedTabIndex === 1 && <Properties />}
      {selectedTabIndex === 2 && <MarketInsight />}
      {selectedTabIndex === 3 && <PropertyForm />}
    </div>
  );
}
