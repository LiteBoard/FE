"use client";

import React from 'react';
import { TodoCard } from './TodoCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TodoCard> = {
  title: 'Components/TodoCard',
  component: TodoCard,
};

export default meta;

type Story = StoryObj<typeof TodoCard>;

const mockTodos = [
  {
    id: '1',
    text: 'Figma 디자인 공유',
    checked: false,
    assignee: '성균',
    requested: true,
  },
  {
    id: '2',
    text: 'API 명세서 작성',
    checked: true,
    assignee: '지연',
  },
  {
    id: '3',
    text: '기획 회의 정리',
    checked: false,
    assignee: '지훈',
  },
];

export const Latest: Story = {
  args: {
    status: 'latest',
    title: '스프린트 마감 전',
    todos: mockTodos,
  },
};

export const NotLatest: Story = {
  args: {
    status: 'notLatest',
    title: '내일 마감',
    todos: mockTodos,
  },
};

export const Delayed: Story = {
  args: {
    status: 'delayed',
    title: '마감 지연',
    todos: mockTodos,
  },
};

export const Finished: Story = {
  args: {
    status: 'finished',
    title: '완료된 업무',
    todos: mockTodos.map((todo) => ({ ...todo, checked: true })),
  },
};