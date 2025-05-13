/**
 * API utility functions for interacting with the backend
 */

/**
 * Generate an interview question based on a job description
 * 
 * @param {string} jdText - The job description text
 * @param {File|null} pdfFile - Optional PDF file containing job description
 * @param {string} interviewLanguage - Language code for the interview (vi, en, zh)
 * @returns {Promise<{question?: string; error?: string}>} - Response with question or error
 */
export const generateQuestion = async (
  jdText: string,
  pdfFile: File | null,
  interviewLanguage: string
): Promise<{ question?: string; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append('jdText', jdText || '');
    formData.append('interviewLanguage', interviewLanguage || 'vi');
    
    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }
    
    const response = await fetch('/api/jd/generate-question', {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error generating question:', error);
    return { error: 'An error occurred while generating the question' };
  }
};

/**
 * Evaluate a candidate's answer to an interview question
 * 
 * @param {string} jdText - The job description text
 * @param {string} question - The interview question
 * @param {string} answer - The candidate's answer
 * @returns {Promise<{evaluation?: string; error?: string}>} - Response with evaluation or error
 */
export const evaluateAnswer = async (
  jdText: string,
  question: string,
  answer: string
): Promise<{ evaluation?: string; error?: string }> => {
  try {
    const formData = new FormData();
    formData.append('jdText', jdText || '');
    formData.append('question', question);
    formData.append('answer', answer);
    
    const response = await fetch('/api/jd/evaluate-answer', {
      method: 'POST',
      body: formData,
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return { error: 'An error occurred while evaluating the answer' };
  }
}; 