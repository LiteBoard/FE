const sidebarPanelMotion = {
  initial: { width: 0, opacity: 1 },
  animate: { width: '16rem', opacity: 1 },
  exit: { width: 0, opacity: 1 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

const projectItemMotion = (idx: number) => ({
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0 } },
  transition: {
    duration: 0.3,
    delay: 0.15 + idx * 0.08,
  },
});

export { sidebarPanelMotion, projectItemMotion };
