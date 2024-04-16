import {
  ModalContext,
  ModalContextType,
} from '@/components/providers/modal-context-providers';
import { useContext } from 'react';

export const useModal = () => {
  return useContext(ModalContext) as ModalContextType;
};
