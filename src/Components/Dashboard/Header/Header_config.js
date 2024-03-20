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
        name: 'Research Analyst',
        route: "",
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
                name: 'Edit Subadmin',
                Icon: "fe fe-edit",
                route: "/admin/subadmin/edit",
            },
        ]
    },
    {
        id: 4,
        name: 'Trade',
        route: "",
        Icon: "fe fe-shopping-cart",
        Data: [
            {
                id: 41,
                name: 'Orders',
                route: "/admin/orders",
                Icon: "fe fe-list",
                Data: []
            },
            {
                id: 42,
                name: 'Position',
                route: "/admin/position",
                Icon: "fe fe-map-pin",
                Data: []
            }
        ]
    },
    {
        id: 5,
        name: 'Payment',
        route: "/admin/payment",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 6,
        name: 'Message Broadcast',
        route: "/admin/message-broadcast",
        Icon: "fe fe-message-circle",
        Data: []
    },
    {
        id: 7,
        name: 'Help',
        route: "/admin/help",
        Icon: "fe fe-help-circle",
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
        route: "/employee/add",
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
        route: "/subadmin/user",
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
        name: 'Strategy',
        route: "/subadmin/strategy",
        Icon: "fe fe-target",
        Data: [
            {
                id: 51,
                name: 'Add Strategy',
                Icon: "fe fe-plus",
                route: "/subadmin/strategy/add",
            },
            {
                id: 52,
                name: 'All Strategy',
                Icon: "fe fe-list",
                route: "/subadmin/strategys",
            },
        ]
    },
    {
        id: 6,
        name: 'Trade',
        route: "/subadmin/trade",
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
        route: "/subadmin/trades",
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



