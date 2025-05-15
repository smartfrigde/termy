export enum Role {
    OWNER = 3,
    ADMINISTRATOR = 2,
    MEMBERS = 1,
}

export function hasGrandestRole(userRole: RoleNumber, compareTo: RoleNumber): boolean {
    return userRole >= compareTo;
}

export function getRolesAtOrBelow(role: Role): string[] {
    return Object.entries(Role)
        .filter(([_, value]) => typeof value === "number")
        .filter(([_, value]) => (value as Role) <= role)
        .map(([key]) => key);
}

export function findRole(key: string) {
    return Role[key as keyof typeof Role];
}
