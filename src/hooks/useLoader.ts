import { LoaderContext } from "@/components/providers/loader";
import { useContext } from "react";

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
