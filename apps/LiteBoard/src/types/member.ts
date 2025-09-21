import { Member } from './common';

// 프로젝트 멤버 정보 인터페이스
export interface ProjectMember extends Member {
  email: string;
  role: 'ADMIN' | 'MEMBER';
}

// 프로젝트 멤버 조회 응답 인터페이스 (서버 응답 형태)
export type ProjectMembersResponse = ProjectMember[];