export const admin_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/admin/dashboard",
        Data: []
    },
    {
        id: 2,
        name: 'System',
        route: "/admin/system",
        Icon: "fe fe-settings",
        Data: []
    },
    {
        id: 3,
        name: 'Research Analysts',
        Icon: "fe fe-users",
        Data: [
            {
                id: 31,
                name: 'Add Subadmin',
                Icon: "fe fe-user-plus",
                route: "/admin/subadmin/add",
            },

            {
                id: 32,
                name: 'All Subadmins',
                Icon: "fe fe-users",
                route: "/admin/allsubadmin",
            },
        ]
    },
    {
        id: 4,
        name: 'Trade',
        Icon: "fe fe-shopping-cart",
        Data: [
            {
                id: 41,
                name: 'Orders',
                route: "/admin/orders",
                Icon: "fe fe-shopping-bag",
                Data: []
            },
            {
                id: 42,
                name: 'Positions',
                route: "/admin/positions",
                Icon: "fe fe-map-pin",
                Data: []
            }
        ]
    },
    {
        id: 5,
        name: 'Subadmin Details',
        route: "/admin/subadmin/company",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 6,
        name: 'Recharge Details',
        route: "/admin/payment",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 7,
        name: 'Message Broadcast',
        route: "/admin/message-broadcast",
        Icon: "fe fe-message-circle",
        Data: []
    },
    {
        id: 8,
        name: 'Help',
        route: "/admin/help",
        Icon: "fe fe-help-circle",
        Data: []
    },
    {
        id: 9,
        name: 'FAQs',
        route: "/admin/faqs",
        Icon: "fe fe-help-circle",
        Data: []
    },
    {
        id: 10,
        name: 'Wallet',
        route: "/admin/wallet",
        Icon: "fe fe-credit-card",
        Data: []
    }
];


export const subamdin_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/subadmin/dashboard",
        Data: []
    },
    {
        id: 2,
        name: 'System',
        route: "/subadmin/system",
        Icon: "fe fe-settings",
        Data: []
    },
    {
        id: 3,
        name: 'Employees',
        Icon: "fe fe-users",
        Data: [
            {
                id: 31,
                name: 'Add Employee',
                Icon: "fe fe-user-plus",
                route: "/subadmin/employee/add",
            },
            {
                id: 32,
                name: 'All Employees',
                Icon: "fe fe-users",
                route: "/subadmin/employees",
            },
        ]
    },
    {
        id: 4,
        name: 'Users',
        Icon: "fe fe-user-plus",
        Data: [
            {
                id: 41,
                name: 'Add User',
                Icon: "fe fe-user-plus",
                route: "/subadmin/User/add",
            },
            {
                id: 42,
                name: 'All Users',
                Icon: "fe fe-users",
                route: "/subadmin/users",
            },
        ]
    },
    {
        id: 5,
        name: 'Services',
        Icon: "fe fe-target",
        Data: [
            {
                id: 51,
                name: 'Group Service',
                Icon: "fe fe-list",
                route: "/subadmin/group-service",
            },

            {
                id: 52,
                name: 'Strategy',
                Icon: "fe fe-list",
                route: "/subadmin/strategys",
            },
        ]
    },
    {
        id: 6,
        name: 'Trade',
        Icon: "fe fe-shopping-cart",
        Data: [
            {
                id: 61,
                name: 'Orders',
                route: "/subadmin/orders",
                Icon: "fe fe-list",
                Data: []
            },
            {
                id: 62,
                name: 'Position',
                route: "/subadmin/position",
                Icon: "fe fe-map-pin",
                Data: []
            }
        ]
    },
    {
        id: 7,
        name: 'Recharge',
        route: "/subadmin/payment",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 8,
        name: 'Open Position',
        route: "/subadmin/open-position",
        Icon: "fe fe-grid",
        Data: []
    },
    {
        id: 9,
        name: 'Trades',
        Icon: "fe fe-layers",
        Data: [
            {
                id: 91,
                name: 'Option Chain',
                route: "/subadmin/option-chain",
                Icon: "fe fe-list",
                Data: []
            },
            {
                id: 92,
                name: 'Make Call',
                route: "/subadmin/make-call",
                Icon: "fe fe-phone",
                Data: []
            },
            {
                id: 93,
                name: 'Make Strategy',
                route: "/subadmin/make-strategy",
                Icon: "fe fe-clipboard",
                Data: []
            },
        ]
    },
    {
        id: 10,
        name: 'Message Broadcast',
        route: "/subadmin/message-broadcast",
        Icon: "fe fe-message-circle",
        Data: []
    },
    {
        id: 11,
        name: 'Help',
        route: "/subadmin/help",
        Icon: "fe fe-help-circle",
        Data: []
    }
];



export const User_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/user/dashboard",
        Data: []
    },
    {
        id: 2,
        name: 'Stock List',
        Icon: "fe fe-home",
        route: "/user/stock",
        Data: []
    },
    {
        id: 3,
        name: 'Trade',
        Icon: "fe fe-shopping-cart",
        Data: [
            {
                id: 41,
                name: 'Orders',
                route: "/user/orders",
                Icon: "fe fe-shopping-bag",
                Data: []
            },
            {
                id: 42,
                name: 'Positions',
                route: "/user/positions",
                Icon: "fe fe-map-pin",
                Data: []
            }
        ]
    },
    {
        id: 4,
        name: 'Recharge Details',
        route: "/user/payment",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 5,
        name: 'Help',
        route: "/user/help",
        Icon: "fe fe-help-circle",
        Data: []
    },
    {
        id: 6,
        name: 'Open Positions',
        route: "/user/open-positions",
        Icon: "fe fe-grid",
        Data: []
    },
    {
        id: 7,
        name: 'Broker Response',
        route: "/user/broker-response",
        Icon: "fe fe-grid",
        Data: []
    },
    {
        id: 8,
        name: 'Strategies',
        route: "/user/strategy",
        Icon: "fe fe-grid",
        Data: []
    },
    {
        id: 9,
        name: 'FAQs',
        route: "/user/faqs",
        Icon: "fe fe-help-circle",
        Data: []
    }
];


