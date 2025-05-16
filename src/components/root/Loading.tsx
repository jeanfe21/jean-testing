const Loading = () => {
  return (
    <main className=" h-screen bg-gradient-to-b from-purple-900/40 via-black to-black pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-48 bg-gray-700 rounded mb-4" />
            <div className="h-4 w-64 bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
