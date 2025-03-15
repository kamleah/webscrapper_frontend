import {
    CpuSetting,
    LanguageSquare,
    LogoutCurve,
    MenuBoard,
    MessageFavorite,
    Moneys,
    ShopAdd,
    Trade,
    Truck,
    TruckFast,
    User,
} from "iconsax-react";

export const RestrictedTitlesNonSuperAdmin = ['User','Language']

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
    //     title: 'Language',
    //     icon: <LanguageSquare size="24" variant="TwoTone" />,
    //     link: '/language',
    // }
]
