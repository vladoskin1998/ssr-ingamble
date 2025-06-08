import { useState, useCallback } from 'react';

type UseAccordionReturn = {
  isOpen: boolean;
  toggle: () => void;
};

export const useAccordion = (initialState: boolean = false): UseAccordionReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return {
    isOpen,
    toggle,
  };
};