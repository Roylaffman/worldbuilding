import "./App.css"
import "leaflet/dist/leaflet.css"
import {MapContainer, TileLayer, LayersControl} from "react-leaflet"
import {Marker, Popup, Tooltip} from "react-leaflet";

export default function Map() {

    const markers = [
        {
            id: 1,
            geocode: [35.6009501, -82.55401],
            popUp: "Asheville"
        },
        {
            id: 2,
            geocode: [35.56352278786, -82.5548627995],
            popUp: "Biltmore Mound"
        }

    ];


    return (

        <MapContainer center={[35.60095, -82.554]} zoom={9}>
            {/* Multiple Basemap Options */}
            <LayersControl position="topright">
                {/* Basemap 1 */}
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer

                        url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    />
                </LayersControl.BaseLayer>

                {/* Basemap 2 */}
                <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        opacity={0.9}
                    />

                </LayersControl.BaseLayer>
            </LayersControl>
            {/* Markers Outside of Layers */}
            {markers.map(marker => (
                <Marker key={marker.id} position={marker.geocode} >
                    <Popup closeButton={true} autoClose={true} closeOnEscapeKey={true}>
                        <div>{marker.popUp}</div>
                        {/* <Tooltip hover>ECFU</Tooltip>*/}
                    </Popup>

                </Marker>
            ))
            }
            <Tooltip hover>Always visible text</Tooltip>
        </MapContainer>
    );
}
