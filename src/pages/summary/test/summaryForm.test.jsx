import SummaryForm from "../SummaryForm";
const { render, screen, fireEvent } = require("@testing-library/react");

test("Checkbox is unchecked by default, checking enables the button, unchecking disables it", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });
  expect(confirmOrderButton).toBeDisabled();
  //Checkbox unchecked by defualt, button disabled
  expect(checkbox).not.toBeChecked();

  //Checking checkbox enables button
  fireEvent.click(checkbox);
  expect(confirmOrderButton).toBeEnabled();

  //Unchecking checkbox again disables button
  fireEvent.click(checkbox);
  expect(confirmOrderButton).toBeDisabled();
});
