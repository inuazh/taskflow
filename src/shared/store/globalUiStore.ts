import { create } from "zustand"
import { persist } from "zustand/middleware"

type Density = "compact" | "comfortable"

type GlobalUiStore = {
  density: Density
  setDensity: (density: Density) => void
}

export const useGlobalUiStore = create<GlobalUiStore>()(
  persist(
    (set) => ({
      density: "comfortable",
      setDensity: (density) => set({ density }),
    }),
    {
      name: "taskflow-global-ui",
    }
  )
)