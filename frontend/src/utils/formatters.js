export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

export const formatDuration = (seconds) => {
  if (!seconds) return 'N/A';
  return `${seconds}s`;
};

export const truncateText = (text, maxLength = 80) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};