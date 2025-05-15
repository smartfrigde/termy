import { Role, type RoleNumber } from "@/types/enums/TeamRoleEnum";

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
