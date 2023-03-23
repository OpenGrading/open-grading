import UserList from "../widgets/UserList";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Card>
      <CardHeader>
        <Heading size={"md"}>Users List</Heading>
      </CardHeader>
      <CardBody>
        <UserList />
      </CardBody>
    </Card>
  );
}
