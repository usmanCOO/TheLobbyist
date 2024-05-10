import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import Protectedroutes from './protectedroutes';
import PackCreation from 'views/utilities/packCreation';
import QuestionTable from 'views/dashboard/Default/Question-Management/QuestionTable';
import PackList from 'views/utilities/PackList';
import QuestionAnalytics from 'views/dashboard/Default/Question-Management/QuestionAnalytics';
import UserInvite from 'views/pages/inviteUser/UserInvite';
import PackAnalytics from 'views/utilities/PackAnalytics';
import UserProfile from 'views/dashboard/Default/UserProfile';
import AppManagement from 'views/pages/AppManagement';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const Typography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/PackList')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// // sample page routing
// const UserInvite = Loadable(lazy(() => import('views/pages/inviteUser/UserInvite')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <Protectedroutes component = {<MainLayout />} /> ,
    children: [
        {
            path: '/',
            element: <Protectedroutes component= {<DashboardDefault />} />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element:  <Protectedroutes component= {<DashboardDefault />} />  
                }
            ]
        },
        {
            path: 'questionmanagement',
            children: [
                {
                    path: 'default',
                    element:  <Protectedroutes component= {<QuestionTable />} />  
                }
            ]
        },
        {
            path: 'questionAnalytics',
            children: [
                {
                    path: 'default',
                    element:  <Protectedroutes component= {<QuestionAnalytics />} />  
                }
            ]
        },
        {
            path: 'admins',
            children: [
                {
                    path: 'user-profile',
                    element:  <Protectedroutes component= {<UserProfile/>} />  
                }
            ]
        },
        {
            //path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <Protectedroutes component= {<Typography />} />  
                }
            ]
        },
        {
            //path: 'utils',
            children: [
                {
                    path: 'packCreation',
                    element: <Protectedroutes component= {<PackCreation />} /> 
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'PackList',
                    element:  <Protectedroutes component= {<PackList />} />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'PackAnalytics',
                    element:  <Protectedroutes component= {<PackAnalytics/>} /> 
                }
            ]
        },
      
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element:  <Protectedroutes component= {< UtilsMaterialIcons  />} /> 
                }
            ]
        },
        {
            path: 'sample-page',
            element:  <Protectedroutes component= {< SamplePage  />} />
        },
        {
            path: 'inviteUser',
            element:  <Protectedroutes component= {< UserInvite  />} />
        },
        {
            path:'appManagement',
            children:[
                {
                    path:'default',
                    element:  <Protectedroutes component= {< AppManagement  />} />

        }
    ]
},
]
};

export default MainRoutes;
