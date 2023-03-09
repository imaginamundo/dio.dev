import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    publishedAt: z.object({
      iso: z.date(),
      formated: z.string()
    }),
    updatedAt: z.object({
      iso: z.date(),
      formated: z.string(),
      reason: z.string()
    }).optional()
  }),
});

export const collections = {
  'blog': blogCollection,
};
