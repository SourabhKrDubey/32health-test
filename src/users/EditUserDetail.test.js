/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/await-async-utils */
import { fireEvent, render, screen } from "@testing-library/react";
import users from "../response.json";
import { EditUserDetail } from "./EditUserDetail";

const mockHandleClose = jest.fn(),
  mockHandleUpdate = jest.fn();

test("should load properly", async () => {
  const { container } = render(
    <EditUserDetail
      isOpen
      user={users[0]}
      handleClose={mockHandleClose}
      handleUpdate={mockHandleUpdate}
    />
  );
  expect(container).toBeDefined();
});

test("should call handleClose on click of cancel button", async () => {
  render(
    <EditUserDetail
      isOpen
      user={users[0]}
      handleClose={mockHandleClose}
      handleUpdate={mockHandleUpdate}
    />
  );
  const cancelBtn = await screen.findByText(/Cancel/);
  fireEvent.click(cancelBtn);
  expect(mockHandleClose).toBeCalledTimes(1);
});

test("should call handleUpdate on click of ok button", async () => {
  render(
    <EditUserDetail
      isOpen
      user={users[0]}
      handleClose={mockHandleClose}
      handleUpdate={mockHandleUpdate}
    />
  );
  const okBtn = await screen.findByText(/OK/);
  fireEvent.click(okBtn);
  expect(mockHandleUpdate).toBeCalledTimes(1);
});
