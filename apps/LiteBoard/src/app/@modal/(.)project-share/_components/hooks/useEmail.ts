import { EMAIL_PATTERN } from '../constants/pattern';
import { useEffect, useRef, useState } from 'react';

interface EmailList {
  email: string;
  isValid: boolean;
}

const useEmail = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [emailList, setEmailList] = useState<EmailList[]>([]);

  const isValidEmail = EMAIL_PATTERN.test(email);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      if (email.trim() && !emailList.some((item) => item.email === email)) {
        setEmailList((prev) => [...prev, { email, isValid: isValidEmail }]);
        setEmail('');
      }
    } else if (
      e.key === 'Backspace' &&
      !isComposing &&
      email === '' &&
      emailList.length > 0
    ) {
      e.preventDefault();
      const lastEmail = emailList[emailList.length - 1];
      if (lastEmail) {
        removeEmail(lastEmail.email);
      }
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList((prev) => prev.filter((item) => item.email !== emailToRemove));
    requestAnimationFrame(() => ref.current?.focus());
  };

  const isValidEmailList =
    emailList.every((item) => item.isValid) && emailList.length > 0;

  return {
    ref,
    email,
    showError,
    isValidEmail,
    isValidEmailList,
    emailList,
    handleKeyDown,
    removeEmail,
    setEmail,
    setShowError,
    setIsComposing,
  };
};

export default useEmail;
