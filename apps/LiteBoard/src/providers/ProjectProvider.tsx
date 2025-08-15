'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useProjects } from '@/hooks/useProjects';

interface ProjectContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: (projectId: number | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const { data: projects } = useProjects();

  // 프로젝트 목록이 로드되면 첫 번째 프로젝트를 자동 선택
  useEffect(() => {
    if (projects && projects.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(projects[0]!.id);
    }
  }, [projects, selectedProjectId]);

  return (
    <ProjectContext.Provider value={{ selectedProjectId, setSelectedProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
}; 