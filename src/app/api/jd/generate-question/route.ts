import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEN_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jdText = formData.get('jdText') as string;
    const interviewLanguage = formData.get('interviewLanguage') as string;
    const pdfFile = formData.get('pdfFile') as File | null;

    let finalJdText = jdText || '';

    // If a PDF file was uploaded, parse it and add its text to the JD
    if (pdfFile) {
      const pdfData = await pdfFile.arrayBuffer();
      const pdfText = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsText(new Blob([pdfData]));
      });
      finalJdText += '\n' + pdfText;
    }

    // Check if we have any JD text to work with
    if (!finalJdText.trim()) {
      return NextResponse.json(
        { error: 'Please provide a JD text or upload a PDF file' },
        { status: 400 }
      );
    }

    // Call the Gemini API to generate a question
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Based on the following job description, create a challenging technical interview question related to the required skills.
      The question should assess the candidate's knowledge and problem-solving abilities.
      
      Job Description:
      ${finalJdText}
      
      Output the question in ${interviewLanguage === 'vi' ? 'Vietnamese' : interviewLanguage === 'en' ? 'English' : 'Chinese'}.
      Format the output as markdown.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Convert markdown to HTML
    const html = marked(text);
    
    return NextResponse.json({ question: html });
  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the question' },
      { status: 500 }
    );
  }
} 