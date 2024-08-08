import './map.scss';
import  {MapContainer,Marker,Popup,TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

function Map({items}) {
  return (
    <MapContainer center={items.length ===1 ? [items[0].latitude,items[0].longitude]:[23.30,80.30]} zoom={items.length==1 ? 10:5} scrollWheelZoom={true} className="map">
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
      <Pin item={item} key={item.id}  />
    ))}
  </MapContainer>
  )
}

export default Map
