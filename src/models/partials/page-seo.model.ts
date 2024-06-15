export class MetaTags{
    constructor(
        public content?: string,
        public name?: string,
        public property?: string
    ){

    }
}
export class PageSeo {
    constructor(
        public title?: string,
        public description?: string,
        public metaTags?: MetaTags[]

    ) {
    }
}