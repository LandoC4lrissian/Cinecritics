# CineCritics - Movie Review Application

CineCritics is a modern web application built with React, TypeScript, and Vite, designed for movie enthusiasts to browse, review, and manage their watchlist of movies and TV shows.

## Features
- Browse popular movies and TV shows
- Search functionality
- Watchlist management
- User authentication with Firebase
- Responsive UI with Material-UI and TailwindCSS

## Prerequisites
- Node.js (v18 or higher)
- Docker (optional)
- Firebase project with Firestore enabled

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cinecritics.git
cd cinecritics
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Docker Setup

### 1. Build the Docker Image
```bash
docker build -t cinecritics .
```

### 2. Run the Container
```bash
docker run -d -p 3000:80 cinecritics
```

### 3. Access the Application
Open your browser and navigate to `http://localhost:3000`

## Docker Compose
Alternatively, you can use Docker Compose to manage the container:
```bash
docker-compose up
```

## Project Structure
```plaintext
cinecritics/
├── src/
│   ├── features/         # Redux slices and API logic
│   ├── pages/            # Application pages
│   ├── store/            # Redux store configuration
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Project dependencies
└── vite.config.ts        # Vite configuration
```

## Available Scripts
- `dev`: Start development server
- `build`: Build production version
- `lint`: Run ESLint
- `preview`: Preview production build

## Technologies Used
- React 19
- TypeScript
- Vite
- Redux Toolkit
- Material-UI
- TailwindCSS
- Firebase
- Docker

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeatureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeatureName`)
5. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
