/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from "@testing-library/react";
import * as ApiServices from "../api/service";
import users from "../response.json";
import { Users } from "./Users";

jest.mock("../api/service.js");

test("should load properly", async () => {
  jest.spyOn(ApiServices, "fetchUsersApi").mockReturnValue(
    Promise.resolve({
      data: users,
    })
  );
  render(<Users />);
  const name = await screen.findByText(/Leanne Graham/);
  waitFor(() => expect(name.innerHTML).toStrictEqual("Leanne Graham"));
});
