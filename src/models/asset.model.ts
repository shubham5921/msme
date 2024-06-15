import mongoose, { Schema } from "mongoose";
import { BaseDoc, baseSchema } from "./partials/base-model";
import { defaultSchemaOptions } from "./partials/default-schema-options";
import { ModelName } from "../enums/model-name.enum";
import { AssetSource } from "../enums/assset.enum";
import { UtilHelper } from "../helpers/util.helper";

export class IAsset extends BaseDoc {
  constructor(
    public key: string,
    public name: string,
    public mimetype: string,
    public url: string,
    public type?: AssetSource,
    public tag?: string
  ) {
    super();
  }
}

export const AssetSchema = new Schema<IAsset>(
  {
    ...baseSchema,
    key: { type: Schema.Types.String, required: true },
    tag: { type: Schema.Types.String, required: false },
    name: { type: Schema.Types.String, required: true },
    type: {
      type: Schema.Types.String,
      enum: UtilHelper.enumsToArray(AssetSource),
      default: AssetSource.Public,
    },
    mimetype: { type: Schema.Types.String, required: true },
    url: { type: Schema.Types.String, required: true },
  },
  defaultSchemaOptions
);

export const Asset = mongoose.model<IAsset>(ModelName.Asset, AssetSchema);
