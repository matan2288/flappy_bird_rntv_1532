export interface UserProps {
    userId?: string;
    username?: string;
}

export interface UserState {
    isLoading: boolean;
    error: string | null;
}
