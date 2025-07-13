import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: {
    current: 2,
    total: 5,
  },
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const VariousProgress: Story = {
  render: () => (
    <div className="space-y-3">
      <Progress current={0} total={5} />
      <Progress current={1} total={5} />
      <Progress current={2} total={5} />
      <Progress current={3} total={5} />
      <Progress current={5} total={5} />
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    current: 3,
    total: 10,
    className: 'bg-red-50 p-2 rounded',
  },
};
