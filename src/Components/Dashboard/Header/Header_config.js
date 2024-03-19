export const admin_header = [

    {
        'id': 1,
        "name": 'Dashboard',
        "Icon": "LayoutDashboard",
        "route": "/admin/dashboard",
        "Data": []
    },

    {
        'id': 2,
        "name": 'System',
        "route": "/admin/system",
        "Icon": "Building2",
        "Data": []
    },
    {
        'id': 3,
        "name": 'Research Analyst',
        "route": "/admin/research_analyst",
        "Icon": "Building2",
        "Data": [
            {
                'id': 1,
                "name": 'Add Subamin',
                "route": "/admin/subadmin/add",
            },
            {
                'id': 2,
                "name": 'Edit Subadmin',
                "route": "/admin/subadmin/edit",
            },


        ]
    },

    {
        'id': 5,
        "name": 'Trade ',
        "route": "",
        "Icon": "Building2",
        "Data": [
            {
                'id': 5,
                "name": 'Orders ',
                "route": "/admin/orders ",
                "Icon": "Building2",
                "Data": []
            }, {
                'id': 6,
                "name": 'Position ',
                "route": "/admin/position",
                "Icon": "Building2",
                "Data": []
            }
        ]
    },



    {
        'id': 7,
        "name": 'Payment',
        "route": "/admin/payment",
        "Icon": "Building2",
        "Data": []
    },

    {
        'id': 8,
        "name": 'Message Broadcast',
        "route": "/admin/message_Broadcast",
        "Icon": "Building2",
        "Data": []

    },

    {
        'id': 9,
        "name": 'Help',
        "route": "/admin/help",
        "Icon": "Building2",
        "Data": []
    },


]




export const subamdin_header = [

    {
        'id': 1,
        "name": 'Dashboard',
        "Icon": "LayoutDashboard",
        "route": "/subadmin/dashboard",
        "Data": []
    },
    {
        'id': 2,
        "name": 'Employees',
        "route": "/employee/add",
        "Icon": "Building2",
        "Data": [
            {
                'id': 1,
                "name": 'Add Employee',
                "route": "/subadmin/employee/add",
            },
            {
                'id': 2,
                "name": 'All Employeers',
                "route": "/subadmin/employees",
            },
        ]
    },

    {
        'id': 3,
        "name": 'Users',
        "route": "/subadmin/user",
        "Icon": "Building2",
        "Data": [
            {
                'id': 1,
                "name": 'Add User',
                "route": "/subadmin/User/add",
            },
            {
                'id': 2,
                "name": 'All Users',
                "route": "/subadmin/users",
            },


        ]
    },
    {
        'id': 3,
        "name": 'Strategy',
        "route": "",
        "Icon": "Building2",
        "Data": [
            {
                'id': 1,
                "name": 'Add Strategy',
                "route": "/subadmin/strategy/add",
            },
            {
                'id': 2,
                "name": 'All Strategy',
                "route": "/subadmin/strategys",
            },


        ]
    },

    {
        'id': 5,
        "name": 'Trade ',
        "route": "",
        "Icon": "Building2",
        "Data": [
            {
                'id': 5,
                "name": 'Orders ',
                "route": "/subadmin/orders ",
                "Icon": "Building2",
                "Data": []
            }, {
                'id': 6,
                "name": 'Position ',
                "route": "/subadmin/position",
                "Icon": "Building2",
                "Data": []
            }
        ]
    },

    {
        'id': 6,
        "name": 'Recharge',
        "route": "/subadmin/payment",
        "Icon": "Building2",
        "Data": []
    },
    {
        'id': 7,
        "name": 'Open Position',
        "route": "/subadmin/open-position",
        "Icon": "Building2",
        "Data": []
    },
    {
        'id': 8,
        "name": 'Trades',
        "route": "/subadmin/option-chain",
        "Icon": "Building2",
        "Data": [

            {
                'id': 8,
                "name": 'Option Chain',
                "route": "/subadmin/option-chain",
                "Icon": "Building2",
                "Data": []
            },
            {
                'id': 9,
                "name": 'Make call',
                "route": "/subadmin/makecall",
                "Icon": "Building2",
                "Data": []
            },
            {
                'id': 9,
                "name": 'Make Strategy',
                "route": "/subadmin/make-strategy",
                "Icon": "Building2",
                "Data": []
            },
        ]
    },
  

    {
        'id': 10,
        "name": 'Message Broadcast',
        "route": "/subadmin/message_Broadcast",
        "Icon": "Building2",
        "Data": []

    },

    {
        'id': 11,
        "name": 'Help',
        "route": "/subadmin/help",
        "Icon": "Building2",
        "Data": []
    },


]