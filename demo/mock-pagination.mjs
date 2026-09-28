const pages = [
  { nodes: [{ id: "gid://shopify/Product/1", title: "Demo A" }], pageInfo: { hasNextPage: true, endCursor: "CURSOR-1" } },
  { nodes: [{ id: "gid://shopify/Product/2", title: "Demo B" }], pageInfo: { hasNextPage: false, endCursor: null } }
];

async function fetchPage(after) {
  if (!after) return pages[0];
  if (after === "CURSOR-1") return pages[1];
  throw new Error("Unknown cursor");
}

async function collectAllProducts() {
  const products = [];
  let cursor = null;
  while (true) {
    const page = await fetchPage(cursor);
    products.push(...page.nodes);
    if (!page.pageInfo.hasNextPage) return products;
    cursor = page.pageInfo.endCursor;
  }
}

const products = await collectAllProducts();
if (products.length !== 2) throw new Error("Pagination did not collect all products");
console.log("PASS: cursor pagination collected", products.length, "products");
console.log(products);
