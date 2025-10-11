"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Simple, reliable map component
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface SimpleLeafletMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  markers?: Array<{
    position: [number, number];
    title: string;
    description?: string;
  }>;
}

export function SimpleLeafletMap({ 
  center = [17.0583, 121.6019],
  zoom = 14,
  height = "500px",
  markers = []
}: SimpleLeafletMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMounted, center, zoom]);

  if (!isMounted) {
    return (
      <div 
        className="w-full bg-gray-200 rounded-lg flex items-center justify-center border border-neutral-300"
        style={{ height }}
      >
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden border border-neutral-300" style={{ height, minHeight: height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", minHeight: "100%" }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        key={`${center[0]}-${center[1]}-${zoom}`}
        ref={mapRef}
        whenReady={() => {
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 100);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
          errorTileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{marker.title}</h3>
                {marker.description && (
                  <p className="text-xs text-gray-600 mt-1">{marker.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
