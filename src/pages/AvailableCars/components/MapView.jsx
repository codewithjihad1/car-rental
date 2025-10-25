import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom car marker icon
const carIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMzMzMyIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0xOC45MiA2LjAxQzE4LjcyIDUuNDIgMTguMTYgNSAxNy41IDVoLTExQzUuODQgNSA1LjI4IDUuNDIgNS4wOCA2LjAxTDMgMTJ2OGMwIC41NS40NSAxIDEgMWgxYy41NSAwIDEtLjQ1IDEtMXYtMWgxMnYxYzAgLjU1LjQ1IDEgMSAxaDFjLjU1IDAgMS0uNDUgMS0xdi04bC0xLjkyLTUuOTl6TTYuNSAxNmMtLjgzIDAtMS41LS42Ny0xLjUtMS41UzUuNjcgMTMgNi41IDEzcy41LjY3LjUgMS41LS42Ny41LTEuNS41em0xMSAwYy0uODMgMC0xLjUtLjY3LTEuNS0xLjVzLjY3LTEuNSAxLjUtMS41IDEuNS42NyAxLjUgMS41LS42NyAxLjUtMS41IDEuNXpNNSAxMWwyLTYgMTAgLjAxIDIgNS45OUg1eiIvPjwvc3ZnPg==',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Component to fit map bounds to markers
const FitBounds = ({ cars }) => {
    const map = useMap();

    useEffect(() => {
        if (cars && cars.length > 0) {
            const bounds = L.latLngBounds(
                cars
                    .filter(car => car.location?.lat && car.location?.lng)
                    .map(car => [car.location.lat, car.location.lng])
            );

            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
            }
        }
    }, [cars, map]);

    return null;
};

const MapView = ({ cars, onCarHover }) => {
    const mapRef = useRef(null);
    const defaultCenter = [23.8103, 90.4125]; // Dhaka, Bangladesh
    const defaultZoom = 12;

    return (
        <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                className="h-full w-full"
                ref={mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds cars={cars} />

                {cars
                    .filter(car => car.location?.lat && car.location?.lng)
                    .map((car) => (
                        <Marker
                            key={car._id}
                            position={[car.location.lat, car.location.lng]}
                            icon={carIcon}
                            eventHandlers={{
                                mouseover: () => onCarHover && onCarHover(car._id),
                                mouseout: () => onCarHover && onCarHover(null),
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-2 min-w-[200px]">
                                    <img
                                        src={car.image}
                                        alt={car.model}
                                        className="w-full h-32 object-cover rounded-lg mb-2"
                                    />
                                    <h3 className="font-bold text-lg mb-1">{car.model}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{car.brand}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-blue-600 font-bold text-lg">
                                            ${car.price}/day
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${car.availability === 'Available'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {car.availability}
                                        </span>
                                    </div>
                                    <Link
                                        to={`/car/${car._id}`}
                                        className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
};

export default MapView;
