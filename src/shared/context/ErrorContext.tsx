"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
} from "react";

type AppError = {
  id: string;
  message: string;
  type: "api" | "render" | "unknown";
  timestamp: number;
  context?: string;
};

type ErrorContextValue = {
  errors: AppError[];
  addError: (message: string, type: AppError["type"], context?: string) => void;
  clearError: (id: string) => void;
  clearAll: () => void;
};

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<AppError[]>([]);

  const addError = useCallback(
    (message: string, type: AppError["type"], context?: string) => {
      const error: AppError = {
        id: `${Date.now()}-${Math.random()}`,
        message,
        type,
        timestamp: Date.now(),
        context,
      };
      setErrors((prev) => [...prev, error]);
    },
    [],
  );

  const clearError = useCallback((id: string) => {
    setErrors((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setErrors([]);
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, addError, clearError, clearAll }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useErrors = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrors must be used within ErrorProvider");
  }
  return context;
};
