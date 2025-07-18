import React from 'react';
import { TextField } from './TextField';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => (
    <TextField placeholder="플레이스 홀더" className="w-[296px] h-[116px]" />
  ),
};

export const Long: Story = {
  render: () => (
    <TextField
      placeholder="플레이스 홀더"
      className="w-[296px] h-[116px]"
      value={
        '이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.이것은 텍스트필드 컴포넌트입니다.'
      }
    />
  ),
};
