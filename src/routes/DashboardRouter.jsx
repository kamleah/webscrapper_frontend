import {
    CpuSetting,
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

export const RestrictedTitlesNonSuperAdmin = ['User']

export const DashboardRouter = [
    {
        title: 'Scrapping',
        icon: <Trade size="24" variant="TwoTone" />,
        link: '/',
    },
    {
        title: 'History',
        icon: <CpuSetting size="24" variant="TwoTone" />,
        link: '/history',
    },
    {
        title: 'User',
        icon: <User size="24" variant="TwoTone" />,
        link: '/users',
    },
    // {
    //     title: 'User',
    //     icon: <User size="24" variant="TwoTone" />,
    //     link: '/admin-users',
    //     subMenu: [
    //         {
    //             title: 'Admin',
    //             icon: <Cup size="24" variant="TwoTone" />,
    //             link: '/admin-users',
    //         },
    //         {
    //             title: 'User',
    //             icon: <Cup size="24" variant="TwoTone" />,
    //             link: '/storages',
    //         }
    //     ]
    // },
]

