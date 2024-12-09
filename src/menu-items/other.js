// assets
import { IconBrandChrome, IconDatabase, IconHelp, IconPalette, IconShadow, IconTypography, IconWindmill } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp, IconDatabase, IconTypography, IconPalette, IconShadow, IconWindmill };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Candidate Evaluation',
            type: 'item',
            url: 'candidate-evaluation',
            icon: icons.IconTypography,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Candidate Facilities',
            type: 'item',
            url: 'hr-entry-form',
            icon: icons.IconWindmill,
            breadcrumbs: false
        },
        {
            id: 'dataTable',
            title: 'Candidate Information',
            type: 'item',
            url: '/utils/data-table',
            icon: icons.IconDatabase,
            breadcrumbs: false
        }
    ]
};

export default other;
