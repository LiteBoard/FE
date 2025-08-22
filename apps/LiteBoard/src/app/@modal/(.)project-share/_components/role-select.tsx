import { ChevronIcon } from '@LiteBoard/ui';
import { useState } from 'react';
import { ALL_OPTIONS, Role } from './constants/role';
import getRoleName from './utils/util-getRoleName';

const RoleSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.VIEWER);

  return (
    <div className="relative">
      <div
        className="flex gap-1 justify-center items-center cursor-pointer select-none text-text-B3R text-neutral-500 shrink-0 active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {getRoleName(selectedRole)}
        <ChevronIcon
          className={`w-6 h-6 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          type="down"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-10 w-[375px] h-[434px] grid grid-rows-[1fr_1fr_1fr_1fr] bg-white rounded-lg border border-neutral-200">
          {ALL_OPTIONS.map((option, index) => (
            <div
              key={option.role}
              className={`p-4 ${index !== 3 && 'border-b border-neutral-200'}`}
              onClick={() => {
                if (option.role === 'DELETE') {
                  // 프로젝트에서 제거 api 로직 호출
                  setIsOpen(false);
                  return;
                }
                setSelectedRole(option.role as Role);
                setIsOpen(false);
              }}
            >
              <div
                className={`flex flex-col gap-3 px-5 py-3 h-full rounded-md hover:bg-neutral-50 cursor-default ${selectedRole === option.role ? 'bg-neutral-100' : ''}`}
              >
                <p className="text-text-T3 text-neutral-800">{option.name}</p>
                <p className="whitespace-pre-line text-text-caption text-neutral-500">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSelect;
