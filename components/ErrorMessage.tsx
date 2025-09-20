
import React from 'react';
import { Icon } from './Icon';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <Icon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" className="w-6 h-6 text-red-500 mr-4"/>
        </div>
        <div>
          <p className="font-bold">Ocurrió un error</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
