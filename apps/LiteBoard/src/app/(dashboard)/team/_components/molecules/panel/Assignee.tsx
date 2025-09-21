import React, { useState, useRef } from 'react';
import { Profile, Button, XBoldIcon, ChevronIcon } from '@LiteBoard/ui';
import { Assignee as AssigneeType } from '../../types/panel';
import { useProjectMembers } from '@/hooks/queries/project/useProjectMembers';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';

interface AssigneeProps {
  assignee: AssigneeType;
  projectId?: number;
}

const Assignee = ({ assignee, projectId }: AssigneeProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 프로젝트 멤버 조회
  const { data: projectMembers, isLoading, error } = useProjectMembers(projectId || 0);

  // 드롭다운 외부 클릭 시 닫기
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleAssigneeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMemberSelect = (member: any) => {
    console.log('선택된 멤버:', member);
    setIsDropdownOpen(false);
    // TODO: 담당자 변경 API 호출
  };

  return (
    <div className="flex items-center gap-[64px]">
      <span className="text-text-B3M text-neutral-700">담당자</span>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 rounded-lg p-2 transition-colors"
          onClick={handleAssigneeClick}
        >
          <Profile name={assignee.nickname.charAt(0)} size="lg" variant="skyBlue" />
          <span className="text-text-B1M text-neutral-800">{assignee.nickname}</span>
          <ChevronIcon
            width={16}
            height={16}
            className={`text-neutral-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
          <Button variant="borderless" size="md" onClick={(e) => e.stopPropagation()}>
            <XBoldIcon width={16} height={16} />
          </Button>
        </div>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
            {!projectId ? (
              <div className="p-3 text-center text-neutral-500">프로젝트 ID가 필요합니다</div>
            ) : isLoading ? (
              <div className="p-3 text-center text-neutral-500">로딩 중...</div>
            ) : error ? (
              <div className="p-3 text-center text-red-500">에러: {error.message}</div>
            ) : projectMembers && projectMembers.length > 0 ? (
              <div className="py-2">
                {projectMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 cursor-pointer"
                    onClick={() => handleMemberSelect(member)}
                  >
                    <Profile
                      name={member.nickname.charAt(0)}
                      size="md"
                      variant="blue"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-neutral-800">
                        {member.nickname}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {member.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-neutral-500">
                <div>멤버가 없습니다</div>
                <div className="text-xs mt-1">Project ID: {projectId}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignee; 