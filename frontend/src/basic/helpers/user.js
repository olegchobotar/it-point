import { get } from 'lodash';

export const getUserInitials = author => author && author.split(' ').map(
    word => word.charAt(0).toUpperCase()
).join('');

export const hasPermissionToEditCompany = ({ Company, User }) =>{
    return get(Company, 'company.owner_id') === User.currentUser.id;
};
