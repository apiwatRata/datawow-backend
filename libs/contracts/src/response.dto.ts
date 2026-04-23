import { UserDto } from "./users/user.dto";

export class ResponseDto{
    status: string;
    status_code: number;
    message: string;
    data?: UserDto[];
    meta?: {
        cache_hit: boolean;
        generated_at: Date;
        total_count: number;
    };
    page?: number;
    page_size?: number;
    total_pages?: number;
}
