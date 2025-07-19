import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    checked: false,
  },
  argTypes: {
    onCheckedChange: { action: 'checked changed' },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

export const Controlled: Story = {
  args: {
    checked: false,
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex items-center gap-4">
        <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm text-neutral-600">
          상태: {checked ? '켜짐' : '꺼짐'}
        </span>
      </div>
    );
  },
};

export const MultipleSwitches: Story = {
  render: () => {
    const [states, setStates] = React.useState({
      notifications: true,
      email: false,
      sms: true,
    });

    const handleChange = (key: string, checked: boolean) => {
      setStates((prev) => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">알림</span>
          <Switch
            checked={states.notifications}
            onCheckedChange={(checked) =>
              handleChange('notifications', checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">이메일</span>
          <Switch
            checked={states.email}
            onCheckedChange={(checked) => handleChange('email', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">SMS</span>
          <Switch
            checked={states.sms}
            onCheckedChange={(checked) => handleChange('sms', checked)}
          />
        </div>
      </div>
    );
  },
};
