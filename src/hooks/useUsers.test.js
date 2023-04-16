/* eslint-disable testing-library/await-async-utils */
import { act, renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./useUsers";
import * as ApiServices from "../api/service";
import users from "../response.json";

jest.mock("../api/service.js");

test("should render properly", () => {
  const { result } = renderHook(() => useUsers());
  expect(result.current.isLaoding).toBeTruthy();
  expect(result.current.users).toStrictEqual([]);
  expect(result.current.error).toStrictEqual({});
  expect(result.current.fetchUsers).toBeDefined();
  expect(result.current.deleteUser).toBeDefined();
  expect(result.current.handleUpdate).toBeDefined();
});

test("should load users properly on Call of fetchUsers", async () => {
  jest.spyOn(ApiServices, "fetchUsersApi").mockReturnValue(
    Promise.resolve({
      data: users,
    })
  );
  const { result } = renderHook(() => useUsers());
  await waitFor(async () => {
    await act(async () => {
      await result.current.fetchUsers();
    });
  });
  expect(result.current.users).toStrictEqual(users);
});

test("should return error if Call of fetchUsers is failed", async () => {
  jest.spyOn(ApiServices, "fetchUsersApi").mockRejectedValue("Error");
  const { result } = renderHook(() => useUsers());
  await waitFor(async () => {
    await act(async () => {
      await result.current.fetchUsers();
    });
  });
  expect(result.current.error).toStrictEqual({
    message: "Something Went Wrong.",
  });
});

test("should delete user on call of deleteUser", async () => {
  jest.spyOn(ApiServices, "fetchUsersApi").mockReturnValue(
    Promise.resolve({
      data: users,
    })
  );
  const { result } = renderHook(() => useUsers());
  await waitFor(async () => {
    await act(async () => {
      await result.current.fetchUsers();
    });
  });
  expect(result.current.users).toStrictEqual(users);
  act(() => {
    result.current.deleteUser(1);
  });
  waitFor(() => {
    expect(result.current.users).toStrictEqual(
      users.filter((user) => user.id !== 1)
    );
  });
});

test("should user user on call of handleUpdate", async () => {
  jest.spyOn(ApiServices, "fetchUsersApi").mockReturnValue(
    Promise.resolve({
      data: users,
    })
  );
  const { result } = renderHook(() => useUsers());
  await waitFor(async () => {
    await act(async () => {
      await result.current.fetchUsers();
    });
  });
  expect(result.current.users).toStrictEqual(users);
  const user = {
    id: 1,
    name: "Abcd",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  act(() => {
    result.current.handleUpdate(user);
  });
  waitFor(() => {
    expect(result.current.users).toStrictEqual(
      users.filter((usr) => (usr.id === user.id ? user : usr))
    );
  });
});
