import {
  Authenticator,
  ThemeProvider,
  Theme,
  View} from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

import type { Schema } from "../amplify/data/resource";
import Dashboard from "./Dashboard";
import { formFields } from './components/authenticator/FormFields';
import { AuthComponents } from './components/authenticator/Comps';

function App() {
  const theme = {
    name: 'my-theme',
  };

  const authTheme: Theme = theme;

  return (
    <ThemeProvider theme={authTheme}>
      <View padding="xxs">
        <Authenticator
            formFields={formFields}
            components={AuthComponents}
            >
            {
              ({ signOut, user }) => {
                const client = generateClient<Schema>();
                return (
                  <Dashboard client={client} authUser={user!} signOut={(): void => signOut!()} />
                );
              }
            }
          </Authenticator>
        </View>
    </ThemeProvider>
  );
}

export default App;
