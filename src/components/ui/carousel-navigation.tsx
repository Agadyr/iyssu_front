import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CarouselNavigationProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  className?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
}

export const CarouselNavigation = ({
  onPrevClick,
  onNextClick,
  className,
  buttonSize = 'md',
}: CarouselNavigationProps) => {
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5 sm:w-6 sm:h-6',
    lg: 'w-6 h-6 sm:w-7 sm:h-7',
  };

  return (
    <>
      <NavigationButton
        onClick={onPrevClick}
        className={cn("absolute top-1/2 left-4 transform -translate-y-1/2", className)}
        aria-label="Предыдущий слайд"
        buttonSize={buttonSize}
      >
        <ChevronLeft className={iconSizeClasses[buttonSize]} />
      </NavigationButton>

      <NavigationButton
        onClick={onNextClick}
        className={cn("absolute top-1/2 right-4 transform -translate-y-1/2", className)}
        aria-label="Следующий слайд"
        buttonSize={buttonSize}
      >
        <ChevronRight className={iconSizeClasses[buttonSize]} />
      </NavigationButton>
    </>
  );
};

interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonSize?: 'sm' | 'md' | 'lg';
}

const NavigationButton = ({ 
  className, 
  children, 
  buttonSize = 'md',
  ...props 
}: NavigationButtonProps) => {
  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <button
      className={cn(
        "z-10 bg-white hover:bg-white text-gray-800 hover:text-emerald-500 hover:border-emerald-500 border border-gray-200 rounded-full shadow-md transition-colors",
        buttonSizeClasses[buttonSize],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}; 