export const admin_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/admin/dashboard",
        Data: []
    },
    {
        id: 3,
        name: 'Sub Admin',
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
        name: 'Researcher',
        Icon: "fe fe-users",
        Data: [
            {
                id: 41,
                name: 'Add Researcher',
                Icon: "fe fe-user-plus",
                route: "/admin/research/add",
            },
            {
                id: 42,
                name: 'All Researcher',
                Icon: "fe fe-user-plus",
                route: "/admin/allresearch",
            }, 
        ]
    },
    // {
    //     id: 4,
    //     name: 'Trade',
    //     Icon: "fe fe-shopping-cart",
    //     Data: [
    //         {
    //             id: 41,
    //             name: 'Orders',
    //             route: "/admin/orders",
    //             Icon: "fe fe-shopping-bag",
    //             Data: []
    //         },
    //         {
    //             id: 42,
    //             name: 'Positions',
    //             route: "/admin/positions",
    //             Icon: "fe fe-map-pin",
    //             Data: []
    //         }
    //     ]
    // },
    {
        id: 5,
        name: 'Subadmin Details',
        route: "/admin/subadmin/company",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 6,
        name: 'Payment History',
        route: "/admin/payment",
        Icon: "fa-solid fa-clock-rotate-left",
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
                Icon: "fa-solid fa-gears",
                route: "/subadmin/group-service",
            },

            {
                id: 52,
                name: 'Strategy',
                Icon: "fa-solid fa-signal",
                route: "/subadmin/strategys",
            },
           
            {
                'id': 53,
                name: 'All Services',
                Icon: "fe fe-list",
                route: "/subadmin/servicesAll",

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
                id: 63,
                name: 'Client Orders',
                route: "/subadmin/client/orders",
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
        name: 'Strategy History',
        route: "/subadmin/strategys/history",
        Icon: "fa-solid fa-clock-rotate-left",
        Data: []
    },
    {
        id: 17,
        name: 'Strategy Transaction',
        route: "/subadmin/strategys/transaction",
        Icon: "fe fe-credit-card",
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
            {
                id: 94,
                name: 'Open Position',
                route: "/subadmin/open-position",
                Icon: "fe fe-grid",
                Data: []
            },
        ]
    },
    
    {
        id: 12,
        name: 'Researcher Strategy',
        route: "/subadmin/researcher-strategy",
        Icon: "fe fe-target",
        Data: []
    },
    
    {
        id: 25,
        name: 'More',
        Icon: "fe fe-target",
        Data: [
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
            },
            {
                id: 13,
                name: 'FAQs',
                route: "/subadmin/faqs",
                Icon: "fe fe-help-circle",
                Data: []
            },
           
        ]
    },
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
    // {
    //     id: 2,
    //     name: 'Stock List 1',
    //     Icon: "fa-solid fa-arrow-trend-up",
    //     route: "/user/stock1",
    //     Data: []
    // },
    {
        id: 3,
        name: 'Trade',
        Icon: "fa-solid fa-signal",
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
        name: 'Subscription ',
        route: "/user/subscription",
        Icon: "fe fe-credit-card",
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
        id: 5,
        name: 'Help',
        route: "/user/help",
        Icon: "fe fe-help-circle",
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


export const employee_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/employee/dashboard",
        Data: []
    },

    {
        id: 4,
        name: 'Users',
        Icon: "fe fe-user",
        Data: [
            {
                id: 41,
                name: 'Add User',
                Icon: "fe fe-user-plus",
                route: "/employee/User/add",
            },
            {
                id: 42,
                name: 'All Users',
                Icon: "fe fe-users",
                route: "/employee/users",
            },
        ]
    },
    {
        id: 61,
        name: 'Signal',
        route: "/employee/orders",
        Icon: "fe fe-list",
        Data: []
    },
    {
        id: 62,
        name: 'Trade History',
        route: "/employee/position",
        Icon: "fe fe-map-pin",
        Data: []
    },
  
 
    {
        id: 10,
        name: 'Message Broadcast',
        route: "/employee/message-broadcast",
        Icon: "fe fe-message-circle",
        Data: []
    },
    {
        id: 11,
        name: 'Help',
        route: "/employee/help",
        Icon: "fe fe-help-circle",
        Data: []
    },
    {
        id: 9,
        name: 'FAQs',
        route: "/employee/faqs",
        Icon: "fe fe-help-circle",
        Data: []
    }
];



export const superadmin_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/superadmin/dashboard",
        Data: []
    },

    {
        id: 18,
        name: 'Panel',
        route: "/superadmin/panel",
        Icon: "fe fe-message-circle",
        Data: []
    },
 

    {
        id: 9,
        name: 'FAQs',
        route: "/superadmin/faqs",
        Icon: "fe fe-help-circle",
        Data: []
    },{
        id: 9,
        name: 'History',
        route: "/superadmin/history",
        Icon: "fe fe-help-circle",
        Data: []

    }
];




export const research_header = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: "fe fe-home",
        route: "/research/dashboard",
        Data: []
    },

  
    {
        id: 5,
        name: 'Services',
        Icon: "fe fe-target",
        Data: [
          
            {
                id: 52,
                name: 'Strategy',
                Icon: "fa-solid fa-signal",
                route: "/research/strategys",
            },
           
            {
                'id': 53,
                name: 'All Services',
                Icon: "fe fe-list",
                route: "/research/servicesAll",

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
                route: "/research/orders",
                Icon: "fe fe-list",
                Data: []
            },
            {
                id: 62,
                name: 'Position',
                route: "/research/position",
                Icon: "fe fe-map-pin",
                Data: []
            }
        ]
    },
    {
        id: 7,
        name: 'Strategy History',
        route: "/research/strategys/history",
        Icon: "fe fe-credit-card",
        Data: []
    },
    {
        id: 17,
        name: 'Strategy Transaction',
        route: "/research/strategys/transaction",
        Icon: "fe fe-credit-card",
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
                route: "/research/option-chain",
                Icon: "fe fe-list",
                Data: []
            },
            {
                id: 92,
                name: 'Make Call',
                route: "/research/make-call",
                Icon: "fe fe-phone",
                Data: []
            },
            {
                id: 93,
                name: 'Make Strategy',
                route: "/research/make-strategy",
                Icon: "fe fe-clipboard",
                Data: []
            },
            {
                id: 94,
                name: 'Open Position',
                route: "/research/open-position",
                Icon: "fe fe-grid",
                Data: []
            },
        ]
    },
    {
        id: 10,
        name: 'Message Broadcast',
        route: "/research/message-broadcast",
        Icon: "fe fe-message-circle",
        Data: []
    },
    {
        id: 11,
        name: 'Help',
        route: "/research/help",
        Icon: "fe fe-help-circle",
        Data: []
    },
    {
        id: 9,
        name: 'FAQs',
        route: "/research/faqs",
        Icon: "fe fe-help-circle",
        Data: []
    }
];
