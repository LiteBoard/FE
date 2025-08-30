import { useEffect, useState } from 'react';
import { Role, RoleOption } from './constants/role';
import { cn } from '@/utils';
import { createPortal } from 'react-dom';

interface RoleDropdownProps {
  memberId: string;
  options: RoleOption[];
  selectedRole: Role;
  dropDownPosition: string;
  type: 'email' | 'invite';
  setIsOpen: (isOpen: boolean) => void;
  setSelectedRole: (role: Role) => void;
  onDelete?: () => void;
}

const RoleDropdown = ({
  memberId,
  options,
  selectedRole,
  dropDownPosition,
  type,
  setIsOpen,
  setSelectedRole,
  onDelete,
}: RoleDropdownProps) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const roleDropdownComponent = (
    <div
      className={cn(
        'grid absolute z-50 bg-white rounded-lg border w-[375px] border-neutral-200',
        dropDownPosition,
        {
          'h-[434px] grid-rows-[1fr_1fr_1fr_1fr]': type === 'invite',
          'h-[330px] grid-rows-[1fr_1fr_1fr]': type === 'email',
        }
      )}
      style={{ pointerEvents: 'auto' }}
    >
      {options.map((option, index) => (
        <div
          key={option.role}
          className={`p-4 ${index !== options.length - 1 && 'border-b border-neutral-200'}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (option.role === 'DELETE') {
              onDelete?.();
              setIsOpen(false);
              return;
            }
            setSelectedRole(option.role as Role);
            setIsOpen(false);
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className={`flex flex-col gap-3 px-5 py-3 h-full rounded-md hover:bg-neutral-50 cursor-default ${
              selectedRole === option.role ? 'bg-neutral-100' : ''
            }`}
          >
            <p className="text-text-T3 text-neutral-800">{option.name}</p>
            <p className="whitespace-pre-line text-text-caption text-neutral-500">
              {option.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  if (!mount) return null;

  if (type === 'email') {
    return createPortal(
      roleDropdownComponent,
      document.getElementById('email-field-container') as HTMLElement
    );
  }

  if (type === 'invite') {
    return createPortal(
      roleDropdownComponent,
      document.getElementById(`member-${memberId}`) as HTMLElement
    );
  }

  return createPortal(roleDropdownComponent, document.body);
};

export default RoleDropdown;
