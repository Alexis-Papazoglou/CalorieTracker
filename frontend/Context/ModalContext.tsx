// ModalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Meal } from "../src/globalTypes";

interface ModalContextProps {
  isVisible: boolean;
  selectedMeal: Meal;
  openModal: (mealData: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState({} as Meal);

  const openModal = (mealData: any) => {
    setSelectedMeal(mealData);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ isVisible, selectedMeal, openModal, closeModal }}>{children}</ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};
