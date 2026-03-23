"use client";

import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from "@/shared/components/ui/map";
import { MapPin } from "lucide-react";

interface LocationMapProps {
  coordinates: [number, number];
  label: string;
  address: string;
  badge: string;
}

function LocationMap({ coordinates, label, address, badge }: LocationMapProps) {
  return (
    <Map
      center={coordinates}
      zoom={15}
      className="h-full w-full"
      theme="dark"
      styles={{
        dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      }}
    >
      <MapControls position="bottom-right" showZoom />
      <MapMarker longitude={coordinates[0]} latitude={coordinates[1]}>
        <MarkerContent>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full shadow-lg"
            style={{ background: "linear-gradient(135deg, #f2ca50 0%, #d4af37 40%, #ff8f3d 100%)" }}
          >
            <MapPin className="h-4 w-4" style={{ color: "#3c2f00" }} />
          </div>
        </MarkerContent>
        <MarkerPopup closeButton>
          <div
            className="min-w-[180px] space-y-1.5 p-1"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#f2ca50" }}
            >
              {badge}
            </p>
            <p className="font-semibold" style={{ color: "#e5e2e1", fontFamily: "Noto Serif, serif" }}>
              {label}
            </p>
            <p className="text-sm" style={{ color: "#d0c5af" }}>{address}</p>
          </div>
        </MarkerPopup>
      </MapMarker>
    </Map>
  );
}

export function ContactMaps() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Lima */}
      <div className="rounded-xl overflow-hidden border glow-card" style={{ borderColor: "rgba(77,70,53,0.2)" }}>
        <div
          className="p-4 flex items-center gap-3"
          style={{ background: "#2a2a2a" }}
        >
          <span className="material-symbols-outlined" style={{ color: "#f2ca50", fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
          <span className="font-label text-sm font-bold" style={{ fontFamily: "Manrope, sans-serif", color: "#e5e2e1" }}>
            Lima, Peru - Barranco
          </span>
        </div>
        <div className="relative h-[300px] md:h-[350px]" style={{ background: "#1c1b1b" }}>
          <LocationMap
            coordinates={[-77.0226, -12.1435]}
            label="Sabor &amp; Salsa Lima"
            address="Jr. Bolognesi 414, Barranco"
            badge="Sede Original"
          />
        </div>
      </div>

      {/* Madrid */}
      <div className="rounded-xl overflow-hidden border glow-card" style={{ borderColor: "rgba(77,70,53,0.2)" }}>
        <div
          className="p-4 flex items-center gap-3"
          style={{ background: "#2a2a2a" }}
        >
          <span className="material-symbols-outlined" style={{ color: "#f2ca50", fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
          <span className="font-label text-sm font-bold" style={{ fontFamily: "Manrope, sans-serif", color: "#e5e2e1" }}>
            Madrid, España - La Latina
          </span>
        </div>
        <div className="relative h-[300px] md:h-[350px]" style={{ background: "#1c1b1b" }}>
          <LocationMap
            coordinates={[-3.7074, 40.4129]}
            label="Sabor &amp; Salsa Madrid"
            address="Calle de la Cava Baja 32, La Latina"
            badge="Nueva Apertura"
          />
        </div>
      </div>
    </div>
  );
}
