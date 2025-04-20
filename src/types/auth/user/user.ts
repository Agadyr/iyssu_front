export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    email_verified_at: Date | string;
    city: string;
    bonus_points: number;
    bonus_histories: BonusHistories[];
    created_at: string;
    updated_at: string;
}

export interface BonusHistories {
    user_id: number;
    operation_type: string;
    amount: number;
    description: string;
    created_at: string;
}