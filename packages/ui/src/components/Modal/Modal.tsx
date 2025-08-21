import { cn } from '../../lib/util';
import { Button } from '../Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog';

interface ModalProps {
  isOpen?: boolean;
  width?: string;
  title?: string;
  description?: string;
  isButton?: boolean;
  showCloseIcon?: boolean;
  leftText?: string;
  rightText?: string;
  leftClassName?: string;
  rightClassName?: string;
  isDisabledButton?: boolean;
  isActionModal?: boolean;
  className?: string;
  children?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onCloseIconClick?: () => void;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

export const Modal = ({
  isOpen,
  width,
  title = '',
  description = '',
  isButton,
  showCloseIcon,
  leftText = '취소',
  rightText = '삭제',
  className,
  leftClassName,
  rightClassName,
  isDisabledButton = false,
  isActionModal = true,
  children,
  onOpenChange,
  onCloseIconClick,
  onLeftButtonClick,
  onRightButtonClick,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        style={{ minWidth: width ? `${width}px` : undefined }}
        className={cn(
          className,
          `${!isActionModal && 'gap-[56px] px-[35px] py-8'}`
        )}
        onClose={onCloseIconClick}
        showCloseIcon={showCloseIcon}
      >
        <DialogHeader>
          <DialogTitle
            className={`${title?.length === 0 ? 'hidden' : ''} text-text-H2`}
          >
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription
              className={`${description?.length === 0 ? 'hidden' : ''}`}
            >
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {!isActionModal && (
          <span className="absolute w-full border border-t-neutral-200 h-[1px] left-0 top-[98px]" />
        )}

        {children}

        {isButton && (
          <DialogFooter>
            <Button
              type="button"
              size={'el'}
              color={'black'}
              variant={'borderless'}
              radius={'roundCorner'}
              className={cn('whitespace-nowrap', leftClassName)}
              onClick={onLeftButtonClick}
            >
              {leftText}
            </Button>
            <Button
              type="button"
              size={'el'}
              color={'red'}
              variant={'filled'}
              radius={'roundCorner'}
              className={cn('whitespace-nowrap', rightClassName)}
              onClick={onRightButtonClick}
              disabled={isDisabledButton}
            >
              {rightText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
