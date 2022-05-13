// import { useStateResults, useSearchState } from "react-instantsearch/hooks";
import { Fragment } from "react";
import Nav from "./components/Nav";

// function Hit({ hit }: {
//   hit: {
//     image: string;
//     name: string;
//     price: number;
//     categories: string[];
//     title: string;
//   }
// }) {
//   return <article>
//     <img src={hit.image} alt={hit.title} />
//     <p>{hit.categories[0]}</p>
//     <h1>{hit.name}</h1>
//     <p>${hit.price}</p>
//   </article>
// }


// https://github.com/learnwithjason/javascript-autocomplete/blob/main/src/main.jsx
// https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react-hooks/


function App() {

  // const searchClient = algoliasearch("NBT0N27ACR", "2b05e9374735ebf83d8190cb33bd832b");

  const { query, results, loading, setQuery } = useSearch("NBT0N27ACR", "2b05e9374735ebf83d8190cb33bd832b")

  return (
    <Fragment>
      <Nav />

      {/* <InstantSearch searchClient={searchClient} indexName="tights_posts_product" > */}
      {/* <SearchBox autoFocus={true} /> */}
      {/* <RefinementList attribute="categories" /> */}
      {/* <Hits hitComponent={Hit} /> */}
      {/* </InstantSearch> */}

      <input type="search" onChange={e => { setQuery(e.target.value) }} />
      {results.length > 0 ? (
        // <Results query={query} results={results} />
        <p>Hello</p>
      ) : (
        loading
          ? "Loading…"
          : query.length > 0 && `No results for “${query}”.`
      )}
    </Fragment>
  );
}

export default App;
