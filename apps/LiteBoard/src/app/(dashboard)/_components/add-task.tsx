'use client';
import { Button } from '@LiteBoard/ui';

const AddTask = () => {
  const handleAddTask = () => {
    console.log('테스크 추가하기');
  };

  return (
    <div className="ml-11 w-[139px]">
      <Button
        color={'blue'}
        variant={'filled'}
        radius={'roundCorner'}
        size={'el'}
        onClick={handleAddTask}
      >
        테스크 추가하기
      </Button>
    </div>
  );
};

export default AddTask;
