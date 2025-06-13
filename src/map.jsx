import "./App.css"
import "leaflet/dist/leaflet.css"
import {MapContainer, TileLayer} from "react-leaflet"
import {Marker, Popup} from "react-leaflet";

export default function Map() {

    const markers = [
        {
            geocode: [35.6009501, -82.55401],
            popUp: "Asheville"
        }

    ];


    return (
        <MapContainer center={[35.60095, -82.554]} zoom={6}>
            <TileLayer

                url={"https://tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
            {markers.map(marker=> (
                    <Marker position={marker.geocode}>
                        <Popup>
                            {marker.popUp}
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
}
