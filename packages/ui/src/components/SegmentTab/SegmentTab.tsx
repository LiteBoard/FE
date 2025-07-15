'use client';

import { Tabs, TabsList, TabsTrigger } from '../Tabs';

interface SegmentTabItem {
  label: string;
  value: string;
}

interface SegmentTabProps {
  items: SegmentTabItem[];
  onSelect: (value: string) => void;
  darkMode?: boolean;
}

export const SegmentTab = ({
  items,
  onSelect,
  darkMode = false,
}: SegmentTabProps) => {
  return (
    <Tabs defaultValue={items[0]?.value} onValueChange={onSelect}>
      <TabsList isDarkMode={darkMode}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            isDarkMode={darkMode}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

SegmentTab.displayName = 'SegmentTab';
