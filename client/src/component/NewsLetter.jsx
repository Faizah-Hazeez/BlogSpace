function NewsLetter() {
  return (
    <section className="px-6 py-10 lg:px-20 my-4 font-default-family">
      <div>
        <h2 className="text-lg font-bold text-gray-800 text-center">
          Never Miss a Blog!
        </h2>
        <p className="text-gray-600 mb-2 text-center">
          Subscribe to our newsletter for the latest blog updates.
        </p>
      </div>

      <form className="flex justify-center w-full">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-400 w-1/2"
        />
        <button className="px-4 py-2 bg-blue-400 text-white rounded-r-md hover:bg-blue-500 transition-colors">
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default NewsLetter;
