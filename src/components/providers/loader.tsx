"use client";

import React, { createContext, useState, type ReactNode } from "react";
import { LoadingSpinner } from "../common/LoadingSpinner";

type LoaderContext = {
  showLoader: (v: boolean) => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContext | undefined>(
  undefined,
);

export const LoaderProvider: React.FC<LoaderContextProvider> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const contextValue: LoaderContext = {
    showLoader: (v) => {
      setIsVisible(v);
    },
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {isVisible && <LoadingSpinner />}
      {children}
    </LoaderContext.Provider>
  );
};
