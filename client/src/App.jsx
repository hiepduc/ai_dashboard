import React from "react";
import Banner from "./components/sections/banner";
import Header from "./components/sections/header";
import Dashboard from "./components/sections/dashboard/dashboard";
import Disclaimer from "./components/sections/disclaimer";
import Footer from "./components/sections/footer";
import ActivityGuide from "./components/sections/activity-guide";
import { DataProvider } from "./services/Selector/dataContext";
import { Component } from "./components/sections/dashboard/SensorAlertWidget";
import { Component1 } from "./components/sections/dashboard/SensorAlert";

function App() {
  return (
    <>
      <Banner />
      <Header />
      <main>
        <DataProvider>
          <Dashboard />
          <Disclaimer />
        </DataProvider>
        <ActivityGuide />
        <Component />
        <Component1 />
      </main>
      <Footer />
    </>
  );
}

export default App;
