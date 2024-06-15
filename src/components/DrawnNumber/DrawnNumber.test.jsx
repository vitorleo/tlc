import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DrawnNumber from './DrawnNumber'

describe('DrawnNumber component', () => {
  it('renders with no children', () => {
    render(<DrawnNumber></DrawnNumber>)
    const elem = screen.getByTestId("drawn-number")
    expect(elem).toBeInTheDocument();
    expect(elem).toBeEmptyDOMElement();
  })

  it('renders the children', () => {
    render(<DrawnNumber>23</DrawnNumber>)
    expect(screen.getByText("23")).toBeInTheDocument();
  })
})