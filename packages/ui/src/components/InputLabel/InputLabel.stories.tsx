import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { InputLabel } from './InputLabel';

const meta: Meta<typeof InputLabel> = {
  title: 'Components/InputLabel',
  component: InputLabel,
  tags: ['autodocs'],
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
  },
};

export default meta;
type Story = StoryObj<typeof InputLabel>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: undefined,
    placeholder: '값을 입력해주세요',
  },
};

export const CustomWidth: Story = {
  args: {
    className: 'w-[200px]',
    label: '짧은 입력',
  },
};
