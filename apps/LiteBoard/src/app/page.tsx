import { Button, Progress } from '@LiteBoard/ui';

export default function Home() {
  return (
    <div>
      {/* <Button color="blue">버튼</Button> */}
      <Progress current={3} total={10} />
    </div>
  );
}
