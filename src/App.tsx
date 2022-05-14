import { Hit as AlgoliaHit } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";
import {
  Breadcrumb,
  HierarchicalMenu,
  Menu,
  NumericMenu,
  Panel,
  RangeInput,
  RefinementList,
  ToggleRefinement
} from "react-instantsearch-dom";
import {
  Configure,
  DynamicWidgets,
  InstantSearch
} from "react-instantsearch-hooks";
import "./App.css";
import {
  ClearRefinements,
  CurrentRefinements,
  Highlight,
  HitsPerPage,
  PoweredBy,
  QueryRuleContext,
  QueryRuleCustomData,
  SearchBox,
  SortBy
} from "./components";
import { Hits } from "./components/Hits";
import { InfiniteHits } from "./components/InfiniteHits";
import { Pagination } from "./components/Pagination";
import { Tab, Tabs } from "./components/tabs";
type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

function App() {
  // const searchClient = algoliasearch(
  //   "NBT0N27ACR",
  //   "2b05e9374735ebf83d8190cb33bd832b"
  // );

  const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="tights_posts_product"
      routing={true}
    >
      <Configure ruleContexts={[]} />
      <div className="Container">
        <div>
          <DynamicWidgets>
            <Panel header="Brands">
              <RefinementList
                attribute="brand"
                searchable={true}
                searchablePlaceholder="Search brands"
                showMore={true}
              />
            </Panel>
            <Panel header="Cetegories">
              <Menu attribute="category" showMore={true} />
            </Panel>
            <Panel header="Hierarchy">
              <HierarchicalMenu
                showMore={true}
                attributes={[
                  "hierarchicalCategories.lvl0",
                  "hierarchicalCategories.lvl1",
                  "hierarchicalCategories.lvl2",
                ]}
              />
            </Panel>

            <Panel header="Price">
              <RangeInput attribute="price" />
            </Panel>

            <Panel header="Price range">
              <NumericMenu
                attribute="price"
                items={[
                  { label: "All" },
                  { label: "Less than $500", end: 500 },
                  { label: "Between $500 - $1000", start: 500, end: 1000 },
                  { label: "More than $1000", start: 1000 },
                ]}
              />
            </Panel>
            <Panel header="Free Shipping">
              <ToggleRefinement attribute="free_shipping" />
            </Panel>
          </DynamicWidgets>
        </div>
        <div className="search">
          <Breadcrumb
            attributes={[
              "hierarchicalCategories.lvl0",
              "hierarchicalCategories.lvl1",
              "hierarchicalCategories.lvl2",
            ]}
          />

          <div className="Search-header">
            <SearchBox placeholder="Search" />
            <SortBy
              items={[
                { label: "Relevance", value: "instant_search" },
                { label: "Price (asc)", value: "instant_search_price_asc" },
                { label: "Price (desc)", value: "instant_search_price_desc" },
              ]}
            />
            <HitsPerPage
              items={[
                { label: "20 hits per page", value: 20, default: true },
                { label: "40 hits per page", value: 40 },
              ]}
            />
          </div>
          <PoweredBy />
          <div className="CurrentRefinements">
            <ClearRefinements />
            <CurrentRefinements
              transformItems={(items) =>
                items.map((item) => {
                  const label = item.label.startsWith(
                    "hierarchicalCategories"
                  )
                    ? "Hierarchy"
                    : item.label;

                  return {
                    ...item,
                    attribute: label,
                  };
                })
              }
            />
          </div>
          <QueryRuleContext
            trackedFilters={{
              brand: () => ["Apple"],
            }}
          />


          <QueryRuleCustomData>
            {({ items }) => (
              <>
                {items.map((item) => (
                  <a href={item.link} key={item.banner}>
                    <img src={item.banner} alt={item.title} />
                  </a>
                ))}
              </>
            )}
          </QueryRuleCustomData>

          <Tabs>
            <Tab title="Hits">
              <Hits hitComponent={Hit} />
              <Pagination className="Pagination" />
            </Tab>
            <Tab title="InfiniteHits">
              <InfiniteHits showPrevious hitComponent={Hit} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </InstantSearch>
  );
}

export default App;
