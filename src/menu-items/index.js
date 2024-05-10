import dashboard from './dashboard';
import pages from './pages';
import admins from './admins';
// import orders from './questionmanagement';
import users from './users';
import UserForm from 'views/pages/userForm';
import QuestionManagement from './questionmanagement';
import appManagement from './appManagement';
// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, QuestionManagement ,admins, users,appManagement]
};

export default menuItems;
