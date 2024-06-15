import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TicketGrid from './TicketGrid'

describe('TicketGrid component', () => {
  it('renders the container element', () => {
    render(<TicketGrid totalNumbers={10} />)
    expect(screen.getByTestId("ticket-grid")).toBeDefined();
  })

  it('renders the right number of numbers', () => {
    const n = 10
    render(<TicketGrid totalNumbers={n} />)
    // screen.debug();
    expect(screen.getAllByTestId("ticket-number")).toHaveLength(n);
  })

  it('renders only the drawn numbers with class "drawn"', () => {
    const n = 10
    const dn = [2,4,6]
    render(<TicketGrid totalNumbers={n} drawnNumbers={dn} />)
    for (let i=1; i<=n; i++) {
      const elem = screen.queryByText(i).parentElement;
      if(dn.includes(i)) {
        expect(elem).toHaveClass("drawn");
      } else {
        expect(elem).not.toHaveClass("drawn");
      }
    }
  })


})