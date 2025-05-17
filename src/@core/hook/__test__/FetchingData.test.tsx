import { renderHook, waitFor } from "@testing-library/react";
import GetData from "../FetchingData";
import { API } from "../../service/api";
import type { UseQueryOptions } from "@tanstack/react-query";

// Mock the API module
jest.mock("../../service/api");

describe("GetData Hook", () => {
  const mockData = { id: 1, name: "Test Data" };
  const mockUrl = "/test";
  const mockKey = ["test"];

  beforeEach(() => {
    // Clear mocks before each test
    (API.get as jest.Mock).mockClear();
  });

  it("should fetch data successfully", async () => {
    (API.get as jest.Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => GetData(mockUrl, mockKey));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(API.get).toHaveBeenCalledWith(mockUrl, { params: undefined });
  });

  it("should handle initial data", async () => {
    const initialData = { id: 2, name: "Initial Data" };

    const { result } = renderHook(() =>
      GetData(mockUrl, mockKey, undefined, initialData)
    );

    expect(result.current.data).toEqual(initialData);
  });

  it("should pass otherQueryOptions to useQuery", async () => {
    (API.get as jest.Mock).mockResolvedValue({ data: mockData });

    const mockOptions: Omit<
      UseQueryOptions<typeof mockData>,
      "queryKey" | "queryFn"
    > = {
      refetchOnMount: false,
    };

    const { result } = renderHook(() =>
      GetData(mockUrl, mockKey, undefined, undefined, true, mockOptions)
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
  });

  it("should pass params to API.get", async () => {
    const mockParams = { query: "test" };
    (API.get as jest.Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => GetData(mockUrl, mockKey, mockParams));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(API.get).toHaveBeenCalledWith(mockUrl, { params: mockParams });
  });
});
