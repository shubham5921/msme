export interface IPopulateOption {
    path: string;
    populate: IPopulateOption | undefined;
    select?: string;
    match?: any;
}

export interface CommonQuery {
    select?: string;
    populate?: string;
    skip?: number;
    limit?: number;
    search?: string;
}
