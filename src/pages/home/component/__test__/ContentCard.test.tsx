import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContentCard } from "../ContentCard";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ContentCard Component", () => {
  const mockProps = {
    title: "Test Movie",
    image: "test-image.jpg",
    year: "2023",
    category: "Action",
    id: "123",
  };

  it("renders the component with all props", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.year)).toBeInTheDocument();
    expect(screen.getByText(mockProps.category)).toBeInTheDocument();
    const imageElement = screen.getByAltText(mockProps.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe(mockProps.image);
  });

  it("renders the component with a placeholder image when no image is provided", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} image="" />
      </BrowserRouter>
    );

    const imageElement = screen.getByAltText(mockProps.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute("src")).toBe("/placeholder.svg");
  });

  it("calls the handleClick function and navigates to the correct movie detail page", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} />
      </BrowserRouter>
    );

    const titleElement = screen.getByText(mockProps.title);
    fireEvent.click(titleElement);

    expect(mockNavigate).toHaveBeenCalledWith("/movie/123");
  });

  it("renders rating when provided", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} rating={8.5} />
      </BrowserRouter>
    );
    expect(screen.getByText("8.5")).toBeInTheDocument();
  });

  it("renders episode number and title when provided", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} episodeNumber={1} episodeTitle="Pilot" />
      </BrowserRouter>
    );
    expect(screen.getByText("Episode 1: Pilot")).toBeInTheDocument();
  });

  it("renders 'NEW' badge when isNew is true", () => {
    render(
      <BrowserRouter>
        <ContentCard {...mockProps} isNew={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });
});
