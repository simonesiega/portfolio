declare module "*.mdx" {
  import type {ComponentType} from "react";

  export const keyPhrase: string;
  export const galleryCaptions: string[];
  export const galleryThumbnailDescriptions: string[] | undefined;

  const MDXContent: ComponentType;
  export default MDXContent;
}
