import React, { useState, useRef } from 'react';
import { Profile } from '@LiteBoard/ui';
import { Assignee as AssigneeType } from '../../types/panel';
import { useProjectMembers } from '@/hooks/queries/project/useProjectMembers';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';
import { ProjectMember } from '@/types/member';
import { useAssignTaskMembers, useRemoveTaskMember } from '@/hooks/mutations/task';

interface AssigneeProps {
  assignee: AssigneeType;
  projectId?: number | null;
  taskId?: number;
}

const Assignee = ({ assignee, projectId, taskId }: AssigneeProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 프로젝트 멤버 조회
  const { data: projectMembers, isLoading, error } = useProjectMembers(projectId || 0);

  // 담당자 배정/제거 훅
  const assignTaskMembersMutation = useAssignTaskMembers();
  const removeTaskMemberMutation = useRemoveTaskMember();

  // 드롭다운 외부 클릭 시 닫기
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  const handleAssigneeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMemberSelect = async (member: ProjectMember) => {
    if (!taskId) {
      console.error('Task ID가 필요합니다');
      return;
    }

    try {
      console.log('선택된 멤버:', member);

      // 현재 담당자 ID 배열 생성
      const currentAssigneeIds = Array.isArray(assignee)
        ? assignee.map(a => a.id)
        : [assignee.id];

      // 이미 담당자인지 확인
      if (currentAssigneeIds.includes(member.id)) {
        // 담당자 제거
        console.log('담당자 제거:', member.nickname);
        await removeTaskMemberMutation.mutateAsync({
          taskId,
          memberId: member.id
        });
        console.log('담당자 제거 완료:', member.nickname);
      } else {
        // 새로운 담당자 추가
        console.log('담당자 추가:', member.nickname);
        const newMemberIds = [...currentAssigneeIds, member.id];

        await assignTaskMembersMutation.mutateAsync({
          taskId,
          memberIds: newMemberIds
        });
        console.log('담당자 배정 완료:', member.nickname);
      }

      // 드롭다운을 닫지 않고 유지
      // setIsDropdownOpen(false); // 제거
    } catch (error) {
      console.error('담당자 변경 실패:', error);
    }
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
                {projectMembers.map((member) => {
                  const currentAssigneeIds = Array.isArray(assignee)
                    ? assignee.map(a => a.id)
                    : [assignee.id];
                  const isAssigned = currentAssigneeIds.includes(member.id);

                  return (
                    <div
                      key={member.id}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                        isAssigned
                          ? 'bg-blue-50 hover:bg-blue-100'
                          : 'hover:bg-neutral-50'
                      }`}
                      onClick={() => handleMemberSelect(member)}
                    >
                      <Profile
                        name={member.nickname.charAt(0)}
                        size="md"
                        variant="blue"
                      />
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          isAssigned ? 'text-blue-800' : 'text-neutral-800'
                        }`}>
                          {member.nickname}
                        </div>
                        <div className={`text-xs ${
                          isAssigned ? 'text-blue-600' : 'text-neutral-500'
                        }`}>
                          {member.email}
                        </div>
                      </div>
                    </div>
                  );
                })}
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