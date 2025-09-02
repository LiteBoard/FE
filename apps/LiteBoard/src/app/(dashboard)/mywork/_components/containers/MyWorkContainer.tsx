"use client";

import { useProjectMyTasks } from "@/hooks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { MyWorkView } from "../ui/MyWorkView";

export const MyWorkContainer = () => {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useProjectMyTasks(selectedProjectId);

  return (
    <MyWorkView
      selectedProjectId={selectedProjectId}
      data={data}
      isLoading={isLoading}
      error={error}
    />
  );
}; 