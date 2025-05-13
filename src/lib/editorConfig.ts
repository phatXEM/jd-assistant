/**
 * Helper functions for initializing and configuring the Ace Editor
 */

interface Language {
  mode: string;
  caption: string;
}

// List of common programming languages for Ace Editor
export const commonLanguages: Language[] = [
  { mode: 'ace/mode/javascript', caption: 'JavaScript' },
  { mode: 'ace/mode/typescript', caption: 'TypeScript' },
  { mode: 'ace/mode/python', caption: 'Python' },
  { mode: 'ace/mode/java', caption: 'Java' },
  { mode: 'ace/mode/csharp', caption: 'C#' },
  { mode: 'ace/mode/c_cpp', caption: 'C/C++' },
  { mode: 'ace/mode/php', caption: 'PHP' },
  { mode: 'ace/mode/ruby', caption: 'Ruby' },
  { mode: 'ace/mode/golang', caption: 'Go' },
  { mode: 'ace/mode/rust', caption: 'Rust' },
  { mode: 'ace/mode/html', caption: 'HTML' },
  { mode: 'ace/mode/css', caption: 'CSS' },
  { mode: 'ace/mode/sql', caption: 'SQL' },
  { mode: 'ace/mode/markdown', caption: 'Markdown' },
  { mode: 'ace/mode/json', caption: 'JSON' },
  { mode: 'ace/mode/yaml', caption: 'YAML' },
  { mode: 'ace/mode/xml', caption: 'XML' },
  { mode: 'ace/mode/swift', caption: 'Swift' },
  { mode: 'ace/mode/kotlin', caption: 'Kotlin' },
  { mode: 'ace/mode/dart', caption: 'Dart' },
];

interface EditorOptions {
  fontSize?: string;
  showPrintMargin?: boolean;
  enableBasicAutocompletion?: boolean;
  enableLiveAutocompletion?: boolean;
  enableSnippets?: boolean;
  [key: string]: any;
}

/**
 * Initialize Ace Editor
 * @param {string} elementId - The ID of the DOM element to initialize as Ace Editor
 * @param {string} initialMode - The initial mode/language for the editor
 * @param {EditorOptions} options - Additional options for the editor
 * @returns {any|null} - The Ace Editor instance or null if initialization failed
 */
export const initializeAceEditor = (
  elementId: string,
  initialMode: string = 'ace/mode/javascript',
  options: EditorOptions = {}
): any | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const ace = (window as any).ace;
    if (!ace) return null;
    
    const editor = ace.edit(elementId);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode(initialMode);
    
    // Apply default options
    const defaultOptions: EditorOptions = {
      fontSize: '14px',
      showPrintMargin: false,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    };
    
    editor.setOptions({ ...defaultOptions, ...options });
    
    return editor;
  } catch (error) {
    console.error('Error initializing Ace Editor:', error);
    return null;
  }
};

/**
 * Change the language/mode of an Ace Editor instance
 * @param {any} editor - The Ace Editor instance
 * @param {string} mode - The new mode/language to set
 */
export const changeEditorLanguage = (editor: any, mode: string): void => {
  if (!editor) return;
  
  try {
    editor.session.setMode(mode);
  } catch (error) {
    console.error('Error changing editor language:', error);
  }
};

/**
 * Get the value from an Ace Editor instance
 * @param {any} editor - The Ace Editor instance
 * @returns {string} - The content of the editor
 */
export const getEditorValue = (editor: any): string => {
  if (!editor) return '';
  
  try {
    return editor.getValue();
  } catch (error) {
    console.error('Error getting editor value:', error);
    return '';
  }
};

/**
 * Set the value of an Ace Editor instance
 * @param {any} editor - The Ace Editor instance
 * @param {string} value - The content to set
 */
export const setEditorValue = (editor: any, value: string): void => {
  if (!editor) return;
  
  try {
    editor.setValue(value, -1); // -1 moves cursor to the start
  } catch (error) {
    console.error('Error setting editor value:', error);
  }
}; 