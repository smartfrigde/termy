export type TeamType = {
    name: string;
    id: number;
    type: string;
    revoked: boolean;
    join_code: string;
    created_at: Date;
    updated_at: Date;
    permission_in_team: number;
};
