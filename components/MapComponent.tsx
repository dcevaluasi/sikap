import React from "react";

import { GoogleMap, OverlayView } from "@react-google-maps/api";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BlankoKeluar } from "@/types/blanko";

// Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

// Navy palette styles for the map
const customMapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#D9D9D9", // Light gray for land
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for labels
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#FFFFFF", // White for better label contrast
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#B3B3B3", // Medium gray for administrative boundaries
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for country names
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for city names
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for points of interest
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#E0E0E0", // Light gray for roads
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for road labels
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#CFCFCF", // Slightly darker gray for arterial roads
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#B3B3B3", // Medium gray for highways
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#FFFFFF", // White for the sea
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6B6B6B", // Dark gray for water labels
      },
    ],
  },
];

const CustomMarker = ({
  position,
  data,
  mapRef,
  selectedSummary,
}: {
  position: google.maps.LatLngLiteral;
  data: BlankoKeluar;
  mapRef: React.RefObject<google.maps.Map | null>;
  selectedSummary: string;
}) => {
  const handleMarkerClick = () => {
    if (mapRef.current) {
      mapRef.current.setCenter(position); // Center the map to the marker's position
      mapRef.current.setZoom(10); // Set a closer zoom level
    }
  };

  // Conditionally render the marker based on `selectedSummary` and `data.NamaPelaksana`
  if (
    selectedSummary === "Balai Pelatihan KP" &&
    !data.NamaPelaksana.startsWith("BPPP")
  ) {
    return null; // Don't render the marker if conditions are not met for Balai Pelatihan KP
  } else if (
    selectedSummary === "Pelabuhan Perikanan" &&
    !(
      data.NamaPelaksana.startsWith("PPP") ||
      data.NamaPelaksana.startsWith("PPN") ||
      data.NamaPelaksana.startsWith("PPS") ||
      data.NamaPelaksana.startsWith("BBPI")
    )
  ) {
    return null; // Don't render the marker if data.NamaPelaksana doesn't start with any of the specified keywords for Pelabuhan Perikanan
  }

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className={`${plusJakartaSans.className} relative group ${
          data!.Longitude == "" ? "hidden" : "block"
        }`}
        onClick={handleMarkerClick} // Handle click event
      >
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:flex items-center justify-center bg-gray-800 w-36 text-white text-xs rounded px-2 py-1">
          {data.SasaranMasyarakat} - {data.AsalPendapatan}
        </div>
        {/* Circle with Gradient */}
        <div
          className={`animate-pulse w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base`}
          style={{
            background:
              data.NamaProgram === "Sertifikat Kecakapan Nelayan"
                ? "linear-gradient(135deg, #80CAEE, rgba(255, 255, 255,  0))"
                : "linear-gradient(135deg, #3C50E0, rgba(255, 255, 255,  0))",
          }}
        >
          {data.JumlahBlankoDisetujui}
        </div>
      </div>
    </OverlayView>
  );
};

export const MapComponent = ({
  data,
  selectedSummary,
}: {
  data: BlankoKeluar[];
  selectedSummary: string;
}) => {
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    styles: customMapStyles, // Apply navy mode styles
  };

  return (
    <div className={`${plusJakartaSans.className} w-full flex flex-col gap-2`}>
      <GoogleMap
        ref={(map: any) => (mapRef!.current! = map!)}
        mapContainerStyle={defaultMapContainerStyle}
        center={{
          lat: -2.5489, // Center latitude of Indonesia
          lng: 118.0149, // Center longitude of Indonesia
        }}
        zoom={5} // Adjust zoom level to show the entire archipelago
        options={defaultMapOptions}
      >
        {data!.map((data, index) => (
          <CustomMarker
            key={index}
            data={data}
            selectedSummary={selectedSummary}
            position={{
              lat: parseFloat(data!.Latitude!),
              lng: parseFloat(data!.Longitude!),
            }}
            mapRef={mapRef}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
