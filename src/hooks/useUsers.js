import { useCallback, useState } from "react";
import { fetchUsersApi } from "../api/service";

export const useUsers = () => {
  const [isLaoding, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await fetchUsersApi();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data || { message: "Something Went Wrong." });
      setLoading(false);
    }
  }, []);

  const deleteUser = (id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  };

  const handleUpdate = (user) => {
    setUsers((users) => users.map((usr) => (usr.id === user.id ? user : usr)));
  };

  return {
    isLaoding,
    users,
    error,
    fetchUsers,
    deleteUser,
    handleUpdate,
  };
};
