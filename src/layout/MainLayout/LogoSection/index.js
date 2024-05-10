import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import favicon from 'assets/images/favicon.png';
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath} draggable={false}>
        <img draggable={false} src={favicon} alt="The Lobbyist" width="70" style={{ filter: 'brightness(90%)' }} />
    </ButtonBase>
);

export default LogoSection;
