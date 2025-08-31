'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/util';
import { cva, VariantProps } from 'class-variance-authority';

export const panelVariants = cva(
  'fixed top-0 bg-white shadow-[-4px_3px_10px_0px_rgba(139,149,161,0.05)] z-50 border-neutral-200',
  {
    variants: {
      position: {
        left: 'left-0 border-r',
        right: 'right-0 border-l',
      },
      width: {
        sm: 'w-[400px]',
        md: 'w-[600px]',
        lg: 'w-[816px]',
        xl: 'w-[1024px]',
      },
      height: {
        full: 'h-full',
        fixed: 'h-[968px]',
        auto: 'h-auto',
      },
    },
    defaultVariants: {
      position: 'right',
      width: 'lg',
      height: 'full',
    },
  }
);

export interface PanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClose'>,
    VariantProps<typeof panelVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showOverlay?: boolean;
  overlayClassName?: string;
  customWidth?: string;
  customHeight?: string;
}

export const Panel = ({
  isOpen,
  onClose,
  children,
  position,
  width,
  height,
  customWidth,
  customHeight,
  showOverlay = true,
  overlayClassName,
  className,
}: PanelProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const panelMotion = {
    initial: { 
      x: position === 'right' ? '-100%' : '100%',  // 왼쪽에서 시작하도록 변경
      opacity: 0 
    },
    animate: { 
      x: 0,  // 중앙으로 이동
      opacity: 1 
    },
    exit: { 
      x: position === 'right' ? '-100%' : '100%',  // 왼쪽으로 사라지도록 변경
      opacity: 0 
    },
    transition: { 
      type: 'spring' as const, 
      stiffness: 300, 
      damping: 30,
      duration: 0.3 
    },
  };

  const overlayMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          {showOverlay && (
            <motion.div
              {...overlayMotion}
              className={cn(
                'fixed inset-0 bg-black bg-opacity-20 z-40',
                overlayClassName
              )}
              onClick={handleOverlayClick}
            />
          )}
          
          {/* Panel */}
          <motion.div
            {...panelMotion}
            className={cn(
              panelVariants({ position, width, height }),
              customWidth && `w-[${customWidth}]`,
              customHeight && `h-[${customHeight}]`,
              className
            )}
            onKeyDown={handleKeyDown}
            tabIndex={-1}

          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Panel.displayName = 'Panel'; 