// ==============================|| App Management MENU ITEMS ||============================== //
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};
const appManagement = {
    id: 'appManagement',
    title: 'App Management',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'App Management',
            type: 'item',
            url: '/appManagement/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default appManagement;
