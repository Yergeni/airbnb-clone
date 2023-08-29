'use client';

import LMap from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

/* Assets from leaflet */
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Small fix
// @ts-ignore
delete LMap.Icon.Default.prototype._getIconUrl;

LMap.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type MapProps = {
  center?: number[];
};

export default function Map({ center }: MapProps) {
  return (
    <MapContainer
      center={(center as LMap.LatLngExpression) || [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && <Marker position={center as LMap.LatLngExpression} />}
    </MapContainer>
  );
}
