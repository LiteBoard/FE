import { useState, useCallback } from 'react';
import { useToggleTodos } from '@/hooks/mutations/todo/useToggleTodos';

/**
 * 투두 배치 토글 처리를 위한 훅
 * @returns 배치 처리 관련 함수들과 상태
 */
export const useBatchTodoToggle = () => {
  const [pendingChanges, setPendingChanges] = useState<Map<number, boolean>>(new Map());
  const toggleTodosMutation = useToggleTodos();

  // 배치 처리 함수
  const processBatchChanges = useCallback(async () => {
    if (pendingChanges.size === 0) return;

    const todoIds = Array.from(pendingChanges.keys());
    
    try {
      await toggleTodosMutation.mutateAsync(todoIds);
      setPendingChanges(new Map()); // 성공 시 변경사항 초기화
    } catch (error) {
      console.error('투두 상태 변경 실패:', error);
      // 실패 시 변경사항 유지 (사용자가 다시 시도할 수 있도록)
    }
  }, [pendingChanges, toggleTodosMutation]);

  // 투두 토글 핸들러
  const handleTodoToggle = useCallback((todoId: number, currentDone: boolean) => {
    const newDone = !currentDone;
    
    // 즉시 UI 업데이트 (낙관적 업데이트)
    setPendingChanges(prev => new Map(prev).set(todoId, newDone));
  }, []);

  // 현재 투두 상태 계산 (pendingChanges 반영)
  const getCurrentTodoState = useCallback((todoId: number, originalChecked: boolean) => {
    return pendingChanges.has(todoId) 
      ? pendingChanges.get(todoId)! 
      : originalChecked;
  }, [pendingChanges]);

  return {
    pendingChanges,
    processBatchChanges,
    handleTodoToggle,
    getCurrentTodoState,
    isPending: toggleTodosMutation.isPending,
  };
}; 