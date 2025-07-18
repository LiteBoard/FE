import React from 'react';
import { Skeleton } from './Skeleton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: { control: 'text' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-2  grid-rows-[1fr_auto] gap-4 w-96">
      <Skeleton className="row-span-1 h-10" />
      <Skeleton className="row-span-1 h-10" />
      <Skeleton className="col-span-2 h-10" />
    </div>
  ),
};
