export interface Action {
    type: string;
    payload: Record<string, any>;
}


export interface user {
    token?: string;
}