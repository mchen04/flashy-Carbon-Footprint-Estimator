# Carbon Footprint Estimator

A modern, interactive web application that estimates your carbon footprint based on your daily activities. This project uses React, TypeScript, and OpenAI's API to provide accurate carbon footprint estimations and personalized suggestions for reducing your environmental impact.

![Carbon Footprint Estimator](https://via.placeholder.com/800x400?text=Carbon+Footprint+Estimator)

## Features

- 🌍 **Instant Carbon Footprint Analysis**: Describe your activities in natural language and get immediate feedback
- 📊 **Detailed Breakdown**: View your emissions by category (transport, diet, energy, waste)
- 💡 **Personalized Suggestions**: Receive tailored recommendations to reduce your carbon footprint
- 🎨 **Theme Options**: Choose between "Cyberpunk" and "Nature" visual themes
- ✨ **Engaging Animations**: Enjoy a modern, interactive user experience

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Animation**: Framer Motion, GSAP
- **Visualization**: D3.js, Recharts
- **AI**: OpenAI API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carbon-footprint-estimator.git
   cd carbon-footprint-estimator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a description of your daily activities in the input field
2. Click "Analyze" to get your carbon footprint estimation
3. Review the detailed breakdown and suggestions
4. Toggle between themes using the theme switcher in the top-right corner

## Project Structure

```
carbon-footprint-estimator/
├── src/
│   ├── components/       # React components
│   ├── utils/            # Utility functions including OpenAI integration
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── ...                   # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created as part of a hackathon
- Thanks to OpenAI for providing the API that powers the carbon footprint analysis