import { format, isToday, isYesterday } from 'date-fns';

const timestampAsString = timestamp => {
  if (isToday(timestamp)) return 'Today';
  if (isYesterday(timestamp)) return 'Yesterday';
  return format(timestamp, 'MMM dd');
};

export const withTimestampAsString = ({ timestamp, ...others }) => ({
  ...others,
  timestamp: timestampAsString(timestamp),
});
