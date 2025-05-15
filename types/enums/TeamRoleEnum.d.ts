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

type RoleNumber = Role;
