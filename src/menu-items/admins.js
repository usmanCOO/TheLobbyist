// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import UserProfile from 'views/dashboard/Default/UserProfile';
// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const admins = {
    id: 'admins',
    title: 'Admins',
    type: 'group',
        children: [
            {
                id: 'user-profile ',
                title: 'User Profile',
                type: 'item',
                url: '/admins/user-profile',
                breadcrumbs: false
            },
        //     {
        //         id: 'util-color',
        //         title: 'Color',
        //         type: 'item',
        //         url: '/utils/util-color',
        //         icon: icons.IconPalette,
        //         breadcrumbs: false
        //     },
        //     {
        //         id: 'util-shadow',
        //         title: 'Shadow',
        //         type: 'item',
        //         url: '/utils/util-shadow',
        //         icon: icons.IconShadow,
        //         breadcrumbs: false
        //     },
        //     {
        //         id: 'icons',
        //         title: 'Icons',
        //         type: 'collapse',
        //         icon: icons.IconWindmill,
        //         children: [
        //             {
        //                 id: 'tabler-icons',
        //                 title: 'Tabler Icons',
        //                 type: 'item',
        //                 url: '/icons/tabler-icons',
        //                 breadcrumbs: false
        //             },
        {
                id: 'inviteUser',
                title: 'Invite User',
                type: 'item',
                url: '/inviteUser',
                breadcrumbs: false
            },
        //             {
        //                 id: 'material-icons',
        //                 title: 'Material Icons',
        //                 type: 'item',
        //                 url: '/icons/material-icons',
        //                 breadcrumbs: false
        //             }
        //         ]
        //     }
        ]
};

export default admins;
