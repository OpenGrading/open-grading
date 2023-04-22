import { Card, CardBody, CardHeader, Heading, HStack, Skeleton, Tag } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import { createFetcherStore } from "../app/fetcher/store";
import { UserProfileDTO } from "../shared/api";

const createProfileStore = (userId: string) => () =>
  createFetcherStore<{ userProfile: UserProfileDTO }, Error>([`/users/${userId}`]);

interface UserProfileProps {
  userId: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const [$profile] = useState(createProfileStore(userId));
  const { data, loading } = useStore($profile);

  return (
    <Skeleton isLoaded={!loading}>
      <Card>
        <CardHeader>
          <Heading>
            {data?.userProfile.first_name} {data?.userProfile.last_name}
          </Heading>
        </CardHeader>
        <CardBody>
          <HStack spacing={4}>
            {data?.userProfile.tags.map((tag) => {
              return (
                <Tag size="md" key={tag.id}>
                  {tag.text}
                </Tag>
              );
            })}
          </HStack>
        </CardBody>
      </Card>
    </Skeleton>
  );
}
