export enum Role {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
}

export type RoleOption = {
  role: Role | 'DELETE';
  name: string;
  description: string;
};

export const ROLE_LIST = [
  {
    role: Role.ADMIN,
    name: '프로젝트 관리자',
    description: `설정 변경 및 프로젝트를 수정하거나 삭제할 수 있는\n 모든 액세스 권한이 부여됩니다.`,
  },
  {
    role: Role.VIEWER,
    name: '조회자',
    description: '볼 수는 있지만 프로젝트를 편집할 수는 없습니다.',
  },
  {
    role: Role.EDITOR,
    name: '편집자',
    description: '프로젝트에 있는 모든 것을 추가 및 편집할 수 있습니다.',
  },
] as const satisfies RoleOption[];

export const DELETE_USER = [
  {
    role: 'DELETE',
    name: '프로젝트에서 제거',
    description: '해당 멤버를 프로젝트 내에서 제거합니다.',
  },
] as const satisfies RoleOption[];

export const ALL_OPTIONS = [...ROLE_LIST, ...DELETE_USER] as const;
