import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Completed from "./Completed.jsx";
import React from "react";
import '@testing-library/jest-dom';

describe('Completed', () => {
    it('renders correctly', () => {

        // render
        render(<Completed />);

        // set up
        const header = screen.getByText('Congratulations!')
        const message = screen.getByText('You have completed all your tasks!');

        // results
        expect(header).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });
});
