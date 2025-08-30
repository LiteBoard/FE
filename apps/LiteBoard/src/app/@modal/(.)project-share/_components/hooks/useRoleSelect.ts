import { useEffect, useState, useRef } from 'react';
import { Role } from '../constants/role';

interface UseRoleSelectProps {
  initialRole?: Role;
  initialIsOpen?: boolean;
  memberId: string;
}

let currentOpenMemberId: string | null = null;
const listeners = new Set<(memberId: string | null) => void>();

const useRoleSelect = ({
  initialRole = Role.VIEWER,
  initialIsOpen = false,
  memberId,
}: UseRoleSelectProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const isInitialized = useRef(false);

  useEffect(() => {
    const handleStateChange = (openMemberId: string | null) => {
      if (openMemberId !== memberId && isOpen) {
        setIsOpen(false);
      }
    };

    listeners.add(handleStateChange);

    return () => {
      listeners.delete(handleStateChange);
    };
  }, [memberId, isOpen]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    if (isOpen) {
      currentOpenMemberId = memberId;
    } else if (currentOpenMemberId === memberId) {
      currentOpenMemberId = null;
    }

    listeners.forEach((listener) => listener(currentOpenMemberId));
  }, [isOpen, memberId]);

  return { isOpen, selectedRole, setIsOpen, setSelectedRole };
};

export default useRoleSelect;
