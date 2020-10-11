import React from 'react';
import { Grommet, Box, Heading, ResponsiveContext } from 'grommet';
// import { FormClose, Notification } from 'grommet-icons';
import { TalentSimulator } from './talent-simulator/TalentSimulator';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  // const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Grommet theme={theme} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box fill>
            <AppBar>
              <Heading level="3" margin="none">
                不朽星图模拟器
              </Heading>
              {/* sidebar example */}
              {/* <Button icon={<Notification />} onClick={() => setShowSidebar(!showSidebar)} /> */}
            </AppBar>
            <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
              <Box flex align="center" justify="center">
                <TalentSimulator />
              </Box>
              {/* sidebar example */}
              {/* {size !== 'small' ? (
                <Collapsible direction="horizontal" open={showSidebar}>
                  <Box flex width="medium" background="light-2" elevation="small" align="center" justify="center">
                    sidebar
                  </Box>
                </Collapsible>
              ) : (
                showSidebar && (
                  <Layer>
                    <Box background="light-2" tag="header" justify="end" align="center" direction="row">
                      <Button icon={<FormClose />} onClick={() => setShowSidebar(false)} />
                    </Box>
                    <Box fill background="light-2" align="center" justify="center">
                      sidebar
                    </Box>
                  </Layer>
                )
              )} */}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
}

export default App;
