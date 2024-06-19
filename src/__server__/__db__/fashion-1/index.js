// FOLLOWING CODES ARE MOCK SERVER IMPLEMENTATION
// YOU NEED TO BUILD YOUR OWN SERVER
// IF YOU NEED HELP ABOUT SERVER SIDE IMPLEMENTATION
// CONTACT US AT support@qwikshop.com
import * as db from "./data";
const flashItems = db.products.filter(
  (item) => item.for.type === "flash-deals"
);
const trendingItems = db.products.filter(
  (item) => item.for.type === "trending-items"
);
