import { Profile } from '@LiteBoard/ui';
import { Role } from './constants/role';
import MemberSelect from './member-select';
import getRoleName from './utils/util-getRoleName';
import { useCallback } from 'react';

interface MockMember {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// 프로젝트 관리자 여부 임시 체킹
const IS_PROJECT_ADMIN = true;

// 임시 더미 데이터
const MOCK_MEMBERS: MockMember[] = [
  { id: '1', name: '김철수', email: 'kim@example.com', role: Role.VIEWER },
  { id: '2', name: '이영희', email: 'lee@example.com', role: Role.EDITOR },
  { id: '3', name: '박민수', email: 'park@example.com', role: Role.ADMIN },
  { id: '4', name: '최영희', email: 'choi@example.com', role: Role.VIEWER },
  { id: '5', name: '정민수', email: 'jeong@example.com', role: Role.EDITOR },
  { id: '6', name: '유영희', email: 'yu@example.com', role: Role.ADMIN },
  { id: '7', name: '박철수', email: 'park@example.com', role: Role.VIEWER },
  { id: '8', name: '이영희', email: 'lee@example.com', role: Role.EDITOR },
  { id: '9', name: '박민수', email: 'park@example.com', role: Role.ADMIN },
  { id: '10', name: '최영희', email: 'choi@example.com', role: Role.VIEWER },
];

const MemberList = () => {
  const handleRoleChange = useCallback((memberId: string, newRole: Role) => {
    // TODO: 멤버 권한 변경 로직 추가
    console.log('변경', memberId, newRole);
  }, []);

  const handleDeleteMember = useCallback((memberId: string) => {
    // TODO: 멤버 삭제 로직 추가
    console.log('삭제', memberId);
  }, []);

  return (
    <div className="relative w-full">
      <div className="w-full flex flex-col items-start gap-4 h-[294px] overflow-y-auto scrollbar-hide">
        {MOCK_MEMBERS.map((member) => (
          <div
            id={`member-${member.id}`}
            key={member.id}
            className="flex justify-between items-center px-2 py-1 w-full transition-all duration-200 hover:bg-neutral-100 hover:rounded-lg"
          >
            <div className="flex gap-2 justify-between items-center">
              <Profile name={member.name} size="lg" />
              <div className="flex flex-col gap-1">
                <p className="text-neutral-800 text-text-B2M">{member.name}</p>
                <p className="text-neutral-500 text-text-caption">
                  {member.email}
                </p>
              </div>
            </div>

            {IS_PROJECT_ADMIN ? (
              <MemberSelect
                member={member}
                onRoleChange={handleRoleChange}
                onDelete={handleDeleteMember}
              />
            ) : (
              <div className="flex gap-2 justify-between items-center">
                <p className="text-neutral-500 text-text-B3R">
                  {getRoleName(member.role)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
