import { Button, XIcon } from '@LiteBoard/ui';
import { useEffect, useRef } from 'react';
import useEmail from './hooks/useEmail';
import { cn } from '@/utils';
import RoleSelect from './role-select';

const EmailField = () => {
  const {
    ref,
    email,
    emailList,
    isValidEmailList,
    handleKeyDown,
    handleInviteClick,
    setEmail,
    setIsComposing,
    removeEmail,
  } = useEmail();

  const scrollRef = useRef<HTMLDivElement>(null);
  const showPlaceholder = emailList.length === 0 && email.length === 0;

  const handleContainerClick = () => {
    if (ref.current) ref.current.focus();
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollContainer = el.querySelector('.overflow-y-auto') as HTMLElement;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [emailList, email]);

  return (
    <div className="flex flex-col gap-3 justify-center items-start w-full">
      <div className="flex justify-between items-center w-full">
        <p className="text-text-T1 text-neutral-700">이메일로 초대</p>
      </div>

      <div className="flex gap-3 justify-center items-start w-full">
        <div
          className="relative w-[680px] min-h-12 py-3 px-4 border border-neutral-200 rounded-lg hover:border-blue-400 focus-within:border-[1.5px] focus-within:border-blue-500"
          onClick={handleContainerClick}
          ref={scrollRef}
        >
          <div className="flex items-center h-full">
            <div className="overflow-y-auto overflow-x-hidden flex-1 pr-4 max-h-32 scrollbar-hide">
              <div className="flex flex-wrap gap-2 items-center pr-4">
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
                  placeholder={showPlaceholder ? '이메일을 입력해주세요' : ''}
                  className="w-[160px] shrink-0 border-none outline-none bg-transparent text-neutral-700 text-text-B3R placeholder:text-neutral-400 placeholder:text-text-B3R"
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <RoleSelect />
          </div>
        </div>

        <Button
          variant={isValidEmailList ? 'filled' : 'weak'}
          color={isValidEmailList ? 'blue' : 'black'}
          disabled={!isValidEmailList}
          onClick={handleInviteClick}
        >
          초대
        </Button>
      </div>
    </div>
  );
};

export default EmailField;
