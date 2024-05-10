// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const QuestionManagement = {
    id: 'questionmanagement',
    title: 'Question Management',
    type: 'group',
    children: [
        {
            id: '1',
            title: 'Question Management',
            type: 'item',
            url: '/questionmanagement/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        },

    ]
};

export default QuestionManagement;
