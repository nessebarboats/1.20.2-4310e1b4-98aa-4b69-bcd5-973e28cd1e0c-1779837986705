export default function MasonryGallery() {
  const images = [
    "/static/images/gallery8-1100x1100.jpg",
    "/static/images/gallery2-1-672x448.jpg",
    "/static/images/gallery3-1-672x448.jpg",
    "/static/images/gallery4-1-672x448.jpg",
    "/static/images/gallery8-1100x1100.jpg",
    "/static/images/gallery3-1-672x448.jpg",
  ];

  return (
    <section className="w-full">
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
