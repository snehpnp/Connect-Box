 const  admin_header = [
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
        "name": 'Clients',
        "Icon": "Users",
        "Data": [
            {
                'id': 1,
                "name": 'Add Client',
                "route": "/admin/client/add",
            },
            {
                'id': 2,
                "name": 'Clients',
                "route": "/admin/allclients",
            },
         
            {
                'id': 4,
                "name": 'Expired-Clients',
                "route": "/admin/expiredclients",
            },
        ]
    },

    {
        'id': 4,
        "name": 'Sub Admin',
        "Icon": "Users",
        "Data": [
            {
                'id': 1,
                "name": 'All Sub Admins',
                "route": "/admin/allsubadmins",
            },
            {
                'id': 2,
                "name": 'In-Active Clients',
                "route": "/admin/subadminclients",
            },
        ]
    },


   
]

export default admin_header