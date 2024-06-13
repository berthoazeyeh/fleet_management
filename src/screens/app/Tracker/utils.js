export function formatDuration(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} j${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `${hours} h${hours > 1 ? 's' : ''} ${minutes % 60} min${minutes % 60 > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `${minutes} min${minutes > 1 ? 's' : ''} ${seconds % 60} s`;
    } else {
        return `${seconds} s`;
    }
}