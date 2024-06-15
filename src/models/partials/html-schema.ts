import { Schema } from "mongoose";
import { defaultSchemaOptions } from "./default-schema-options";
export class HTML {
  constructor(public title: string, public body: string) {}
}
export class MetaTag {
  constructor(public content: string, public property: string) {}
}
export class SEO {
  constructor(
    public title?: string,
    public description?: string,
    public metaTags?: MetaTag[]
  ) {}
}
export const HtmlSchema = new Schema<HTML>(
  {
    title: { type: Schema.Types.String, required: false },
    body: { type: Schema.Types.String, required: true },
  },
  { ...defaultSchemaOptions, _id: false, timestamps: false }
);
export const SeoSchema = new Schema<SEO>(
  {
    title: { type: Schema.Types.String, required: false },
    description: { type: Schema.Types.String, required: false },
    metaTags: [
      {
        content: { type: Schema.Types.String, required: false },
        name: { type: Schema.Types.String, required: false },
        property: { type: Schema.Types.String, required: false },
      },
    ],
  },
  { ...defaultSchemaOptions, _id: false, timestamps: false }
);
