import { useClickOutside } from '@/hooks/utils/useClickOutSide';
import { ALL_OPTIONS, Role, RoleOption } from './constants/role';
import useRoleSelect from './hooks/useRoleSelect';
import RoleDropdown from './role-dropdown';
import RoleSelect from './role-select';
import { memo, useCallback, useRef } from 'react';

interface MockMember {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface MemberSelectProps {
  member: MockMember;
  onRoleChange: (memberId: string, role: Role) => void;
  onDelete: (memberId: string) => void;
}

const MemberSelect = memo(
  ({ member, onRoleChange, onDelete }: MemberSelectProps) => {
    const { isOpen, selectedRole, setIsOpen, setSelectedRole } = useRoleSelect({
      initialRole: member.role,
      memberId: member.id,
    });

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(() => {
      if (isOpen) {
        setIsOpen(false);
      }
    }, [setIsOpen, isOpen]);

    useClickOutside(ref, handleClickOutside);

    const handleRoleChange = useCallback(
      (role: Role) => {
        setSelectedRole(role);
        onRoleChange(member.id, role);
      },
      [setSelectedRole, onRoleChange, member.id]
    );

    const handleDelete = useCallback(() => {
      onDelete(member.id);
    }, [onDelete, member.id]);

    return (
      <div ref={ref}>
        <RoleSelect
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedRole={selectedRole}
          roleDropdown={
            <RoleDropdown
              memberId={member.id}
              selectedRole={selectedRole}
              options={ALL_OPTIONS as unknown as RoleOption[]}
              dropDownPosition="-top-[120px] left-[600px]"
              type="invite"
              setIsOpen={setIsOpen}
              setSelectedRole={handleRoleChange}
              onDelete={handleDelete}
            />
          }
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.member.id === nextProps.member.id;
  }
);

MemberSelect.displayName = 'MemberSelect';

export default MemberSelect;
