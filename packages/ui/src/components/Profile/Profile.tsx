import { cva } from 'class-variance-authority';

interface ProfileProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'corral' | 'blue' | 'skyBlue' | 'purple';
}

const profileVariants = cva(
  'flex items-center justify-center rounded-full font-medium text-gray-800',
  {
    variants: {
      size: {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
      },
      variant: {
        corral: 'bg-[#FFDFDA]',
        blue: 'bg-[#E0EDFF]',
        skyBlue: 'bg-[#DAF3FF]',
        purple: 'bg-[#E5DCFF]',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'blue',
    },
  }
);

export const Profile = ({
  name,
  size = 'md',
  variant = 'blue',
}: ProfileProps) => {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className={profileVariants({ size, variant })}>
      {initial}
    </div>
  );
};
