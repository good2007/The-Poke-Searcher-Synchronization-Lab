'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!searchInput.trim()) {
      setPokemon(null);
      setErrorMessage(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const searchName = searchInput.trim().toLowerCase();

    async function fetchPokemon() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(searchName)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setErrorMessage("Pokémon not found!");
          } else {
            setErrorMessage("Unable to load Pokémon data.");
          }
          setPokemon(null);
          return;
        }

        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage("Unable to load Pokémon data.");
          setPokemon(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemon();

    return () => controller.abort();
  }, [searchInput]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.14),_transparent_30%)]" />
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-12">
        <div className="relative w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-10 py-10 shadow-[0_24px_90px_-50px_rgba(15,23,42,0.18)]">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100 opacity-70 blur-3xl" />
          <div className="relative mb-10 text-center">
            <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-violet-700">
              Live search
            </span>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500">
              Poké-Searcher Synchronization Lab by Goodrick Abedi
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Fast Pokémon search with real-time preview
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600 sm:text-lg">
              Type a Pokémon name to instantly preview the sprite, types, and core stats in a crisp app UI.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr]">
            <section className="space-y-5">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="pokemon-search">
                Pokémon name
              </label>
              <input
                id="pokemon-search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="e.g. pikachu"
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-5 py-4 text-lg font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
              <p className="text-sm text-slate-500">
                The dashboard only queries the PokéAPI when the input is filled.
              </p>

              {isLoading && (
                <div className="rounded-3xl bg-slate-100 p-4 text-slate-600 shadow-sm">
                  Loading Pokémon data...
                </div>
              )}

              {errorMessage && !isLoading && (
                <div className="rounded-3xl bg-violet-50 p-4 text-violet-700 shadow-sm">{errorMessage}</div>
              )}
            </section>

            <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              {pokemon ? (
                <div className="space-y-6">
                  <div className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="h-28 w-28 rounded-[1.5rem] bg-slate-100 p-3"
                    />
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">#{pokemon.id}</p>
                      <h2 className="mt-2 text-3xl font-semibold capitalize text-slate-950">
                        {pokemon.name}
                      </h2>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">Height</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{pokemon.height}</p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                      <p className="text-sm font-medium text-slate-500">Weight</p>
                      <p className="mt-3 text-2xl font-semibold text-slate-950">{pokemon.weight}</p>
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Types</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {pokemon.types.map((typeItem) => (
                        <span
                          key={typeItem.type.name}
                          className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700"
                        >
                          {typeItem.type.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">Stats</p>
                    <div className="mt-4 space-y-3">
                      {pokemon.stats.slice(0, 3).map((statItem) => (
                        <div key={statItem.stat.name} className="flex items-center justify-between text-slate-700">
                          <span className="capitalize">{statItem.stat.name}</span>
                          <span className="font-semibold text-slate-950">{statItem.base_stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white/90 p-8 text-center text-slate-600">
                  <p className="text-lg font-semibold">Search a Pokémon to see its data.</p>
                  <p className="mt-2 text-sm text-slate-500">Type a valid name like &quot;bulbasaur&quot; or &quot;pikachu&quot;.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
