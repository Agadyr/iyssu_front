import React, { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="mb-6 bg-gray-50 p-6 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState; 