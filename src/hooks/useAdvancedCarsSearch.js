import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import axiosInstance from "../api/axios";

/**
 * Advanced car search hook with TanStack Query
 * Handles filtering, sorting, pagination, and geolocation
 */
export const useAdvancedCarsSearch = () => {
    const [searchParams] = useSearchParams();

    // Extract all query parameters
    const queryParams = {
        query: searchParams.get("query") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        transmission: searchParams.get("transmission") || "",
        fuel: searchParams.get("fuel") || "",
        seats: searchParams.get("seats") || "",
        rating: searchParams.get("rating") || "",
        lat: searchParams.get("lat") || "",
        lng: searchParams.get("lng") || "",
        radius: searchParams.get("radius") || "",
        sort: searchParams.get("sort") || "dateAdded_desc",
        page: parseInt(searchParams.get("page") || "1"),
        limit: parseInt(searchParams.get("limit") || "12"),
    };

    // Build query string from params
    const buildQueryString = (params) => {
        const filtered = Object.entries(params).filter(
            ([_, value]) => value !== ""
        );
        return new URLSearchParams(filtered).toString();
    };

    const queryString = buildQueryString(queryParams);

    // Fetch cars with TanStack Query
    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ["cars", queryParams],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `/api/cars/search?${queryString}`
            );
            return response.data;
        },
        keepPreviousData: true,
    });

    return {
        cars: data?.cars || [],
        totalCars: data?.total || 0,
        totalPages: data?.totalPages || 0,
        currentPage: queryParams.page,
        isLoading,
        isFetching,
        error,
        refetch,
        queryParams,
    };
};
