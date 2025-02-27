import { baseURL } from "../constants/BaseConfig";

export const adminEndPoints = {
    paginatedFilteredBrands : `${baseURL}admin/brand-paginated-list/`,
    paginatedFilteredCategories : `${baseURL}admin/category-paginated-list/`,
    paginatedFilteredGrade : `${baseURL}admin/grade-paginated-list/`,
    paginatedFilteredLeadTime : `${baseURL}admin/lead-time-paginated-list/`,
    paginatedFilteredPackSize : `${baseURL}admin/pack-size-paginated-list/`,
    paginatedFilteredUnit : `${baseURL}admin/unit-paginated-list/`,
    paginatedFilteredProduct : `${baseURL}admin/product-paginated-list/`,
    paginatedFilteredCarousel : `${baseURL}admin/carousel-paginated-list/`,
};