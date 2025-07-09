import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: { control: 'select', options: ['black', 'blue', 'red'] },
    variant: {
      control: 'select',
      options: ['filled', 'weak', 'outline', 'borderless'],
    },
    radius: { control: 'select', options: ['max', 'roundCorner'] },
    size: { control: 'select', options: ['el', 'lg', 'md'] },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<ButtonProps>;

export const Filled = {
  args: {
    color: 'black',
    variant: 'filled',
    radius: 'max',
    size: 'el',
    children: '라벨',
  },
} satisfies Story;

export const Weak = {
  args: {
    color: 'blue',
    variant: 'weak',
    radius: 'roundCorner',
    size: 'lg',
    children: '라벨',
  },
} satisfies Story;

export const Outline = {
  args: {
    color: 'red',
    variant: 'outline',
    radius: 'roundCorner',
    size: 'md',
    children: '라벨',
  },
} satisfies Story;

export const Borderless = {
  args: {
    color: 'black',
    variant: 'borderless',
    radius: 'max',
    size: 'md',
    children: '라벨',
  },
} satisfies Story;
