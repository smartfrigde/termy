export enum Role {
    OWNER = 3,
    ADMINISTRATOR = 2,
    MEMBERS = 1,
}

const hierarchy: { [key: number]: Role } = {
    1: Role.OWNER,
    2: Role.ADMINISTRATOR,
    3: Role.MEMBERS,
};

export function hasGrandestRole(userRole: RoleNumber, compareTo: RoleNumber): boolean {
    return userRole >= compareTo;
}

export function getRolesAtOrBelow(role: Role): string[] {
    return Object.entries(Role)
        .filter(([_, value]) => typeof value === 'number')
        .filter(([_, value]) => (value as Role) <= role)
        .map(([key]) => key);
}


export function findRole(key: string){
    return Role[key];
}