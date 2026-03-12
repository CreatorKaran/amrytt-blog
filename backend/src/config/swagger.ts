import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API Documentation',
      version: '1.0.0',
      description: 'A comprehensive Blog API with posts, comments, and ratings',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:5100',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Blogs', description: 'Blog post management' },
      { name: 'Comments', description: 'Comment management' },
      { name: 'Ratings', description: 'Rating and review management' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
