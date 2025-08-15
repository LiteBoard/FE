import { cn } from '@/utils/cn';
import { useState, useCallback } from 'react';
import { FolderIcon, PlusIcon } from '@LiteBoard/ui';
import { motion, AnimatePresence } from 'framer-motion';
import {
  sidebarPanelMotion,
  projectItemMotion,
} from '../animation/sidebar.motion';

/**
 * 테스트 용 목록
 */
const initialProjectList = ['프로젝트명', '프로젝트명이길면이렇게...'];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [projectList, setProjectList] = useState(initialProjectList);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

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

  const handleSaveProject = useCallback(() => {
    if (!newProjectName.trim()) {
      setIsAddingProject(false);
      setNewProjectName('');
      return;
    }

    setProjectList(prev => [...prev, newProjectName.trim()]);
    setNewProjectName('');
    setIsAddingProject(false);
  }, [newProjectName]);

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
                  {showContent &&
                    projectList.map((name, idx) => (
                      <motion.li 
                        key={name} 
                        {...projectItemMotion(idx)}
                        className="text-sm text-neutral-700 hover:text-neutral-900 cursor-pointer py-1"
                      >
                        {name}
                      </motion.li>
                    ))}
                    
                  {/* 새 프로젝트 입력 */}
                  {showContent && isAddingProject && (
                    <motion.li 
                      {...projectItemMotion(projectList.length)}
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
                      />
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
