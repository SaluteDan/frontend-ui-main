# ATTR. Frontend Application

ATTR. is a Next.js-based web application for minting and managing NFT editions. This README provides an overview of the frontend structure and key components.

## Table of Contents
1. Getting Started
2. Project Structure
3. Key Features
4. Components
5. Styling
6. State Management
7. Environment Configuration

## Getting Started
To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
The project follows a typical Next.js structure with additional organization for components and features:
- `src/`: Main source directory
- `app/`: Next.js app directory
- `components/`: Reusable React components
- `lib/`: Utility functions and helpers
- `styles/`: Global styles and Tailwind CSS configuration

## Key Features
- NFT Minting
- Collection Viewing
- User Enrollment
- Responsive Design
- Interactive UI Components

## Storybook Integration
The project includes Storybook for component development and documentation:

```bash
npm run storybook
```

## Environment Configuration
Environment variables are managed in `.env.local`. Ensure these are set up correctly for your development environment.