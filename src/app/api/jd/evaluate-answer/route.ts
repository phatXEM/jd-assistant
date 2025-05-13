import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEN_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const jdText = formData.get('jdText') as string;
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;

    // Validate inputs
    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Call the Gemini API to evaluate the answer
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Based on the following job description and interview question, evaluate the candidate's answer.
      Provide a detailed assessment of the answer's strengths and weaknesses, and suggest improvements.
      
      Job Description:
      ${jdText || 'Not provided'}
      
      Interview Question:
      ${question}
      
      Candidate's Answer:
      ${answer}
      
      Evaluate the answer in terms of:
      1. Technical accuracy
      2. Completeness
      3. Clarity and communication
      4. Best practices and coding style (if applicable)
      
      Format your evaluation as markdown with clear sections and bullet points as needed.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Convert markdown to HTML
    const html = marked(text);
    
    return NextResponse.json({ evaluation: html });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return NextResponse.json(
      { error: 'An error occurred while evaluating the answer' },
      { status: 500 }
    );
  }
} 