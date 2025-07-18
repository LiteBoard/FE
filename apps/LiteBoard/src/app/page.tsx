import { Chip, TextField } from '@LiteBoard/ui';

export default function Home() {
  return (
    <div>
      <Chip color="blue" size="md" radius="md" variant="filled">
        라벨
      </Chip>
      <div className="w-[296px] h-[116px]">
        <TextField placeholder="플레이스 홀더" />
      </div>
    </div>
  );
}
