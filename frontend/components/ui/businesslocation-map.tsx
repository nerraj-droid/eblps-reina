"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

interface BusinessLocationMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export function BusinessLocationMap({ 
  center = [17.0583, 121.6019],
  zoom = 14,
  height = "500px"
}: BusinessLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainer.current || map.current) return;

    // Initialize the map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
              'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            attribution: '© Esri',
            minzoom: 0,
            maxzoom: 16
          },
          'labels': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: '© Esri',
            minzoom: 0,
            maxzoom: 16
          },
          'streets': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: '© Esri',
            minzoom: 0,
            maxzoom: 16
          },
          'buildings': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: '© Esri',
            minzoom: 0,
            maxzoom: 16
          }
        },
        layers: [
          {
            id: 'satellite',
            type: 'raster',
            source: 'satellite',
            minzoom: 8,
            maxzoom: 16
          },
          {
            id: 'streets',
            type: 'raster',
            source: 'streets',
            minzoom: 0,
            maxzoom: 16,
            paint: {
              'raster-opacity': 0.7
            }
          },
          {
            id: 'buildings',
            type: 'raster',
            source: 'buildings',
            minzoom: 0,
            maxzoom: 16,
            paint: {
              'raster-opacity': 0.5
            }
          },
          {
            id: 'labels',
            type: 'raster',
            source: 'labels',
            minzoom: 0,
            maxzoom: 16,
            paint: {
              'raster-opacity': 1.0
            }
          }
        ]
      },
      center: [center[1], center[0]], // [longitude, latitude]
      zoom: zoom,
      minZoom: 0,
      maxZoom: 14,
      renderWorldCopies: false,
    });

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    // Add scale control
    map.current.addControl(new maplibregl.ScaleControl({
      maxWidth: 100,
      unit: 'metric'
    }), 'bottom-left');
    
    // Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');
    
    // Add geolocate control
    map.current.addControl(new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }), 'top-right');

    // Add error handling for tile loading
    map.current.on('error', (e) => {
      console.warn('Map error:', e);
    });

    map.current.on('sourcedata', (e) => {
      if (e.isSourceLoaded && e.source && e.source.type === 'raster') {
        // Handle tile loading errors
        const source = map.current?.getSource(e.sourceId);
        if (source && source.type === 'raster') {
          // Source loaded successfully
        }
      }
    });


    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isMounted]);


  // Update map center and zoom when props change
  useEffect(() => {
    if (map.current) {
      map.current.flyTo({
        center: [center[1], center[0]], // [longitude, latitude]
        zoom: zoom,
        duration: 1000,
        essential: true
      });
      
    }
  }, [center, zoom]);

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
    <div className="w-full rounded-lg overflow-hidden border border-neutral-300" style={{ height }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}