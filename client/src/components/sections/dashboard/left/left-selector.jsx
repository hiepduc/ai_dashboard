import useVisualizeModeStore from "../../../../stores/useVisualizeModeStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeftSelectorMonitor from "./left-selector-monitor";
import LeftSelectorForecast from "./left-selector-forecast";

const Selector = () => {
  const { mode, setMode } = useVisualizeModeStore(); // Zustand state and setter
  const customBlueColor = "#524eee";

  return (
    <div>
      {/* <div className="select-header"> */}
      <Tabs
        defaultValue={mode === "monitor" ? "monitor" : "forecast"}
        className="select-header"
        onValueChange={(value) => setMode(value)} // Update mode on tab change
      >
        {console.log("Mode: ", mode)}
        <TabsList>
          <TabsTrigger
            value="monitor"
            className={`${
              mode === "monitor"
                ? `bg-[#524eee] text-white` // Custom blue color with white text
                : "text-blue-700 bg-[#f5f5f5]" // Default color for inactive tab
            } p-2 data-[state=active]:bg-[${customBlueColor}] data-[state=active]:text-white]`}
          >
            Monitoring
          </TabsTrigger>
          <TabsTrigger
            value="forecast"
            className={`${
              mode === "forecast"
                ? `bg-[${customBlueColor}] text-white` // Custom blue color with white text
                : "text-blue-700 bg-[#f5f5f5]" // Default color for inactive tab
            } p-2 data-[state=active]:bg-[${customBlueColor}] data-[state=active]:text-white]`}
          >
            Forecasting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitor">
          <LeftSelectorMonitor />
        </TabsContent>
        <TabsContent value="forecast">
          <LeftSelectorForecast />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Selector;
