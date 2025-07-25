export interface User {
    id: number;
    username: string;
    status: number;
    token: IUserToken;
}

export interface IUserToken {
    id: number;
    user_id: number;
    created_at: number;
    updated_at: number | null;
    last_used_at: number;
    expires: number;
    user_agent: number | null;
    token: string;
}