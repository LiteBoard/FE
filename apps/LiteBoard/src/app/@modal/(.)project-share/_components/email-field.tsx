import { Button, XIcon } from '@LiteBoard/ui';
import { useEffect, useRef } from 'react';
import useEmail from './hooks/useEmail';

const EmailField = () => {
  const {
    ref,
    email,
    emailError,
    showError,
    isValidEmail,
    emailList,
    handleKeyDown,
    handleInviteClick,
    removeEmail,
    setEmail,
    setEmailError,
    setShowError,
    setIsComposing,
  } = useEmail();

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = () => {
    if (ref.current) ref.current.focus();
  };

  const showPlaceholder = emailList.length === 0 && email.length === 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth;
  }, [emailList, email]);

  return (
    <div className="flex flex-col gap-3 justify-center items-start w-full">
      <div className="flex justify-between items-center w-full">
        <p className="text-text-T1 text-neutral-700">이메일로 초대</p>
        {emailError && showError && (
          <p className="text-red-500 text-text-B3R">
            이메일 형식이 올바르지 않습니다.
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-center items-start w-full">
        <div
          className="w-[480px] h-12 py-3 px-4 border border-neutral-200 rounded-lg hover:border-blue-400 focus-within:border-[1.5px] overflow-x-auto overflow-y-hidden scrollbar-hide"
          onClick={handleContainerClick}
          ref={scrollRef}
        >
          <div className="inline-flex gap-2 items-center whitespace-nowrap">
            {emailList.map((emailItem, index) => (
              <div
                key={index}
                className="flex gap-2 items-center px-2 py-1 h-6 rounded-lg bg-neutral-100"
              >
                <span className="text-text-B3R text-neutral-700">
                  {emailItem}
                </span>
                <button
                  onClick={() => removeEmail(emailItem)}
                  className="transition-colors text-neutral-400 hover:text-neutral-600"
                  type="button"
                >
                  <XIcon className="transition-colors duration-300 hover:text-red-300" />
                </button>
              </div>
            ))}

            <input
              ref={ref}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) {
                  setEmailError(false);
                  setShowError(false);
                }
              }}
              placeholder={showPlaceholder ? '이메일을 입력해주세요' : ''}
              className="w-[160px] shrink-0 border-none outline-none bg-transparent text-neutral-700 text-text-B3R placeholder:text-neutral-400 placeholder:text-text-B3R"
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <Button
          variant={'weak'}
          color={'black'}
          disabled={!isValidEmail}
          onClick={handleInviteClick}
        >
          초대
        </Button>
      </div>
    </div>
  );
};

export default EmailField;
