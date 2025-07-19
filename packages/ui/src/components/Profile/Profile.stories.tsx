import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';
import React from 'react';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['corral', 'blue', 'skyBlue', 'purple'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    name: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Playground: Story = {
  args: {
    name: 'Kim',
    variant: 'blue',
    size: 'md',
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-screen">
      <Profile {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4">
        <Profile name="K" variant="corral" />
        <Profile name="K" variant="blue" />
        <Profile name="K" variant="skyBlue" />
        <Profile name="K" variant="purple" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex gap-4 items-end">
        <Profile name="K" size="sm" variant="blue" />
        <Profile name="K" size="md" variant="blue" />
        <Profile name="K" size="lg" variant="blue" />
      </div>
    </div>
  ),
};

export const OverlappingGroup: Story = {
  render: () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex">
        <div className="z-10"><Profile name="K" variant="skyBlue" /></div>
        <div className="-ml-2 z-20"><Profile name="K" variant="blue" /></div>
        <div className="-ml-2 z-30"><Profile name="K" variant="purple" /></div>
        <div className="-ml-2 z-40"><Profile name="K" variant="corral" /></div>
        <div className="-ml-2 z-50">
          <Profile name="00" variant="blue" />
        </div>
      </div>
    </div>
  ),
};
