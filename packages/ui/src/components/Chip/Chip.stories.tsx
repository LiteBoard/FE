import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['filled', 'weak'],
    },
    color: {
      control: 'radio',
      options: ['blue', 'green', 'red', 'black', 'gray'],
    },
    size: {
      control: 'radio',
      options: ['lg', 'md', 'sm'],
    },
    radius: {
      control: 'radio',
      options: ['max', 'md'],
    },
    children: { control: 'text' },
  },
  args: {
    children: 'Example Chip',
    variant: 'filled',
    color: 'blue',
    size: 'md',
    radius: 'max',
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center justify-center">
      <Chip {...args} />
    </div>
  ),
};

export const FilledVariants: Story = {
  render: () => (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <Chip size="lg" variant="filled" color="blue" radius="md">라벨</Chip>
        <Chip size="md" variant="filled" color="green" radius="md">라벨</Chip>
        <Chip size="sm" variant="filled" color="red" radius="md">라벨</Chip>
        <Chip size="sm" variant="filled" color="black" radius="md">라벨</Chip>
      </div>
    </div>
  ),
  args: {
    variant: 'filled',
    size: 'md',
    radius: 'max',
  },
};

export const WeakVariants: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-3">
        <Chip variant="weak" color="blue">라벨</Chip>
        <Chip variant="weak" color="green">라벨</Chip>
        <Chip variant="weak" color="red">라벨</Chip>
        <Chip variant="weak" color="black">라벨</Chip>
      </div>
    </div>
  ),
  args: {
    variant: 'weak',
    size: 'md',
    radius: 'max',
  },
};
