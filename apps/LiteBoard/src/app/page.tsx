import { Button, Chip, Profile} from '@LiteBoard/ui';

export default function Home() {
  return (
    <div>
      {/* <Button color="blue">버튼</Button> */}
      <Chip color="blue" size="md" radius="md" variant="filled">
        라벨
      </Chip>
      <Profile name="John Doe" size="md" variant="blue" />
    </div>
  );
}
