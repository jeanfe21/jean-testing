import React from "react";
import { render, screen } from "@testing-library/react";
import HeroSection from "../HeroSection";

const mockProps = {
  title: "Test Title",
  description: "Test Description",
  rating: "4.5",
  date: "2024-01-01",
  imageUrl: "test.jpg",
};

describe("HeroSection Component", () => {
  it("renders HeroSection with provided props", () => {
    render(<HeroSection {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    expect(screen.getByText(mockProps.rating)).toBeInTheDocument();
    expect(screen.getByText(mockProps.date)).toBeInTheDocument();

    const image = screen.getByAltText("The Royal Princess");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.imageUrl);
  });
});
