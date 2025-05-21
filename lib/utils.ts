import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isToday, isYesterday } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageDate(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'dd-MMM-yy');
  }
}

export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'HH:mm');
}

export function groupMessagesByDate(messages: any[]) {
  const grouped: Record<string, any[]> = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp || message.created_at);
    const dateKey = format(date, 'dd-MM-yyyy');
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    
    grouped[dateKey].push(message);
  });
  
  return Object.entries(grouped).map(([date, messages]) => ({
    date,
    messages,
  }));
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export function generateRandomColor(seed: string) {
  // Simple hash function to generate consistent colors for the same name
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Get a color in the hue range from 0 to 360
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 55%)`;
}