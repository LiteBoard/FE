import { Meta, StoryObj } from '@storybook/react';
import {
  AlertIcon,
  CalendarIcon,
  ChevronIcon,
  DotsThreeIcon,
  FolderIcon,
  OpenIcon,
  OutIcon,
  PencilIcon,
  PlusIcon,
  SettingsIcon,
  SettingsMonoIcon,
  SuccessIcon,
  TrashIcon,
  UserIcon,
  WarnIcon,
  XBoldIcon,
  XIcon,
} from './Icon';
import React from 'react';

const meta = {
  title: 'Components/Icon',
  component: FolderIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof FolderIcon>;

export default meta;
type Story = StoryObj<typeof FolderIcon>;

export const AllIcons: Story = {
  render() {
    return (
      <div className="grid grid-cols-8 gap-8 grid-rows-8">
        <div className="flex col-span-1 justify-center items-center">
          <FolderIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <SettingsIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <SettingsMonoIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <OpenIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <PlusIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <XIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <XBoldIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <CalendarIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <TrashIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <DotsThreeIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <AlertIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <ChevronIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <WarnIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <SuccessIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <PencilIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <OutIcon />
        </div>
        <div className="flex col-span-1 justify-center items-center">
          <UserIcon />
        </div>
      </div>
    );
  },
};

export const Default: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <FolderIcon />
        <FolderIcon className="text-red-500" />
        <FolderIcon className="text-blue-500" />
      </div>
    );
  },
};

export const Settings: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <SettingsIcon />
        <SettingsIcon className="text-red-500" />
        <SettingsIcon className="text-blue-500" />
      </div>
    );
  },
};

export const Open: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <OpenIcon />
        <OpenIcon className="text-red-500" />
        <OpenIcon className="text-blue-500" />
      </div>
    );
  },
};

export const Plus: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <PlusIcon />
        <PlusIcon className="text-neutral-500" />
      </div>
    );
  },
};

export const X: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <XIcon />
        <XIcon className="text-red-500" />
      </div>
    );
  },
};

export const Calendar: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <CalendarIcon />
        <CalendarIcon className="text-neutral-500" />
      </div>
    );
  },
};

export const Trash: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <TrashIcon />
        <TrashIcon className="text-neutral-500" />
      </div>
    );
  },
};

export const DotsThree: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <DotsThreeIcon />
        <DotsThreeIcon className="text-neutral-900" />
      </div>
    );
  },
};

export const Alert: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <AlertIcon />
        <AlertIcon className="text-neutral-900" />
      </div>
    );
  },
};

export const Chevron: Story = {
  render() {
    return (
      <div className="flex flex-col space-y-8">
        <div className="flex flex-row space-x-8">
          <ChevronIcon />
          <ChevronIcon type="left" />
          <ChevronIcon type="up" />
          <ChevronIcon type="down" />
        </div>
        <div className="flex flex-row space-x-8">
          <ChevronIcon className="text-red-500" />
          <ChevronIcon type="left" className="text-red-500" />
          <ChevronIcon type="up" className="text-red-500" />
          <ChevronIcon type="down" className="text-red-500" />
        </div>
      </div>
    );
  },
};

export const Warn: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <WarnIcon />
      </div>
    );
  },
};

export const Success: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <SuccessIcon />
      </div>
    );
  },
};

export const Pencil: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <PencilIcon />
      </div>
    );
  },
};

export const SettingsMono: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <SettingsMonoIcon />
        <SettingsMonoIcon className="text-red-500" />
      </div>
    );
  },
};

export const Out: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <OutIcon />
      </div>
    );
  },
};

export const User: Story = {
  render() {
    return (
      <div className="flex flex-row space-x-8">
        <UserIcon />
        <UserIcon width={20} height={20} />
        <UserIcon width={14} height={14} />
      </div>
    );
  },
};
