import { Button, Chip, InputLabel, Switch } from '@LiteBoard/ui';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {/* <Button color="blue">버튼</Button> */}
      <InputLabel label="이름" required />
      <Switch />
    </div>
  );
}
