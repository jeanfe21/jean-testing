import { renderHook, act } from "@testing-library/react";
import { useMobile } from "../use-mobile";

describe("useMobile Hook", () => {
  const originalWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalWidth,
    });
  });

  afterEach(() => {
    window.innerWidth = originalWidth;
    window.dispatchEvent(new Event("resize"));
  });

  it("should return true when window width is less than 768", () => {
    window.innerWidth = 767;
    window.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(true);
  });

  it("should return false when window width is greater than or equal to 768", () => {
    window.innerWidth = 768;
    window.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(false);
  });

  it("should update when window is resized", () => {
    window.innerWidth = 768;
    window.dispatchEvent(new Event("resize"));

    const { result } = renderHook(() => useMobile());

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth = 767;
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current).toBe(true);
  });
});
