import { create } from "zustand"
import { persist } from "zustand/middleware"

interface StoreState {}

export const useCodeStores = create(
  persist(
    () => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      language: "plaintext",
      autoDetectLanguage: false,
      showBg: true,
      fontSize: 18,
      fontStyle: "ubuntuMono",
      padding: 64,
    }),
    { name: "user-preference" }
  )
)
