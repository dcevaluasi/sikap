import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DotLoader } from "react-spinners";

// Map's styling
export const defaultMapContainerStyle = {
  width: "100%",
  height: "60vh",
  borderRadius: "15px 0px 0px 15px",
};

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

// Navy palette styles for the map
const navyModeStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#111c44", // Navy 800
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
        color: "#aac0fe", // Navy 100
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#0b1437", // Navy 900
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#728fea", // Navy 300
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3652ba", // Navy 400
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#aac0fe", // Navy 100
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#aac0fe", // Navy 100
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#24388a", // Navy 600
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#aac0fe", // Navy 100
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#1b3bbb", // Navy 500
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3652ba", // Navy 400
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#1B254B", // Navy 700
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d0dcfb", // Navy 50
      },
    ],
  },
];

export const Map = () => {
  const defaultMapCenter = {
    lat: -0.5572709591052816,
    lng: 119.6669279254379,
  };

  const defaultMapZoom = 5.2;

  const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: "auto",
    styles: navyModeStyles, // Apply navy mode styles
  };

  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const mapRef = React.useRef<any>(null);

  const handleMarkerClick = (location: any) => {
    Cookies.set("IdSatdikSelected", location.id);

    if (mapRef.current) {
      mapRef.current!.setCenter({ lat: location.lat, lng: location.lng });
      setZoom(mapRef.current!.setZoom(100)); // You can set the desired zoom level here
    }
  };

  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  React.useEffect(() => {}, []);

  const [isOpen, setIsOpen] = React.useState(false); // State to control the sheet visibility

  const [zoom, setZoom] = React.useState<number>(5.2);

  const handleZoomChanged = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
  };

  return (
    <div className={`${plusJakartaSans.className} w-full`}>
      <GoogleMap
        ref={(map) => (mapRef.current = map)}
        mapContainerStyle={defaultMapContainerStyle}
        center={{
          lat: 4,
          lng: -160,
        }}
        zoom={10}
        options={defaultMapOptions}
      >
        <Marker
          icon={{
            url: "https://i.postimg.cc/Fs2CF16v/high-school.png", // URL of the custom marker icon
            scaledSize: new google.maps.Size(60, 60), // Scale the icon to the desired size
          }}
          position={{
            lat: 4,
            lng: -160,
          }}
        />
      </GoogleMap>
    </div>
  );
};
