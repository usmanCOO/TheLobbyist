// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconScreenShare } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconScreenShare
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const users = {
    id: 'users',
    title: 'Pack Management',
    type: 'group',
        children: [
            // {
            //     id: 'Pack-Creation',
            //     title: 'Pack Creation',
            //     type: 'item',
            //     url: '/packCreation',
            //     breadcrumbs: false
            // },
            {
                id: 'Pack-List',
                title: 'Pack List',
                type: 'item',
                url: '/utils/PackList',
                breadcrumbs: false
            },
            // {
            //     id: 'Pack-Analytics',
            //     title: 'Pack Analytics',
            //     type: 'item',
            //     url: '/utils/PackAnalytics',
               
            //     breadcrumbs: false
            // },
            // {
            //     id: 'Logs',
            //     title: 'Logs',
            //     type: 'item',
            //     url: '/utils/Logs',
            //     breadcrumbs: false

              
                // children: [
                //     {
                //         id: 'tabler-icons',
                //         title: 'Tabler Icons',
                //         type: 'item',
                //         url: '/icons/tabler-icons',
                //         breadcrumbs: false
                //     },
                //     {
                //         id: 'material-icons',
                //         title: 'Material Icons',
                //         type: 'item',
                //         url: '/icons/material-icons',
                //         breadcrumbs: false
                //     }
                // ]
            // },
            // {
            //     id: 'invite-user',
            //     title: 'Invite User',
            //     type: 'item',
            //     url: '/inviteUser',
            //     breadcrumbs: false
            // },
        ]
};

export default users;
