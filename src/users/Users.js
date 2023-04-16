import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { Row } from "antd";
import { useUsers } from "../hooks/useUsers";
import { UserDetail } from "./UserDetail";

export const Users = () => {
  const { isLaoding, users, fetchUsers, deleteUser, handleUpdate } = useUsers();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <>
      <Loader isLoading={isLaoding} />
      {users.length > 0 && (
        <Row>
          {users.map((user) => (
            <UserDetail
              deleteUser={deleteUser}
              handleUpdate={handleUpdate}
              user={user}
              key={user.id}
            />
          ))}
        </Row>
      )}
    </>
  );
};
