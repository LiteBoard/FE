import { cn } from '@/utils/cn';
import { useState } from 'react';
import { FolderIcon } from '@LiteBoard/ui';
import { motion, AnimatePresence } from 'framer-motion';
import {
  sidebarPanelMotion,
  projectItemMotion,
} from '../animation/sidebar.motion';

/**
 * 테스트 용 목록
 */
const projectList = ['프로젝트명', '프로젝트명이길면이렇게...'];

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleToggle = () => {
    if (open) {
      setShowContent(false);
      setTimeout(() => setOpen(false), 50);
    } else {
      setOpen(true);
    }
  };

  return (
    <aside className="flex flex-col justify-start items-center h-full">
      <button
        className="flex flex-col gap-2 justify-center items-center select-none text-text-T3 text-neutral-700"
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
              <ul className="flex flex-col gap-2">
                <AnimatePresence>
                  {showContent &&
                    projectList.map((name, idx) => (
                      <motion.li key={name} {...projectItemMotion(idx)}>
                        {name}
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
