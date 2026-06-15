export default function MasonryGallery() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Our Gallery
        </h2>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {images.map((image, index) => (
            <div
              key={index}
              className="mb-6 overflow-hidden rounded-2xl"
            >
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
