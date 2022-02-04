import { EnhancerBuilder } from "@uniformdev/canvas";
import {
  createContentfulEnhancer,
  ContentfulClientList,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentful";

import { createClient as ContentfulClient } from "contentful";

const contentfulClient = ContentfulClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_API_KEY,
});

const clientList = new ContentfulClientList({ client: contentfulClient });

export const enhancers = new EnhancerBuilder().parameterType(
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  createContentfulEnhancer({ client: clientList })
);
