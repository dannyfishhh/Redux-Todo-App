import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Completed from "./Completed";
import React from "react";
import '@testing-library/jest-dom';

describe('Completed', () => {
  it('renders correctly', () => {
    render(<Completed />);

    const header = screen.getByText('Congratulations!');
    const message = screen.getByText('You have completed all your tasks!');

    expect(header).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
