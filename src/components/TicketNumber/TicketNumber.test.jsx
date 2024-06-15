import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TicketNumber from './TicketNumber'

describe('TicketNumber', () => {
  it('renders the label properly', () => {
    render(<TicketNumber label="1" drawn={false} />)
    expect(screen.getByText("1")).toBeDefined();
  })

  it('if it\'s a drawn number, contains the class "drawn"', () => {
    render(<TicketNumber label="2" drawn={true} />)
    screen.debug(); 
    expect(screen.getByTestId("ticket-number")).toHaveClass("drawn");
  })
})