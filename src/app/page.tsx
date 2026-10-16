
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <h1 className="text-2xl font-bold tracking-tight">
          NSM <span className="text-blue-400">Search</span>
        </h1>
        <span className="text-sm text-slate-400">
          Search smarter
        </span>
      </nav>

      <section className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
          Welcome to NSM Search
        </span>

        <h2 className="text-4xl font-extrabold leading-tight sm:text-6xl">
          Discover more.
          <br />
          <span className="text-blue-400">
            Search better.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-slate-400 sm:text-lg">
          A fresh starting point for your search experience.
          Find what you need with a simple, clean interface.
        </p>

        <form
          action="/search"
          method="GET"
          className="mt-10 flex w-full max-w-2xl gap-2 rounded-2xl border border-white/10 bg-white/5 p-2"
        >
          <input
            type="search"
            name="q"
            placeholder="What are you looking for?"
            aria-label="Search query"
            required
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
          >
            Search
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500">
          Simple. Fast. Focused.
        </p>
      </section>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} NSM Search
      </footer>
    </main>
  );
}
