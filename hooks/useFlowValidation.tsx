import { FlowValidationContext } from "@/context/flow-validation-context";
import { useContext } from "react";

export const useFlowValidation = () => {
  const context = useContext(FlowValidationContext);

  if (!context) {
    throw new Error("Invalid FlowValidation Context");
  }

  return context;
};
