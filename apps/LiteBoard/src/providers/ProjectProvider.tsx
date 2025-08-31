'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useProjectList } from '@/hooks/queries';

interface ProjectContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: (projectId: number | null) => void;
  selectedProjectName: string | null;
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
  const { data: projects } = useProjectList();

  const selectedProjectName = selectedProjectId 
    ? projects?.find(project => project.id === selectedProjectId)?.title || null
    : null;

  useEffect(() => {
    if (projects && projects.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(projects[0]!.id);
    }
  }, [projects, selectedProjectId]);

  return (
    <ProjectContext.Provider value={{ selectedProjectId, setSelectedProjectId, selectedProjectName }}>
      {children}
    </ProjectContext.Provider>
  );
}; 