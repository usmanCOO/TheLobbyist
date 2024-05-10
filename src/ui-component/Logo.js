// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * 
 *
 */
import favicon from 'assets/images/favicon.png';
// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
          <img  draggable={false} src={favicon} alt="The Lobbyist" width="70" />
         
        
       
    );
};

export default Logo;
