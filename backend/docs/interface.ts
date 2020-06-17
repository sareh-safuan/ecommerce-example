export interface User {
    id?: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    hash: string,
    avatar: string,
    usergroupId: number,
    createdAt?: string,
    updatedAt?: string
}

export interface Address {
    id?: number,
    userId: number,
    addressOne: string,
    addressTwo: string,
    city: string,
    postcode: string,
    state: string,
    countryId: number,
    createdAt?: string,
    updatedAt?: string
}

export interface Product {
    id?: number,
    productName: string,
    slug: string,
    categoryId: number,
    description: string,
    images: string,
    price: number,
    createdAt?: string,
    updatedAt?: string
}

export interface ProductVariation {
    id?: number,
    productId: number,
    variationDescription: string,
    price: number,
    quantity: number,
    createdAt?: string,
    updatedAt?: string
}

export interface Order {
    id?: number,
    userId: number,
    totalPricePaid: number,
    createdAt?: string,
    updatedAt?: string
}

export interface OrderDetail {
    id?: number,
    orderId: number,
    productId: number,
    quantity: number,
    productVariationId: number,
    statusId: number,
    createdAt?: string,
    updatedAt?: string
}