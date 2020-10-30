import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render (<CheckoutForm />);

    const header = screen.getByText('Checkout Form');
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm />);

    //assigning input values
    const firstNameInput = screen.getByLabelText(/first name:/i);
    const lastNameInput = screen.getByLabelText(/last name:/i);
    const addressInput = screen.getByLabelText(/address:/i);
    const cityInput = screen.getByLabelText(/city:/i);
    const stateInput = screen.getByLabelText(/state:/i);
    const zipInput = screen.getByLabelText(/zip:/i);

    //inputting values
    fireEvent.change(firstNameInput, { target: { value: 'Daniel', name: 'firstName'}});
    fireEvent.change(lastNameInput, { target: { value: 'Vargas', name: 'lastName'}});
    fireEvent.change(addressInput, { target: { value: '123 Smith Street', name: 'address'}});
    fireEvent.change(cityInput, { target: { value: 'Seattle', name: 'city'}});
    fireEvent.change(stateInput, { target: { value: 'Washington', name: 'state'}});
    fireEvent.change(zipInput, { target: { value: '11233', name: 'zip'}});

    //submit form and check for success message
    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
        const firstNameText = screen.getByText(/daniel/i);
        expect(firstNameText).toBeTruthy();
        const lastNameText = screen.getByText(/vargas/i);
        expect(lastNameText).toBeTruthy();
        
        const successMessage = screen.getByText(/woo-hoo!/i);
        expect(successMessage).toBeTruthy();
        expect(successMessage).toBeInTheDocument();
    })

});
