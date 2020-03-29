import React from 'react';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export const addBubble = (title, type, message = '', timeOut = 3000) => {
    switch (type) {
        case 'info':
            NotificationManager.info(title, message, timeOut);
            break;
        case 'warning':
            NotificationManager.warning(title, message, timeOut);
            break;
        case 'error':
            NotificationManager.error(title, message, timeOut);
            break;
        default:
            NotificationManager.success(title, message, timeOut);
    }
};

export const Bubble = {
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
};
