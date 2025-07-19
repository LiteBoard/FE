'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps {
  size: 'md' | 'sm';
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  size,
  label,
  defaultChecked = false,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const [hovered, setHovered] = useState(false);
  const [pendingChange, setPendingChange] = useState<boolean | null>(null);


  useEffect(() => {
    if (pendingChange !== null) {
      onChange?.(pendingChange);
      setPendingChange(null);
    }
  }, [pendingChange, onChange]);

  const toggle = useCallback(() => {
    setChecked((prev) => {
      const next = !prev;
      setPendingChange(next);
      return next;
    });
  }, []);

  const checkboxSize = size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
  const iconSize = size === 'md' ? 14 : 12;
  const labelSize =
    size === 'md' ? 'text-base font-medium' : 'text-sm font-normal';

  const boxStyle = clsx(
    'flex items-center justify-center rounded-[6px] border-2 transition-colors',
    checkboxSize,
    {
      'border-netural-300 bg-white': !checked && !hovered,
      'border-blue-200 bg-blue-50': !checked && hovered,
      'bg-blue-500 border-blue-500': checked,
    }
  );

  const labelColor = clsx('ml-2', labelSize, {
    'text-netural-700':
      (!checked && size === 'md') || (!checked && size === 'sm'),
    'text-blue-500': checked,
  });

  return (
    <button
      type="button"
      className="flex items-center cursor-pointer w-full"
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={boxStyle}>
        {checked && <Check size={iconSize} color="white" />}
      </div>
      <span className={`${labelColor} truncate`}>{label}</span>
    </button>
  );
};
