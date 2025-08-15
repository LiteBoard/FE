'use client';

import { cn } from '@/utils/cn';
import { useState, useCallback } from 'react';
import { FolderIcon, PlusIcon } from '@LiteBoard/ui';
import { motion, AnimatePresence } from 'framer-motion';
import {
  sidebarPanelMotion,
  projectItemMotion,
} from '../animation/sidebar.motion';
import { useProjects, useCreateProject } from '@/hooks/useProjects';
import { useProjectContext } from '@/providers/ProjectProvider';

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const { selectedProjectId, setSelectedProjectId } = useProjectContext();

  const { data: projects, isLoading, error } = useProjects();
  const createProjectMutation = useCreateProject();

  const handleToggle = () => {
    if (open) {
      setShowContent(false);
      setTimeout(() => setOpen(false), 50);
    } else {
      setOpen(true);
    }
  };

  const handleAddProject = useCallback(() => {
    setIsAddingProject(true);
  }, []);

  const handleSaveProject = useCallback(async () => {
    if (!newProjectName.trim()) {
      setIsAddingProject(false);
      setNewProjectName('');
      return;
    }

    try {
      // 기본 날짜 설정 (현재 날짜부터 3개월 후)
      const now = new Date();
      const startDate = now.toISOString().split('T')[0]!;
      const endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]!;

      await createProjectMutation.mutateAsync({
        title: newProjectName.trim(),
        startDate,
        endDate,
      });

      setNewProjectName('');
      setIsAddingProject(false);
    } catch (error) {
      console.error('프로젝트 생성 실패:', error);
      // 에러 발생 시 인풋 필드는 유지하여 재시도 가능하도록 함
    }
  }, [newProjectName, createProjectMutation]);

  const handleCancelProject = useCallback(() => {
    setNewProjectName('');
    setIsAddingProject(false);
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveProject();
    } else if (e.key === 'Escape') {
      handleCancelProject();
    }
  }, [handleSaveProject, handleCancelProject]);

  const handleProjectSelect = useCallback((projectId: number) => {
    setSelectedProjectId(projectId);
  }, []);

  return (
    <aside className="flex flex-col justify-start items-center h-full">
      <button
        className="flex flex-col gap-2 justify-center items-center text-text-T3 text-neutral-700"
        onClick={handleToggle}
      >
        <div
          className={cn(
            'py-2 px-[18px] rounded-2xl hover:bg-neutral-200 active:bg-neutral-300 transition-colors duration-200',
            open && 'bg-neutral-200'
          )}
        >
          <FolderIcon />
        </div>
        프로젝트
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...sidebarPanelMotion}
            style={{ overflow: 'hidden' }}
            className="flex fixed bottom-0 left-[92px] z-50 flex-col h-[calc(100vh-56px)] bg-neutral-50 shadow-sidebar rounded-r-4xl"
            onAnimationComplete={() => {
              if (open) setShowContent(true);
            }}
          >
            <div className="px-4 py-8">
              {/* 프로젝트 헤더 */}
              {showContent && (
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-neutral-700">프로젝트</h3>
                  <button
                    onClick={handleAddProject}
                    className="p-1 rounded hover:bg-neutral-200 transition-colors"
                  >
                    <PlusIcon width={16} height={16} className="text-neutral-600" />
                  </button>
                </div>
              )}

              <ul className="flex flex-col gap-2">
                <AnimatePresence>
                  {/* 로딩 상태 */}
                  {showContent && isLoading && (
                    <motion.li className="text-sm text-neutral-500 py-1">
                      프로젝트 로딩 중...
                    </motion.li>
                  )}

                  {/* 에러 상태 */}
                  {showContent && error && (
                    <motion.li className="text-sm text-red-500 py-1">
                      프로젝트 로딩 실패
                    </motion.li>
                  )}

                  {/* 프로젝트 목록 */}
                  {showContent && projects &&
                    projects.map((project, idx) => (
                      <motion.li 
                        key={project.id} 
                        {...projectItemMotion(idx)}
                        className={cn(
                          "text-sm cursor-pointer py-1 px-2 rounded transition-colors duration-200",
                          selectedProjectId === project.id
                            ? "bg-neutral-300 text-neutral-900"
                            : "text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900"
                        )}
                        onClick={() => handleProjectSelect(project.id)}
                      >
                        {project.title}
                      </motion.li>
                    ))}
                    
                  {/* 새 프로젝트 입력 */}
                  {showContent && isAddingProject && (
                    <motion.li 
                      {...projectItemMotion(projects?.length || 0)}
                      className="py-1"
                    >
                      <input
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onBlur={handleSaveProject}
                        placeholder="프로젝트명을 입력하세요..."
                        className="w-full px-2 py-1 text-sm bg-transparent border-0 border-b border-neutral-300 rounded-none focus:outline-none focus:border-b-neutral-500 focus:border-b-2"
                        autoFocus
                        disabled={createProjectMutation.isPending}
                      />
                      {createProjectMutation.isPending && (
                        <div className="text-xs text-neutral-500 mt-1">생성 중...</div>
                      )}
                    </motion.li>
                  )}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
