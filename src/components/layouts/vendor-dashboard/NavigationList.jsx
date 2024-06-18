import duotone from "components/icons/duotone";
export const navigations = [
    {
        type: "label",
        label: "Admin",
    },
    {
        name: "Dashboard",
        icon: duotone.Dashboard,
        path: "/vendor/dashboard",
    },
    {
        name: "Products",
        icon: duotone.Products,
        children: [
            {
                name: "Product List",
                path: "/admin/products",
            },
            // {
            //   name: "Create Product",
            //   path: "/admin/products/create",
            // },
            // {
            //   name: "Category",
            //   path: "/admin/categories",
            // },
            // {
            //   name: "Brand",
            //   path: "/admin/brands",
            // },
            {
                name: "Review",
                path: "/admin/product-reviews",
            },
        ],
    },
    {
        name: "Orders",
        icon: duotone.Order,
        children: [
            {
                name: "Order List",
                path: "/admin/orders",
            },
            {
                name: "Order Details",
                path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8",
            },
        ],
    },
    {
        name: "Users Account",
        icon: duotone.Customers,
        path: "/admin/users-account",
    },
    {
        name: "Warranty",
        icon: duotone.Refund,
        children: [
            {
                name: "Warranty Request",
                path: "/admin/refund-request",
            },
            {
                name: "Warranty Settings",
                path: "/admin/refund-setting",
            },
        ],
    },
    {
        name: "Sellers",
        icon: duotone.Seller,
        children: [
            {
                name: "Seller List",
                path: "/admin/sellers",
            },
            // {
            //   name: "Seller Package",
            //   path: "/admin/seller-package",
            // },
            // {
            //   name: "Package Payments",
            //   path: "/admin/package-payment",
            // },
            {
                name: "Earning History",
                path: "/admin/earning-history",
            },
            // {
            //   name: "Payouts",
            //   path: "/admin/payouts",
            // },
            // {
            //   name: "Payout Request",
            //   path: "/admin/payout-request",
            // },
        ],
    },
    {
        type: "label",
        label: "Vendor",
    },
    {
        name: "Earnings",
        icon: duotone.ProjectChart,
        children: [
            {
                name: "Earning History",
                path: "/vendor/earning-history",
            },
            {
                name: "Payments",
                path: "/vendor/payouts",
            },
            // {
            //   name: "Payout Request",
            //   path: "/vendor/payout-requests",
            // },
            // {
            //   name: "Payout Settings",
            //   path: "/vendor/payout-settings",
            // },
        ],
    },
    // {
    //   name: "Refund Request",
    //   icon: duotone.Refund,
    //   path: "/vendor/refund-request",
    // },
    // {
    //   name: "Reviews",
    //   icon: duotone.Review,
    //   path: "/vendor/reviews",
    // },
    // {
    //   name: "Shop Setting",
    //   icon: duotone.SiteSetting,
    //   path: "/vendor/shop-settings",
    // },
    {
        name: "Support Tickets",
        icon: duotone.AccountSetting,
        path: "/vendor/support-tickets",
    },
    {
        name: "Customers",
        icon: duotone.ElementHub,
        path: "/admin/customers",
    },
    {
        name: "Promotions",
        icon: duotone.ElementHub,
        path: "/admin/promotions",
    },

    // {
    //   name: "Site Setting",
    //   icon: duotone.SiteSetting,
    //   path: "/vendor/site-settings",
    // },
    // {
    //   name: "Home",
    //   icon: duotone.Session,
    //   path: "/",
    // },
];
