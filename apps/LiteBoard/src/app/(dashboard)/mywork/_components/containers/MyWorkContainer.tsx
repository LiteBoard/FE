"use client";

import { useTasks } from "@/hooks/useTasks";
import { useProjectContext } from "@/providers/ProjectProvider";
import { MyWorkView } from "../ui/MyWorkView";

export const MyWorkContainer = () => {
  const { selectedProjectId } = useProjectContext();
  const { data, isLoading, error } = useTasks(selectedProjectId);

  return (
    <MyWorkView
      selectedProjectId={selectedProjectId}
      data={data}
      isLoading={isLoading}
      error={error}
    />
  );
}; 