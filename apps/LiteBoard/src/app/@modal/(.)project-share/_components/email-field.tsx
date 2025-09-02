import { cn } from '@/utils';
import { Button, XIcon } from '@LiteBoard/ui';
import { useEffect, useRef } from 'react';
import { ROLE_LIST, RoleOption } from './constants/role';
import { useClickOutside } from '@/hooks/utils/useClickOutSide';
import useEmail from './hooks/useEmail';
import useRoleSelect from './hooks/useRoleSelect';
import RoleSelect from './role-select';
import RoleDropdown from './role-dropdown';

// 프로젝트 관리자 여부 임시 체킹
const IS_PROJECT_ADMIN = true;

const EmailField = () => {
  const {
    ref,
    email,
    emailList,
    isValidEmailList,
    handleKeyDown,
    setEmail,
    setIsComposing,
    removeEmail,
  } = useEmail();

  const { isOpen, selectedRole, setIsOpen, setSelectedRole } = useRoleSelect({
    memberId: 'email-field',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const showPlaceholder = emailList.length === 0 && email.length === 0;
  const roleSelectRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    if (ref.current) ref.current.focus();
  };

  const handleInviteClick = async () => {
    try {
      console.log('초대할 이메일 리스트', emailList);
      console.log('권한', selectedRole);
    } catch (error) {
      console.error(error);
    } finally {
      setEmail('');
      requestAnimationFrame(() => ref.current?.focus());
    }
  };

  useClickOutside(roleSelectRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollContainer = el.querySelector('.overflow-y-auto') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [emailList, email]);

  return (
    <div className="flex relative gap-3 justify-center items-start w-full">
      <div
        className={cn(
          'w-[480px] h-[104px] overflow-y-auto py-3 px-4 border border-neutral-200 rounded-lg focus-within:border-[1.5px] focus-within:border-blue-500 scrollbar-hide',
          {
            'border-neutral-200 cursor-not-allowed': !IS_PROJECT_ADMIN,
            'hover:border-neutral-400': IS_PROJECT_ADMIN,
          }
        )}
        onClick={handleContainerClick}
        ref={scrollRef}
      >
        <div className="flex items-start h-full">
          <div className="overflow-y-auto overflow-x-hidden flex-1 pr-4 max-h-32 scrollbar-hide">
            <div className="flex flex-wrap gap-1 items-center pr-4">
              {emailList.map((emailItem, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-2 items-center px-2 py-1 h-6 rounded-md shrink-0',
                    {
                      'bg-neutral-100': emailItem.isValid,
                      'bg-red-50': !emailItem.isValid,
                    }
                  )}
                >
                  <span
                    className={cn('text-text-B3M', {
                      'text-neutral-600': emailItem.isValid,
                      'text-red-500': !emailItem.isValid,
                    })}
                  >
                    {emailItem.email}
                  </span>
                  <button
                    onClick={() => removeEmail(emailItem.email)}
                    className="transition-colors shrink-0"
                    type="button"
                  >
                    <XIcon
                      className={cn(
                        'transition-colors duration-300 hover:text-red-300',
                        {
                          'text-neutral-400 ': emailItem.isValid,
                          'text-red-500 ': !emailItem.isValid,
                        }
                      )}
                    />
                  </button>
                </div>
              ))}

              <input
                ref={ref}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder={
                  showPlaceholder
                    ? IS_PROJECT_ADMIN
                      ? '이메일을 입력해주세요'
                      : '관리자만 초대할 수 있습니다'
                    : ''
                }
                maxLength={30}
                className="w-[320px] shrink-0 border-none outline-none bg-transparent text-neutral-700 text-text-B3R placeholder:text-neutral-400 placeholder:text-text-B3R"
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onKeyDown={handleKeyDown}
                disabled={!IS_PROJECT_ADMIN}
              />
            </div>
          </div>

          {IS_PROJECT_ADMIN && (
            <div ref={roleSelectRef} id="email-field-container">
              <RoleSelect
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                selectedRole={selectedRole}
                roleDropdown={
                  <RoleDropdown
                    memberId="email-field"
                    selectedRole={selectedRole}
                    dropDownPosition="top-[42px] left-[398px]"
                    options={ROLE_LIST as unknown as RoleOption[]}
                    type="email"
                    setIsOpen={setIsOpen}
                    setSelectedRole={setSelectedRole}
                  />
                }
              />
            </div>
          )}
        </div>
      </div>

      <Button
        variant={isValidEmailList ? 'filled' : 'weak'}
        color={isValidEmailList ? 'blue' : 'black'}
        disabled={!isValidEmailList || !IS_PROJECT_ADMIN}
        className={cn({
          'cursor-not-allowed': !IS_PROJECT_ADMIN,
        })}
        onClick={handleInviteClick}
      >
        초대
      </Button>
    </div>
  );
};

export default EmailField;
