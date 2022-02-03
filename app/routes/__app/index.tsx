import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';

import { CanvasClient, enhance } from '@uniformdev/canvas';
import { Composition, Slot } from '@uniformdev/canvas-react';
import type {
  RenderComponentResolver,
  ComponentProps,
} from '@uniformdev/canvas-react';

import { enhancers } from '../../enhancers';

type HeroSlots = 'heroSlot';

type HeroType = {
  name: string;
};

export const loader: LoaderFunction = async () => {
  const canvasClient = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await canvasClient.getCompositionBySlug({
    slug: '/',
  });

  await enhance({
    composition,
    enhancers,
    context: {},
  });

  return composition;
};

function HeroComponent({ movieOfTheWeek }: ComponentProps<HeroType>) {
  return (
    <div className="container mx-auto flex flex-col xl:flex-row px-5 pt-12 md:py-24 font-serif">
      <div className="w-full md:mb-10 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4 md:mb-2 lg:mb-0 w-full">
          <video
            className="rounded-md"
            controls
            poster={
              movieOfTheWeek.fields.title === 'Action!'
                ? 'https://res.cloudinary.com/seth-hall/image/upload/v1643837423/atomic-blonde-stairwell-fight_s0uc1x.webp'
                : 'https://res.cloudinary.com/seth-hall/image/upload/c_scale,w_1935/v1643836824/great-indie-comedies_vwmrz8.jpg'
            }
          >
            <source
              src={movieOfTheWeek.fields.cloudinaryAsset[0].url}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center mt-10">
        <h1
          className={`font-sans text-8xl text-slate-50 ${
            movieOfTheWeek.fields.title === 'Action!'
              ? 'text-sky-800 font-Action leading-tight'
              : 'text-fuchsia-600 font-Comedy leading-tight'
          }`}
        >
          {movieOfTheWeek.fields.title}
        </h1>
        <h2 className="text-4xl text-slate-50 pl-14 mb-10">
          Film of the Week!
        </h2>
        <p className="mb-6 text-zinc-400">
          {movieOfTheWeek.fields.description}
        </p>
        <div className="flex justify-center">
          <button className="button--cta">License this Film</button>
          <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

const resolveRenderer: RenderComponentResolver = (component) => {
  if (component.type === 'movieOfTheWeek') {
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
