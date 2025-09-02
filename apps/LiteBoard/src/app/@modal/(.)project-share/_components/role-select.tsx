import { ChevronIcon } from '@LiteBoard/ui';
import getRoleName from './utils/util-getRoleName';
import { Role } from './constants/role';

interface RoleSelectProps {
  isOpen: boolean;
  selectedRole: Role;
  roleDropdown: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}

const RoleSelect = ({
  isOpen,
  selectedRole,
  roleDropdown,
  setIsOpen,
}: RoleSelectProps) => {
  return (
    <div
      className="flex gap-1 justify-center items-center cursor-pointer select-none text-text-B3R text-neutral-500 shrink-0 active:scale-95"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {getRoleName(selectedRole)}
      <ChevronIcon
        className={`w-6 h-6 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        type="down"
      />
      {isOpen && roleDropdown}
    </div>
  );
};

RoleSelect.displayName = 'RoleSelect';

export default RoleSelect;
