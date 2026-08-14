import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import MapboxMap, { MapMarker } from './MapboxMap';

const locations: MapMarker[] = [
  { id: 1, longitude: -122.4194, latitude: 37.7749, label: 'San Francisco HQ' },
  { id: 2, longitude: -74.006, latitude: 40.7128, label: 'New York Office' },
  { id: 3, longitude: -0.1276, latitude: 51.5074, label: 'London Office' },
];


export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-between fancy-overlay">
      <Header />

      <div className="w-full flex flex-col items-center my-12">
        <section className="w-full p-6 container-narrow">
          <h1 className="text-4xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-6xl fancy-heading">
            About nessebarboats
          </h1>
    <main style={{ padding: 24 }}>
      <h1>Our Locations</h1>
      <MapboxMap markers={locations} zoom={2} height={500} />
    </main>
          <p className="mt-6 md:text-xl">nessebarboats</p>

          <p className="mt-6 md:text-xl"></p>
        </section>
      </div>

      <Footer />
    </div>
  );
}
