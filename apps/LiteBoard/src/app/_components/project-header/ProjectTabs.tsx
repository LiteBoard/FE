'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ProjectTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-7 items-center">
      {['team', 'mywork'].map((menu, index) => (
        <Link
          key={index}
          href={`/${menu}`}
          className={`text-text-H3 hover:text-neutral-600 transition-colors duration-200 cursor-pointer ${
            pathname === `/${menu}` ? 'text-neutral-800' : 'text-neutral-300'
          }`}
        >
          {menu === 'team' ? '팀' : '내 업무'}
        </Link>
      ))}
    </div>
  );
};
