import { Link, ListItem, SkeletonText, Tag, UnorderedList, useToast } from "@chakra-ui/react";
import { useStore } from "@nanostores/react";
import { getPagePath } from "@nanostores/router";
import { useEffect } from "react";
import { router } from "../../app/router";
import $users from "../../shared/user/store";

function UserList() {
  const { data, error, loading } = useStore($users);
  const toast = useToast();

  useEffect(() => {
    if (error) toast({ title: error?.message, status: "error" });
  }, [error]);

  return (
    <SkeletonText isLoaded={!loading}>
      <UnorderedList>
        {data?.users.map((u) => {
          return (
            <ListItem key={u.id}>
              <Link href={getPagePath(router, "userProfile", { userId: u.id })}>
                {u.first_name} {u.last_name}
              </Link>{" "}
              – <Tag>{u.email}</Tag>
            </ListItem>
          );
        })}
      </UnorderedList>
    </SkeletonText>
  );
}

export default UserList;
