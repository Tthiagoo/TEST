# React TypeScript Project

A modern React TypeScript project following best practices and SOLID principles.

## Project Structure

```
src/
├── core/           # Core application code
│   ├── config/     # Configuration files
│   ├── hooks/      # Custom hooks
│   └── utils/      # Utility functions
├── features/       # Feature-based modules
│   └── auth/       # Example feature
│       ├── api/    # API calls
│       ├── components/ # Feature-specific components
│       ├── hooks/  # Feature-specific hooks
│       ├── store/  # State management
│       └── types/  # TypeScript types
├── shared/         # Shared components and utilities
│   ├── components/ # Reusable components
│   ├── styles/     # Global styles
│   └── types/      # Shared types
└── app/            # Application entry point
    ├── providers/  # Context providers
    ├── routes/     # Route definitions
    └── layouts/    # Layout components
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier 