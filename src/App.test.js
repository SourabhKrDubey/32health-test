import { render } from "@testing-library/react";
import App from "./App";

test("should render properly", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});
