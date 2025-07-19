import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['md', 'sm'],
    },
    defaultChecked: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    onChange: {
      action: 'changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const MediumUnchecked: Story = {
  args: {
    size: 'md',
    label: '라벨',
    defaultChecked: false,
  },
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center">
      <Checkbox {...args} />
    </div>
  ),
};

export const MediumChecked: Story = {
  args: {
    size: 'md',
    label: '라벨',
    defaultChecked: true,
  },
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center">
      <Checkbox {...args} />
    </div>
  ),
};

export const SmallUnchecked: Story = {
  args: {
    size: 'sm',
    label: '라벨',
    defaultChecked: false,
  },
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center">
      <Checkbox {...args} />
    </div>
  ),
};

export const SmallChecked: Story = {
  args: {
    size: 'sm',
    label: '라벨',
    defaultChecked: true,
  },
  render: (args) => (
    <div className="w-full h-screen flex items-center justify-center">
      <Checkbox {...args} />
    </div>
  ),
};
