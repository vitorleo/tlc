import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TicketNumber from './TicketNumber'

describe('TicketNumber component', () => {
  it('renders the label properly', () => {
    render(<TicketNumber label="1" drawn={false} />)
    expect(screen.getByText("1")).toBeDefined();
  })

  it('contains the class "drawn" if it\'s a drawn number', () => {
    render(<TicketNumber label="2" drawn={true} />)
    expect(screen.getByTestId("ticket-number")).toHaveClass("drawn");
  })
})