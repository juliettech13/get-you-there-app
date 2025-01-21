# Global Immigration Assistant

A modern web application that helps users assess their eligibility for immigration to different countries based on their personal profile, qualifications, and preferences. It leverages an AI agent to provide personalized recommendations and insights.

## Features

- 📋 Interactive multi-step questionnaire
- 🔍 Comprehensive eligibility assessment
- 📱 Fully responsive design
- ✨ Real-time form validation
- 🌍 Multi-country analysis
- 📊 Detailed results visualization

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form with Zod validation
- **UI Components**: Shadcn UI
- **Testing**: Jest & React Testing Library

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/juliettech13/gyt.git
cd gyt
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. The default environment is set to `development`, unless a `NODE_ENV` vairable says otherwise in the `.env` file. We're using the `localhost:8000` API for development based on our local AI agent port. However, this may be different for you if you're using a different port for your back-end.

Create a `.env` file in the root directory and add your environment variables:
```bash
NEXT_DEV_API_URL=localhost:8000
NEXT_PROD_API_URL=your_api_url_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── data/          # Static data and configurations
│   ├── pages/         # Page components
│   ├── services/      # API services and business logic
│   └── strings/       # Text content and translations
├── lib/               # Utility functions and helpers
└── styles/           # Global styles and Tailwind configuration
```

## Development

- The application follows a component-based architecture
- Uses React Server Components where possible for optimal performance
- Implements form validation using Zod schemas
- Follows accessibility best practices
- Includes comprehensive test coverage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
