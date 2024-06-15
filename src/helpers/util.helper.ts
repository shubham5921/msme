import { toLower } from "lodash";
import { IPopulateOption } from "../interface/populate-option.interface";

export class UtilHelper {
  static IV_LENGTH = 16; // For AES, this is always 16

  public static getAbsoluteImageUrl(relativeUrl: string): string {
    return `${process.env.AWS_BUCKET_IMAGE_URL}/${relativeUrl}`;
  }

 

  public static enumsToArray(enumVal: any) {
    const arr: any[] = [];
    for (const n in enumVal) {
      if (enumVal.hasOwnProperty(n)) {
        arr.push(enumVal[n]);
      }
    }
    return arr;
  }

  public static createPopulateObject = (values: string[]): IPopulateOption => {
    const populateObj: any = {
      path: values[0],
      populate: undefined,
    };

    if (values[0].split("_f=").length) {
      const [path, fields] = values[0].split("_f=");
      populateObj.path = path;

      if (fields) {
        populateObj.select = fields.split("|").join(" ");
      }
    }

    if (values[1]) {
      populateObj.populate = UtilHelper.createPopulateObject(
        values.slice(1, values.length)
      );
    }

    return populateObj;
  };

  // Example: ?populate=subject_f=_id|name|addedBy:topic,batch
  public static getPopulateObjectFromString(
    populateString: string
  ): IPopulateOption[] {
    if (!populateString) {
      return [];
    }

    const splittedString = populateString.split(",");

    return splittedString.map((item) => {
      const splittedItem = item.split(":");

      return UtilHelper.createPopulateObject(splittedItem);
    });
  }

  public static getNameMetadata(name: string): string {
    return toLower(name.replace(/\s+/g, ""));
  }
}
