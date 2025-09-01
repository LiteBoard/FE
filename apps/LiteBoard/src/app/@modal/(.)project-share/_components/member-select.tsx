import { useClickOutside } from '@/hooks/utils/useClickOutSide';
import { ALL_OPTIONS, Role, RoleOption } from './constants/role';
import useRoleSelect from './hooks/useRoleSelect';
import RoleDropdown from './role-dropdown';
import RoleSelect from './role-select';
import { memo, useRef } from 'react';

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

    useClickOutside(ref, () => {
      setIsOpen(false);
    });

    const handleRoleChange = (role: Role) => {
      setSelectedRole(role);
      onRoleChange(member.id, role);
    };

    const handleDelete = () => {
      onDelete(member.id);
    };

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
  }
);

MemberSelect.displayName = 'MemberSelect';

export default MemberSelect;
