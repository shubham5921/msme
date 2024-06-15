export class PaginatedModel<T> {
    constructor(
        public list: T,
        public total: number,
        public page:number
    ) {
    }
}
