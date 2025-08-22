'use client';
import { Button, ChevronIcon } from '@LiteBoard/ui';
import { useTimelineScrollStore } from '../team/_components/stores/useTimelineScrollStore';

const AddTask = () => {
  const handleAddTask = () => {
    console.log('테스크 추가하기');
  };
  const scrollBy = useTimelineScrollStore((s) => s.scrollBy);
  const scrollToToday = useTimelineScrollStore((s) => s.scrollToToday);

  return (
    <div className="flex justify-between items-center mr-7 ml-11">
      <Button
        color={'blue'}
        variant={'filled'}
        radius={'roundCorner'}
        size={'el'}
        onClick={handleAddTask}
      >
        테스크 추가하기
      </Button>
      <div className="flex gap-2 justify-center items-center text-neutral-700">
        <Button
          variant={'outline'}
          className="px-2 w-10 h-9"
          radius={'roundCorner'}
          onClick={() => scrollBy(-800)}
        >
          <ChevronIcon type="left" size={24} />
        </Button>
        <Button
          variant={'outline'}
          className="px-3 w-[52px] h-9 text-text-T2"
          radius={'roundCorner'}
          onClick={scrollToToday}
        >
          오늘
        </Button>
        <Button
          variant={'outline'}
          className="px-2 w-10 h-9"
          radius={'roundCorner'}
          onClick={() => scrollBy(800)}
        >
          <ChevronIcon type="right" />
        </Button>
      </div>
    </div>
  );
};

export default AddTask;
