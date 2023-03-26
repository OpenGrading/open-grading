import UserList from "../widgets/UserList";
import { Card, CardBody, CardHeader, Heading, Stack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Stack spacing={4}>
      <Heading size={"md"}>Users List</Heading>
      <Card w="auto">
        <CardBody>
          <UserList />
        </CardBody>
      </Card>
    </Stack>
  );
}
