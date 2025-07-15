import type { Meta, StoryObj } from '@storybook/react';
import { SegmentTab } from './SegmentTab';
import React from 'react';

const meta: Meta<typeof SegmentTab> = {
  title: 'Components/SegmentTab',
  component: SegmentTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: '라벨',
        value: 'tab1',
      },
      {
        label: '라벨',
        value: 'tab2',
      },
    ],
  },
};

export const Three: Story = {
  args: {
    items: [
      {
        label: '라벨',
        value: 'tab1',
      },
      {
        label: '라벨',
        value: 'tab2',
      },
      {
        label: '라벨',
        value: 'tab3',
      },
    ],
  },
};

export const Dark: Story = {
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <SegmentTab {...args} />
      <SegmentTab {...args} darkMode />
    </div>
  ),
  args: {
    items: [
      {
        label: '라벨',
        value: 'tab1',
      },
      {
        label: '라벨',
        value: 'tab2',
      },
    ],
  },
};

export const LongText: Story = {
  args: {
    items: [
      {
        label: '이것은 왼쪽 탭 라벨입니다.',
        value: 'tab1',
      },
      {
        label: '이것은 오른쪽 탭 라벨입니다.',
        value: 'tab2',
      },
    ],
  },
};

const ShowSelectedLabelStory = () => {
  const items = [
    { label: '탭1', value: 'tab1' },
    { label: '탭2', value: 'tab2' },
    { label: '탭3', value: 'tab3' },
  ];
  const [value, setValue] = React.useState(items[0].value);

  const selectedLabel = items.find((item) => item.value === value)?.label;

  return (
    <div className="flex flex-col space-y-4">
      <SegmentTab items={items} onSelect={setValue} />
      <div>
        선택된 탭: <b>{selectedLabel}</b>
      </div>
    </div>
  );
};

export const ShowSelectedLabel: Story = {
  render: () => <ShowSelectedLabelStory />,
};
