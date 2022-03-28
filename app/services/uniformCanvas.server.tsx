import { CanvasClient } from '@uniformdev/canvas';

export const canvasClient = new CanvasClient({
  apiKey: process.env.UNIFORM_API_KEY,
  projectId: process.env.UNIFORM_PROJECT_ID,
});
