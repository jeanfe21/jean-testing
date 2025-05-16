const MovieNotFound = () => {
  return (
    <div>
      <main className="min-h-screen bg-gradient-to-b from-purple-900/40 via-black to-black pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-2">
                Movie Not Found
              </h1>
              <p className="text-white/70">
                The movie you're looking for doesn't exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieNotFound;
