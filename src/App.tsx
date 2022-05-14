import { Hit as AlgoliaHit } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  DynamicWidgets,
  InstantSearch
} from "react-instantsearch-hooks";
import "./App.css";
import {
  CurrentRefinements,
  HierarchicalMenu, Highlight, HitsPerPage,
  Menu,
  NumericMenu,
  Panel, QueryRuleContext, RangeInput,
  RefinementList,
  SearchBox,
  SortBy,
  ToggleRefinement
} from "./components";
import { Hits } from "./components/Hits";
import { Pagination } from "./components/Pagination";

type HitProps = {
  hit: AlgoliaHit<{
    post_title: string;
    post_price: string;
    images: {
      thumbnail: {
        url: string;
        height: number;
        width: number;
      };
      woocommerce_250: {
        url: string;
        height: number;
        width: number;
      }
    }

    post_modified: number;
  }>;
};

function Hit({ hit }: HitProps) {

  console.log(hit);


  return (
    <section>
      <img src={hit.images.woocommerce_250.url} alt={hit.post_title} className="w-full" />
      <Highlight hit={hit} attribute="post_title" className="Hit-label" />
      <span className="Hit-price" dangerouslySetInnerHTML={{ __html: hit.post_price }}></span>
      <div className="Hit-price">last modified at  <span className="italic">{new Intl.DateTimeFormat('en-US').format(new Date(hit.post_modified * 1000))} </span>
      </div>
    </section>
  );
}

function App() {
  const searchClient = algoliasearch(
    "NBT0N27ACR",
    "2b05e9374735ebf83d8190cb33bd832b"
  );
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="tights_posts_product"
      routing={true}
    >
      <Configure ruleContexts={[]} />
      <div>
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
          {/* <Breadcrumb
            attributes={[
              "hierarchicalCategories.lvl0",
              "hierarchicalCategories.lvl1",
              "hierarchicalCategories.lvl2",
            ]}
          /> */}

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
          {/* <PoweredBy /> */}
          <div className="CurrentRefinements">
            {/* <ClearRefinements /> */}
            <CurrentRefinements
              transformItems={(items) =>
                items.map((item) => {
                  const label = item.label.startsWith("hierarchicalCategories")
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

          {/* <QueryRuleCustomData>
            {({ items }) => (
              <>
                {items.map((item) => (
                  <a href={item.link} key={item.banner}>
                    <img src={item.banner} alt={item.title} />
                  </a>
                ))}
              </>
            )}
          </QueryRuleCustomData> */}

          <Hits hitComponent={Hit} />
          <Pagination className="Pagination" />

          {/* <Tabs>
            <Tab title="Hits">

            </Tab>
            <Tab title="InfiniteHits">
              <InfiniteHits showPrevious hitComponent={Hit} />
            </Tab>
          </Tabs> */}
        </div>
      </div>
    </InstantSearch>
  );
}

export default App;
