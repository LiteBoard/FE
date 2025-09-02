'use client';

import { useState, useCallback } from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

interface CheckboxProps {
  size: 'md' | 'sm';
  label: string;
  checked: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  size,
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
}: CheckboxProps) => {
  const isControlled = controlledChecked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const [hovered, setHovered] = useState(false);

  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const toggle = useCallback(() => {
    const next = !checked;
    if (!isControlled) setUncontrolledChecked(next);
    onChange?.(next);
  }, [checked, isControlled, onChange]);

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
    <div className="flex items-start">
      <button
        type="button"
        className={`${checkboxSize} flex items-center justify-center cursor-pointer`}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={boxStyle}>
          {checked && <Check size={iconSize} color="white" />}
        </div>
      </button>
      <span className={`${labelColor} break-words leading-relaxed ml-2`}>{label}</span>
    </div>
  );
};
