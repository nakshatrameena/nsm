export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <main style={{ padding: 24 }}>
      <h1>Search Results</h1>
      <p>Searching for: {q}</p>
    </main>
  );
}
