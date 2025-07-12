import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './Button';

const meta = {
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<ButtonProps>;

const Default: Story = {
  args: {
    children: '버튼',
  },
};

const Variants: Story = {
  render: () => (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-8">
        <p>black</p>
        <Button variant="filled">버튼</Button>
        <Button variant="weak">버튼</Button>
        <Button variant="outline">버튼</Button>
        <Button variant="borderless">버튼</Button>
      </div>
      <div className="flex flex-col space-y-8">
        <p>blue</p>
        <Button variant="filled" color="blue">
          버튼
        </Button>
        <Button variant="weak" color="blue">
          버튼
        </Button>
        <Button variant="outline" color="blue">
          버튼
        </Button>
        <Button variant="borderless" color="blue">
          버튼
        </Button>
      </div>
      <div className="flex flex-col space-y-8">
        <p>red</p>
        <Button variant="filled" color="red">
          버튼
        </Button>
        <Button variant="weak" color="red">
          버튼
        </Button>
        <Button variant="outline" color="red">
          버튼
        </Button>
      </div>
    </div>
  ),
  args: {
    color: 'black',
    variant: 'filled',
    radius: 'roundCorner',
    size: 'el',
  },
};

const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <p>el</p>
      <Button size="el">버튼</Button>
      <p>lg</p>
      <Button size="lg">버튼</Button>
      <p>md</p>
      <Button size="md">버튼</Button>
    </div>
  ),
  args: {
    color: 'black',
    variant: 'filled',
    radius: 'roundCorner',
  },
};

const Radii: Story = {
  render: () => (
    <div className="flex flex-col space-y-8">
      <Button radius="max">버튼</Button>
      <Button radius="roundCorner">버튼</Button>
    </div>
  ),
  args: {
    color: 'black',
    variant: 'filled',
    size: 'lg',
  },
};

const LongText: Story = {
  render: () => (
    <div className="flex flex-col items-start space-y-8">
      <Button>short</Button>
      <Button>medium</Button>
      <Button>very long</Button>
      <Button>very very long</Button>
      <Button>very very very long</Button>
      <Button>very very very very long</Button>
    </div>
  ),
  args: {
    color: 'black',
    variant: 'filled',
    size: 'lg',
  },
};

export { Default, Variants, Sizes, Radii, LongText };
