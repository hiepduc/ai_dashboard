import React from "react";
import Banner from "./components/sections/banner";
import Header from "./components/sections/header";
import Dashboard from "./components/sections/dashboard/dashboard";
import Disclaimer from "./components/sections/disclaimer";
import Footer from "./components/sections/footer";
import ActivityGuide from "./components/sections/activity-guide";
import { DataProvider } from "./services/Selector/dataContext";

function App() {
  return (
    <>
      <Banner />
      <Header />
      <DataProvider>
        <Dashboard />
        <Disclaimer />
      </DataProvider>
      <ActivityGuide />
      <Footer />
    </>
  );
}

export default App;
