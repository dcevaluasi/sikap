//Since the map will be laoded and displayed on client side
"use client";

// Import necessary modules and functions from external libraries and our own project
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";
import { DotLoader } from "react-spinners";

// Define a list of libraries to load from the Google Maps API
const libraries = ["places", "drawing", "geometry"];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!scriptLoaded)
    return (
      <div className="flex w-full h-fit py-10 items-center justify-center">
        <DotLoader color="#2152ff" size={50} />
      </div>
    );

  // Return the children prop wrapped by this MapProvider component
  return children;
}
