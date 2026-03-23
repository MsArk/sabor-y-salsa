"use client";

import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/shared/components/ui/map";
import { MapPin, Phone, Clock } from "lucide-react";

interface VenueMapProps {
  coordinates: [number, number];
  venueName: string;
  address: string;
  phone: string;
}

export function VenueMap({ coordinates, venueName, address, phone }: VenueMapProps) {
  return (
    <Map
      center={coordinates}
      zoom={15}
      className="h-full w-full"
      theme="dark"
      styles={{
        dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      }}
    >
      <MapControls position="bottom-right" showZoom showLocate />

      <MapMarker longitude={coordinates[0]} latitude={coordinates[1]}>
        <MarkerContent>
          <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg" style={{ background: "linear-gradient(135deg, #f2ca50, #d4af37)" }}>
            <MapPin className="h-5 w-5" style={{ color: "#131313" }} />
          </div>
        </MarkerContent>

        <MarkerPopup closeButton>
          <div className="min-w-[200px] space-y-2 p-1" style={{ background: "var(--surface-container-highest)", borderRadius: "0.75rem" }}>
            <p className="label-category" style={{ color: "var(--primary)" }}>
              Street Food Latino
            </p>
            <p className="font-semibold" style={{ color: "var(--on-surface)", fontFamily: "Noto Serif, serif" }}>
              {venueName}
            </p>
            <div className="flex items-start gap-2 text-sm" style={{ color: "var(--on-surface-variant)" }}>
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--primary)" }} />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--on-surface-variant)" }}>
              <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--primary)" }} />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--on-surface-variant)" }}>
              <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--primary)" }} />
              <span>Mar – Dom · 12:00 – 23:00</span>
            </div>
          </div>
        </MarkerPopup>
      </MapMarker>
    </Map>
  );
}
