import { create } from "zustand";
import { stateConfig } from "@/Configuration/config";

// Define the Zustand store
const useVisualizeModeStore = create((set) => ({
  mode: stateConfig.initVisualizationState, // default mode
  setMode: (newMode) => set({ mode: newMode }),
}));

export default useVisualizeModeStore;
