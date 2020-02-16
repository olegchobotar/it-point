export const getUserInitials = author => author && author.split(' ').map(
    word => word.charAt(0).toUpperCase()
).join('');
