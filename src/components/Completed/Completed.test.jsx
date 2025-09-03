import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Completed from "./Completed.jsx";
import React from "react";
import '@testing-library/jest-dom';

describe('Completed', () => {
    it('renders correctly', () => {
        render(<Completed />);
        expect(screen.getByText('Congratulations!')).toBeInTheDocument();
        expect(screen.getByText('You have completed all your tasks!')).toBeInTheDocument();
    });
});
