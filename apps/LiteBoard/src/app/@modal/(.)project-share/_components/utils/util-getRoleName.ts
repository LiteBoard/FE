import { Role, ROLE_LIST } from '../constants/role';

const getRoleName = (role: Role) => {
  return ROLE_LIST.find((item) => item.role === role)?.name;
};

export default getRoleName;
