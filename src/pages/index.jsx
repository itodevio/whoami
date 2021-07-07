import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
} from 'grommet';

import useAuth from '../hooks/useAuth';

export default function Home() {
  const { createAuthUser } = useAuth();

  return (
    <Box align="center" margin="large">
      <Form onSubmit={({ value }) => {
        createAuthUser(value.email, value.password);
      }}
      >
        <FormField name="email" htmlFor="textinput-id" label="Email">
          <TextInput id="email-input" name="email" />
        </FormField>
        <FormField name="password" htmlFor="textinput-id" label="password">
          <TextInput id="password-input" name="password" />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
        </Box>
      </Form>
    </Box>
  );
}
