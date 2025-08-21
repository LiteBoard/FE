import { EMAIL_PATTERN } from '../constants/pattern';
import { useEffect, useRef, useState } from 'react';

const useEmail = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [emailList, setEmailList] = useState<string[]>([]);

  const isValidEmail = EMAIL_PATTERN.test(email);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      if (isValidEmail) {
        if (!emailList.includes(email)) {
          setEmailList((prev) => [...prev, email]);
        }
        setEmail('');
        setEmailError(false);
        setShowError(false);

        requestAnimationFrame(() => ref.current?.focus());
      } else {
        setEmailError(true);
        setShowError(true);

        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    }
  };

  const handleInviteClick = () => {
    if (isValidEmail) {
      if (!emailList.includes(email)) {
        setEmailList((prev) => [...prev, email]);
      }
      setEmail('');
      setEmailError(false);
      setShowError(false);
      requestAnimationFrame(() => ref.current?.focus());
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList((prev) => prev.filter((email) => email !== emailToRemove));
    requestAnimationFrame(() => ref.current?.focus());
  };

  return {
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
  };
};

export default useEmail;
