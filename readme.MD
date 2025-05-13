# JD Assistant

A Next.js application to generate technical interview questions based on job descriptions and evaluate candidates' answers.

## Features

- Upload job descriptions via text input or PDF file
- Generate technical interview questions using Google's Generative AI (Gemini)
- Support for multiple languages (Vietnamese, English, Chinese)
- Interactive code editor with syntax highlighting for various programming languages
- Evaluation of candidates' answers with detailed feedback

## Technologies Used

- Next.js 14 with App Router for the frontend and API routes
- TypeScript for type safety
- React for UI components
- Google Generative AI (Gemini) for question generation and answer evaluation
- Ace Editor for the code editor with syntax highlighting
- Choices.js for enhanced dropdowns
- Bootstrap for styling
- PDF Parse for extracting text from PDF files

## Prerequisites

Before running this application, you need:

1. Node.js (v18.x or higher)
2. A Google API key with access to the Generative AI API (Gemini)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd jd-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
jd-assistant/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   └── jd/         # Job description related APIs
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page
│   ├── components/         # React components
│   ├── lib/                # Utility functions
│   │   ├── api.ts         # API client functions
│   │   └── editorConfig.ts # Ace Editor configuration
│   └── styles/             # Global styles
│       └── globals.css     # Global CSS
├── public/                 # Static files
├── .env.local             # Environment variables (create this)
├── .gitignore             # Git ignore file
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration
```

## Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Environment Variables

- `GOOGLE_API_KEY`: Your Google API key for Generative AI services

## Usage

1. Enter a job description in the text area or upload a PDF file containing the job description
2. Select the desired language for the interview question
3. Click "Cho tôi câu hỏi" to generate a question
4. Select a programming language for the code editor if needed
5. Enter your answer in the code editor
6. Click "Gửi câu trả lời" to submit your answer for evaluation

## License

ISC
