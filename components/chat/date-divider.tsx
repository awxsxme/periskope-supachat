import React from 'react';
import { format, parseISO } from 'date-fns';

interface DateDividerProps {
  date: string; // Format: 'dd-MM-yyyy'
}

export const DateDivider = ({ date }: DateDividerProps) => {
  // Convert from 'dd-MM-yyyy' to a more readable format
  const formattedDate = format(parseISO(date.split('-').reverse().join('-')), 'dd-MM-yyyy');
  
  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-gray-200 text-xs font-medium text-gray-500 px-3 py-1 rounded-full">
        {formattedDate}
      </div>
    </div>
  );
};