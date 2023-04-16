/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/await-async-utils */
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import users from "../response.json";
import { UserDetail } from "./UserDetail";

const mockDeleteUser = jest.fn(),
  mockHandleUpdate = jest.fn();

test("should load properly", async () => {
  render(
    <UserDetail
      user={users[0]}
      deleteUser={mockDeleteUser}
      handleUpdate={mockHandleUpdate}
    />
  );
  const name = await screen.findByText(/Leanne Graham/);
  waitFor(() => expect(name.innerHTML).toStrictEqual("Leanne Graham"));
});

test("should call handleDelete on click of delete icon", async () => {
  render(
    <UserDetail
      user={users[0]}
      deleteUser={mockDeleteUser}
      handleUpdate={mockHandleUpdate}
    />
  );
  const deleteIcon = await screen.findByTestId("delete-user");
  fireEvent.click(deleteIcon);
  expect(mockDeleteUser).toBeCalledTimes(1);
});

test("should be liked and unLiked on click of heart icon", async () => {
  render(
    <UserDetail
      user={users[0]}
      deleteUser={mockDeleteUser}
      handleUpdate={mockHandleUpdate}
    />
  );
  const heartOutline = await screen.findByTestId("heart-outline");
  fireEvent.click(heartOutline);
  const heartFilled = await screen.findByTestId("heart-filled");
  expect(heartFilled).toBeDefined();
  fireEvent.click(heartFilled);
  const newHeartOutline = await screen.findByTestId("heart-outline");
  expect(newHeartOutline).toBeDefined();
});

test("should open edit modal on click of edit icon and should be close on click of cancel button", async () => {
  render(
    <UserDetail
      user={users[0]}
      deleteUser={mockDeleteUser}
      handleUpdate={mockHandleUpdate}
    />
  );
  const editIcon = await screen.findByTestId("edit-user");
  fireEvent.click(editIcon);
  const editModal = await screen.findByTestId("edit-user-modal");
  expect(editModal).toBeDefined();
  const cancelBtn = await within(editModal).findByText(/Cancel/);
  fireEvent.click(cancelBtn);
  expect(editModal.firstChild).toHaveStyle({
    display: "none",
  });
});
