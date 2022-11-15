import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";
const { render, screen } = require("@testing-library/react");

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  //Checkbox unchecked by defualt, button disabled
  expect(checkbox).not.toBeChecked();
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  expect(confirmOrderButton).toBeDisabled();
});

test("Checkbox is unchecked by default, checking enables the button, unchecking disables it", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  //Checking checkbox enables button
  await user.click(checkbox);
  expect(confirmOrderButton).toBeEnabled();

  //Unchecking checkbox again disables button
  await user.click(checkbox);
  expect(confirmOrderButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  //popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover disappears when mout out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
