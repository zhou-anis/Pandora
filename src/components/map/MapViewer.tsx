import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 修复 Leaflet 默认图标在 bundler 中的路径问题
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// @ts-expect-error Leaflet 默认图标修复
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

interface Props {
  lat: number;
  lng: number;
  name: string;
  zoom?: number;
  height?: string;
}

/** 地图视角自动居中 */
const FlyTo: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1 });
  }, [lat, lng, zoom, map]);
  return null;
};

/**
 * 多源瓦片地图 —— 国内可访问
 * - 主层: ESRI World Street Map (全球覆盖，国内通常可访问)
 * - 备选: CartoDB Voyager (美观，CDN 覆盖好)
 */
const TILE_LAYERS = [
  {
    name: "街道地图",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ",
    checked: true,
  },
  {
    name: "浅色地图",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    checked: false,
  },
  {
    name: "地形图",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "&copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom",
    checked: false,
  },
];

const MapViewer: React.FC<Props> = ({ lat, lng, name, zoom = 13, height = "360px" }) => {
  // 安全守卫：无效坐标时不渲染地图
  if (lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
    return (
      <div style={{ height, width: "100%" }} className="rounded-2xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">地图坐标不可用</span>
      </div>
    );
  }

  return (
    <div style={{ height, width: "100%" }} className="rounded-2xl overflow-hidden shadow-md">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="z-10"
      >
        <LayersControl position="topright">
          {TILE_LAYERS.map((layer) => (
            <LayersControl.BaseLayer
              key={layer.name}
              checked={layer.checked}
              name={layer.name}
            >
              <TileLayer attribution={layer.attribution} url={layer.url} />
            </LayersControl.BaseLayer>
          ))}
        </LayersControl>

        <Marker position={[lat, lng]}>
          <Popup>{name}</Popup>
        </Marker>
        <FlyTo lat={lat} lng={lng} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

export default MapViewer;
