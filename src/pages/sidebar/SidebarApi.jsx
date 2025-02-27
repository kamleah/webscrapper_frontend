import {
    Cup,
    Element4,
    ElementPlus,
    Game,
    I3Dcube,
    MenuBoard,
    MessageFavorite,
    Moneys,
    ShopAdd,
    Trade,
    Truck,
    TruckFast,
    User,
} from "iconsax-react";

export const RestrictedTitlesNonSuperAdmin = ['User', 'Sports']

export const SidebarAdminApi = [
    {
        title: 'Dashboard',
        icon: <Element4 size="24" variant="TwoTone" />,
        link: '/',
    },
    {
        title: 'Products',
        icon: <Trade size="24" variant="TwoTone" />,
        link: '/products',
        subMenu: [
            {
                title: 'All Products',
                icon: <Cup size="24" variant="TwoTone" />,
                link: '/products',
            },
            {
                title: 'Cancelation',
                icon: <Cup size="24" variant="TwoTone" />,
                link: '/storage-availability',
            }
        ]
    },
    {
        title: 'Venue',
        icon: <ShopAdd size="24" variant="TwoTone" />,
        link: '/venue',
    },
    {
        title: 'Payment',
        icon: <TruckFast size="24" variant="TwoTone" />,
        link: '/adminStoreDashboard',
        subMenu: [
            {
                title: 'All Transactions',
                icon: <Trade size="24" variant="TwoTone" />,
                link: '/adminStoreDashboard',
            },
            {
                title: 'Refund',
                icon: <Truck size="24" variant="TwoTone" />,
                link: '/adminStoreMoveOrders',
            },
            {
                title: 'Generate Report',
                icon: <Moneys size="24" variant="TwoTone" />,
                link: '/adminStoreMovePrice',
            },
        ]
    },
    {
        title: 'Reports',
        icon: <TruckFast size="24" variant="TwoTone" />,
        link: '/DashboardAssets',
        subMenu: [
            {
                title: 'User',
                icon: <Trade size="24" variant="TwoTone" />,
                link: '/DashboardAssets',
            },
            {
                title: 'Payment',
                icon: <Truck size="24" variant="TwoTone" />,
                link: '/adminStoreMoveOrders',
            },
            {
                title: 'Export',
                icon: <Moneys size="24" variant="TwoTone" />,
                link: '/adminStoreMovePrice',
            },
        ]
    },
    {
        title: 'Sports',
        icon: <Game size="24" variant="TwoTone" />,
        link: '/sports',
    },
    {
        title: 'Notification',
        icon: <ElementPlus size="24" variant="TwoTone" />,
        link: '/DashboardAssets',
    },
    {
        title: 'User',
        icon: <User size="24" variant="TwoTone" />,
        link: '/admin-users',
        subMenu: [
            {
                title: 'Admin',
                icon: <Cup size="24" variant="TwoTone" />,
                link: '/admin-users',
            },
            {
                title: 'User',
                icon: <Cup size="24" variant="TwoTone" />,
                link: '/storages',
            }
        ]
    },
]

export const SidebarFlexiStoreApi = [
    {
        title: 'Dashboard',
        icon: <Element4 size={24} variant="TwoTone" />,
        link: '/flexiDashboard',
    },
    {
        title: 'My Orders',
        icon: <Truck size="24" variant="TwoTone" />,
        link: '/flexiStoreOrders',
    },
    {
        title: 'Products',
        icon: <Trade size="24" variant="TwoTone" />,
        link: '/flexiProduct',
    },
]

export const SidebarStoreMoveApi = [
    {
        title: 'Dashboard',
        icon: <Element4 size={24} variant="TwoTone" />,
        link: '/storeMoveDashboard',
    },
    {
        title: 'My Orders',
        icon: <Truck size="24" variant="TwoTone" />,
        link: '/storeMoveOrders',
    },
    {
        title: 'Products',
        icon: <Trade size="24" variant="TwoTone" />,
        link: '/storeMoveProduct',
    },
    {
        title: 'Pricing',
        icon: <Moneys size="24" variant="TwoTone" />,
        link: '/storeMovePrice',
    },
    {
        title: 'Customized',
        icon: <I3Dcube size="24" variant="TwoTone" />,
        link: '/storeMoveCustomized',
    },
]

