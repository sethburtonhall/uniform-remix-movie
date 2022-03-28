import { useEffect } from 'react';
import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import Cookies from 'universal-cookie';
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  CanvasClientError,
  enhance,
} from '@uniformdev/canvas';
import { Composition, Slot } from '@uniformdev/canvas-react';
import type {
  RenderComponentResolver,
  ComponentProps,
} from '@uniformdev/canvas-react';

import { canvasClient } from '~/services/uniformCanvas.server';
import { enhancers } from '../../enhancers';

type HeroSlots = 'heroSlot';

type HeroType = {
  fields: {
    title: string;
    description: string;
    cloudinaryAsset: [{ url: string }];
  };
};

type CatchallData = {
  composition: RootComponentInstance;
  genreId: string | null;
  preview: boolean;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<CatchallData> => {
  const slug = params['*'];
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const preview = false;

  try {
    const { composition } = await canvasClient.getCompositionBySlug({
      slug: slugString ? `/${slugString}` : '/',
      state:
        process.env.NODE_ENV === 'development' || preview
          ? CANVAS_DRAFT_STATE
          : CANVAS_PUBLISHED_STATE,
    });

    await enhance({
      composition,
      enhancers,
      context: {},
    });

    const url = new URL(request.url);
    const genreId = url.searchParams.get('utm_campaign');

    return {
      composition,
      genreId,
      preview: Boolean(preview),
    };
  } catch (e) {
    if (e instanceof CanvasClientError && e.statusCode === 404) {
      throw new Response('Composition not found', { status: 404 });
    }

    throw e;
  }
};

function Hero({ personalizedHero }: { personalizedHero: HeroType }) {
  const cookies = new Cookies();
  const { genreId } = useLoaderData();

  useEffect(() => {
    cookies.set('genreId', `${genreId}`, { path: '/' });
  }, []);

  return (
    <div className="container mx-auto flex flex-col px-5 pt-12 font-serif md:py-24 xl:flex-row">
      <div className="w-full md:mb-10 lg:mb-0">
        <div className="aspect-w-16 aspect-h-9 mb-4 w-full md:mb-2 lg:mb-0">
          <video
            className="rounded-md"
            controls
            poster={
              personalizedHero.fields.title === 'Action!'
                ? 'https://res.cloudinary.com/seth-hall/image/upload/v1643837423/Uniform/Uniform%20Movie/atomic-blonde-stairwell-fight_s0uc1x.webp'
                : 'https://res.cloudinary.com/seth-hall/image/upload/v1643836824/Uniform/Uniform%20Movie/great-indie-comedies_vwmrz8.jpg'
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
            personalizedHero.fields.title === 'Action!'
              ? '-rotate-2 font-Action leading-tight text-yellow-500'
              : 'font-Comedy leading-tight text-fuchsia-500'
          }`}
        >
          {personalizedHero.fields.title}
        </h1>
        <h2 className="mb-10 pl-14 text-4xl text-slate-50">
          {personalizedHero.fields.title === 'Action!'
            ? 'Film of the Week!'
            : 'of the Week!'}
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

function FeaturedArticles({ featuredArticle }) {
  const { title, description, featuredImage } = featuredArticle.fields;

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  return (
    <div className="rounded-md bg-white">
      <img
        src={featuredImage[0].url}
        alt="Featured Image"
        className="h-80 w-full rounded-md object-cover"
      />
      <div className="py-6 px-12">
        <h1 className="mb-4 text-center text-2xl">{title}</h1>
        <p>{truncateString(description.content[0].content[0].value, 100)}</p>
      </div>
    </div>
  );
}

const resolveRenderer: RenderComponentResolver = (component) => {
  if (component.type === 'personalizedHero') {
    return Hero;
  }

  if (component.type === 'featuredArticle') {
    return FeaturedArticles;
  }
  return null;
};

export default function Index() {
  const { composition } = useLoaderData<CatchallData>();

  return (
    <Composition data={composition} resolveRenderer={resolveRenderer}>
      <Slot<HeroSlots> name="heroSlot"></Slot>
      <div className="container mx-auto">
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 mb-4 flex-shrink text-6xl text-slate-100">
            Featured Articles
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <Slot name="featuredArticlesGroupSlot"></Slot>
        </div>
      </div>
    </Composition>
  );
}
