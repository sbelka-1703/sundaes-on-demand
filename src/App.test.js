import { render, screen, logRoles } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(<App />);
  // screen.debug();
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  logRoles(container);
  // console.log(container);
  screen.logTestingPlaygroundURL();
});
