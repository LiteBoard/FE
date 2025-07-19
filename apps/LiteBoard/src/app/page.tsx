import { Button, Chip, Profile, TodoCard } from '@LiteBoard/ui';

export default function Home() {
  return (
    <div>
      {/* <Button color="blue">버튼</Button> */}
      <Chip color="blue" size="md" radius="md" variant="filled">
        라벨
      </Chip>
      <Profile name="John Doe" size="md" variant="blue" />
      <TodoCard
        status="latest"
        title="프론트엔드 컴포넌트 구현"
        todos={[
          {
            id: '1',
            text: 'Button 컴포넌트 완성성성성성ㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            checked: true,
            assignee: '성균',
          },
          {
            id: '2',
            text: 'Modal 구조 리팩터링',
            checked: false,
            assignee: '이름',
            requested: true,
          },
          {
            id: '3',
            text: 'Storybook 작성',
            checked: false,
            assignee: '성균',
          },
          {
            id: '4',
            text: 'Button 컴포넌트 완성',
            checked: true,
            assignee: '성균',
          },

        ]}
      />
    </div>
  );
}
