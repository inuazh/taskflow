export type User = {
    id: number,
    image?: string,
    firstName: string,
    lastName: string,
}

export type UsersResponse = {
    users: User[],
    total: number,
    skip: number,
    limit: number
}