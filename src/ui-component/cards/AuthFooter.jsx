// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
      hrappdashboard.io
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
      &copy; middlewareIt.com
    </Typography>
  </Stack>
);

export default AuthFooter;
