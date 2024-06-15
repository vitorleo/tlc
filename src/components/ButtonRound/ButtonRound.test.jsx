import { describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonRound from './ButtonRound'

describe('ButtonRound component', () => {
    it('renders a button', () => {
        render(<ButtonRound label="Click Me"></ButtonRound>)
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it('renders the correct label', () => {
        render(<ButtonRound label="Click Me"></ButtonRound>)
        expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it('renders an image if icon is defined', () => {
        render(<ButtonRound label="Click Me" icon="./img/img.svg">23</ButtonRound>)
        const elem = screen.getByRole("img");
        expect(elem).toBeInTheDocument();
        expect(elem).toHaveAttribute("src", "./img/img.svg");
    });

    it('does not render an image if icon is not defined', () => {
        render(<ButtonRound label="Click Me"></ButtonRound>)
        const elem = screen.queryByRole("img");
        expect(elem).toBeNull();
    });

    it('fires the onClick function when pressed', () => {
        const buttonFunction = vi.fn();
        render(<ButtonRound label="Click Me" onClick={buttonFunction}>23</ButtonRound>)
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);
        expect(buttonFunction).toBeCalled()
    });
})