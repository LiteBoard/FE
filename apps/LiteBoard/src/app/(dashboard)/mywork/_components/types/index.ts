import React from 'react';

// TaskList 컴포넌트의 반환 타입들
export type TaskListLoadingReturn = React.JSX.Element;
export type TaskListErrorReturn = React.JSX.Element;
export type TaskListEmptyReturn = React.JSX.Element;
export type TaskListDataReturn = React.JSX.Element;

// TaskList 컴포넌트의 전체 반환 타입
export type TaskListReturn = 
  | TaskListLoadingReturn 
  | TaskListErrorReturn 
  | TaskListEmptyReturn 
  | TaskListDataReturn;

// 태스크 상태 타입
export type TaskStatus = 'latest' | 'notLatest' | 'delayed' | 'finished'; 