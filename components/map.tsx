"use client";

import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map, Marker, LngLatBounds } from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css"; // Import Mapbox GL CSS
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"; // Adjust the import path as necessary
import { MdKeyboardArrowRight } from "react-icons/md";
import { PelatihanMasyarakat } from "@/types/product";
import axios, { AxiosResponse } from "axios";
import { truncateText } from "@/utils";
import Link from "next/link";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3VzdG9uZWNydXNoIiwiYSI6ImNsemR3bGp6aDBreGcyanM4b2dxYzNtYzAifQ.cFGfY0B2oKFTf5XfVrFTIw";

const locations = [
  {
    lng: 109.15246944603237,
    lat: -6.854096593757315,
    name: "BPPP Tegal",
    location: "tegal",
    description: "Balai Pelatihan dan Penyuluhan Perikanan Tegal.",
  },
  {
    lng: 128.1984058812489,
    lat: -3.6593469197467323,
    name: "BPPP Ambon",
    location: "ambon",
    description: "Balai Pelatihan dan Penyuluhan Perikanan Ambon.",
  },
  {
    lng: 114.42107402176605,
    lat: -8.071680308693933,
    name: "BPPP Banyuwangi",
    location: "banyuwangi",
    description: "Balai Pelatihan dan Penyuluhan Perikanan Banyuwangi.",
  },
  {
    lng: 125.2127379923902,
    lat: 1.4584143381978947,
    name: "BPPP Bitung",
    location: "bitung",
    description: "Balai Pelatihan dan Penyuluhan Perikanan Bitung.",
  },
  {
    lng: 98.60778803618938,
    lat: 4.365581800690166,
    name: "BPPP Medan",
    location: "medan",
    description: "Balai Pelatihan dan Penyuluhan Perikanan Medan.",
  },
];

export default function MapIndonesia() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lng: number;
    lat: number;
    name: string;
    description: string;
    location: string;
  } | null>(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [data, setData] = React.useState<PelatihanMasyarakat[]>([]);

  const handleFetchingPublicTrainingDataByPenyelenggara = async (
    location: string
  ) => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/lemdik/getPelatihan?penyelenggara_pelatihan=${location}`
      );
      console.log({ response });
      setData(response.data.data);
    } catch (error) {
      console.error("Error posting training data:", error);
      throw error;
    }
  };

  console.log(selectedLocation?.name);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [113.921327, -0.789275],
        zoom: 4.45,
      });

      map.current.on("style.load", () => {
        if (map.current) {
          // Set water color to transparent
          map.current.setPaintProperty(
            "water",
            "background-color",
            "rgba(0, 0, 0, 0)"
          );

          // Define bounding box for Indonesia
          const bounds = new LngLatBounds(
            [95.0, -11.0], // Southwest coordinates [longitude, latitude]
            [141.0, 6.0] // Northeast coordinates [longitude, latitude]
          );

          // Fit the map to the bounding box
          map.current.fitBounds(bounds, {
            padding: 20, // Optional padding around the bounds
            maxZoom: 10, // Optional maximum zoom level
          });
        }
      });

      // Add markers to the map
      locations.forEach((location) => {
        const markerElement = document.createElement("div");
        markerElement.className = "custom-marker"; // Add a class for styling
        markerElement.style.backgroundImage =
          "url(/illustrations/white-house.png)"; // Replace with your image path
        markerElement.style.backgroundSize = "contain";
        markerElement.style.width = "40px"; // Adjust the size as needed
        markerElement.style.height = "40px";

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([location.lng, location.lat])
          .addTo(map.current!);

        // Add click event to the marker
        marker.getElement().addEventListener("click", async () => {
          console.log("Marker clicked:", location); // Debug log
          setSelectedLocation(location);
          await handleFetchingPublicTrainingDataByPenyelenggara(location.name);
          setSheetOpen(true);
          map.current!.flyTo({
            center: [location.lng, location.lat],
            zoom: 10,
          }); // Adjust the zoom level if needed
        });
      });
    }
  }, []); // empty dependency array to run effect only once

  useEffect(() => {
    console.log("Selected location updated:", selectedLocation); // Debug log
  }, [selectedLocation]);

  return (
    <div className="rounded-xl">
      <div
        ref={mapContainer}
        className="map-container h-[500px] rounded-xl"
        style={{ height: "500px" }}
      />

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side={"left"} className="z-[100000000]">
          <SheetHeader>
            <SheetTitle className="font-calsans text-2xl">
              {selectedLocation?.name}
            </SheetTitle>
            <SheetDescription>
              {selectedLocation && (
                <div className="-mt-3">
                  Longitude: {selectedLocation.lng} <br />
                  Latitude: {selectedLocation.lat} <br />
                  Description: {selectedLocation.description}
                </div>
              )}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-row w-full justify-end">
            <Link
              href={`/bppp/${selectedLocation?.location}`}
              className="text-xs  font-normal leading-[100%] tracking-tighter text-blue-500 flex gap-2 items-center justify-center mt-5"
            >
              Explore balai & pelatihan lainnya <MdKeyboardArrowRight />
              <br />
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-5 h-full overflow-y-scroll ">
            {data.map((dataPelatihan, index) => (
              <div className="relative flex flex-col   space-y-3 md:space-y-0 rounded-xl  p-3   mx-auto border border-gray-300 bg-white">
                <div className=" bg-white flex flex-col space-y-2 p-3">
                  <div className="flex justify-between item-center">
                    <p className="text-gray-500 font-medium hidden text-xs">
                      Vacations
                    </p>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <p className="text-gray-600 font-bold text-xs ml-1">
                        4.96
                        <span className="text-gray-500 font-normal">
                          (76 reviews)
                        </span>
                      </p>
                    </div>

                    <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                      {dataPelatihan?.BidangPelatihan}
                    </div>
                  </div>
                  <h3 className="font-black text-gray-800  text-lg leading-[100%]">
                    {dataPelatihan.NamaPelatihan}
                  </h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        data &&
                        truncateText(
                          dataPelatihan?.DetailPelatihan,
                          150,
                          "..."
                        ),
                    }}
                    className="text-xs font-normal group-hover:text-xs text-gray-500 group-hover:duration-1000 leading-[105%]"
                  />
                  <p className="text-xl font-black text-gray-800">
                    Rp{" "}
                    {dataPelatihan?.HargaPelatihan.toString().toLocaleString(
                      "ID"
                    )}
                    <span className="font-normal text-gray-600 text-base">
                      /diklat
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
