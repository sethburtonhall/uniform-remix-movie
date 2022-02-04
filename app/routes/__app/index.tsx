import { useEffect } from "react";
import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import Cookies from "universal-cookie";
import { CanvasClient, enhance } from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import type {
  RenderComponentResolver,
  ComponentProps,
} from "@uniformdev/canvas-react";

import { enhancers } from "../../enhancers";

type HeroSlots = "heroSlot";

type HeroType = {
  name: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await canvasClient.getCompositionBySlug({
    slug: "/",
  });

  await enhance({
    composition,
    enhancers,
    context: {},
  });

  const url = new URL(request.url);
  const genreId = url.searchParams.get("utm_campaign");

  return { ...composition, genreId };
};

function HeroComponent({ personalizedHero }: ComponentProps<HeroType>) {
  const cookies = new Cookies();
  const { genreId } = useLoaderData();

  useEffect(() => {
    cookies.set("genreId", `${genreId}`, { path: "/" });
  }, []);

  return (
    <div className="container mx-auto flex flex-col px-5 pt-12 font-serif md:py-24 xl:flex-row">
      <div className="w-full md:mb-10 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4 w-full md:mb-2 lg:mb-0">
          <video
            className="rounded-md"
            controls
            poster={
              personalizedHero.fields.title === "Action!"
                ? "https://res.cloudinary.com/seth-hall/image/upload/v1643837423/atomic-blonde-stairwell-fight_s0uc1x.webp"
                : "https://res.cloudinary.com/seth-hall/image/upload/c_scale,w_1935/v1643836824/great-indie-comedies_vwmrz8.jpg"
            }
          >
            <source
              src={personalizedHero.fields.cloudinaryAsset[0].url}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24">
        <h1
          className={`font-sans text-8xl text-slate-50 ${
            personalizedHero.fields.title === "Action!"
              ? "-rotate-2 font-Action leading-tight text-yellow-500"
              : "font-Comedy leading-tight text-fuchsia-500"
          }`}
        >
          {personalizedHero.fields.title}
        </h1>
        <h2 className="mb-10 pl-14 text-4xl text-slate-50">
          {personalizedHero.fields.title === "Action!"
            ? "Film of the Week!"
            : "of the Week!"}
        </h2>
        <p className="mb-6 text-zinc-400">
          {personalizedHero.fields.description}
        </p>
        <div className="flex justify-center">
          <button className="button--cta">License this Film</button>
          <button className="ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

const resolveRenderer: RenderComponentResolver = (component) => {
  if (component.type === "personalizedHero") {
    return HeroComponent;
  }
  return null;
};

export default function Index() {
  const composition = useLoaderData();

  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
      <Slot<HeroSlots> name="heroSlot"></Slot>
    </Composition>
  );
}
