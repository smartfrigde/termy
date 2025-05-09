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

export function getRolesAtOrBelow(role: Role): Role[] {
    return Object.values(Role)
        .filter((r): r is Role => typeof r === 'number')
        .filter((r) => r <= role);
}