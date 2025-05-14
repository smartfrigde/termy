export type TeamPageData = {
    total_pages: number;
    current_page: number;
    total_members: number;
    team_id: number;
};

export type MembersResponse = {
    team_id: number;
    permission_level_id: number;
    id: number;
    name: string;
    surname: string;
    email: string;
    profile_image: string | null;
};
