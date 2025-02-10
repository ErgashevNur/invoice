function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-7xl font-bold">404</h1>
      <p className="mt-4 text-lg text-gray-400">
        Oops! This page could not be found.
      </p>
      <a
        href="/"
        className="mt-6 rounded-lg bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
