import React from 'react';
import { format, parseISO } from 'date-fns';

interface DateDividerProps {
  date: string;
}

export const DateDivider = ({ date }: DateDividerProps) => {
  const formattedDate = format(parseISO(date.split('-').reverse().join('-')), 'dd-MM-yyyy');
  
  return (
    <div className="flex items-center justify-center my-3">
      <div className="bg-[#e2e1dd] text-[11px] font-medium text-gray-600 px-2.5 py-1 rounded-full">
        {formattedDate}
      </div>
    </div>
  );
}