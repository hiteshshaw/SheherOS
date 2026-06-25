import loadGoogleMaps from '../utils/loadGoogleMaps';

import React, { useEffect, useRef } from 'react';

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#0f172a" }] }, // slate-900
  { elementType: "labels.text.stroke", stylers: [{ color: "#020617" }] }, // slate-950
  { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] }, // slate-400
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#cbd5e1" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#475569" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1e293b" }], // slate-800
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#0f172a" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#94a3b8" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#334155" }], // slate-700
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1e293b" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f8fafc" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#0f172a" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#cbd5e1" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#020617" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#475569" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#020617" }],
  },
];

// Props: issues (array), selectedIssue (object), onSelectIssue (function)
export default function GoogleMap({ issues, selectedIssue, onSelectIssue }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Initialise map on first render
  useEffect(() => {
    if (!window.google || !window.google.maps) return;
    const defaultCenter = { lat: 12.9716, lng: 77.5946 }; // Bengaluru centre
    const map = new window.google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      styles: DARK_MAP_STYLE,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    mapInstanceRef.current = map;
    return () => {
      // Cleanup markers and map
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync markers when issues or filter change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    // Clear existing markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    issues.forEach(issue => {
      const { lat, lng } = issue.coordinates || {};
      if (!lat || !lng) return;
      const isSelected = selectedIssue && selectedIssue.id === issue.id;
      const statusColor = (function () {
        const colors = {
          Pending: '#f59e0b',
          Verified: '#6366f1',
          Assigned: '#8b5cf6',
          'In Progress': '#3b82f6',
          Resolved: '#10b981',
        };
        return colors[issue.status] || '#f59e0b';
      })();

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: statusColor,
          fillOpacity: 1,
          strokeColor: '#fff',
          strokeWeight: 2,
          scale: isSelected ? 10 : 6,
        },
        title: issue.title,
      });
      marker.addListener('click', () => {
        onSelectIssue(issue);
      });
      markersRef.current.push(marker);
    });
  }, [issues, selectedIssue, onSelectIssue]);

  // Pan to selected issue when it changes
  useEffect(() => {
    if (!selectedIssue) return;
    const map = mapInstanceRef.current;
    if (!map) return;
    const { lat, lng } = selectedIssue.coordinates || {};
    if (lat && lng) {
      map.panTo({ lat, lng });
    }
  }, [selectedIssue]);

  return <div ref={mapRef} className="w-full h-full" />;
}
