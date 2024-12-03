import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes'; // Corrected the path here

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
