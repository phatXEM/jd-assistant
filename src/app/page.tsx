"use client";

import { useState, useEffect, useRef } from "react";
import { generateQuestion, evaluateAnswer } from "@/lib/api";
import {
  commonLanguages,
  initializeAceEditor,
  getEditorValue,
} from "@/lib/editorConfig";

const Home = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    "ace/mode/javascript"
  );
  const [interviewLanguage, setInterviewLanguage] = useState("vi");
  const [jdText, setJdText] = useState("");
  const [question, setQuestion] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [showQuestionSection, setShowQuestionSection] = useState(false);
  const [showEvaluationSection, setShowEvaluationSection] = useState(false);

  const editorRef = useRef<any>(null);
  const choicesEditorRef = useRef<any>(null);
  const choicesInterviewRef = useRef<any>(null);

  // Initialize AceEditor and Choices.js after component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Ace Editor
      const initEditor = async () => {
        const editor = initializeAceEditor("codeEditor", selectedLanguage);
        editorRef.current = editor;
      };

      // Wait for DOM to be ready
      setTimeout(initEditor, 500);

      // Initialize Choices.js
      const initChoices = async () => {
        const Choices = (await import("choices.js")).default;
        const languageSelect = document.getElementById("languageSelect");
        const interviewLanguageSelect =
          document.getElementById("interviewLanguage");

        if (languageSelect) {
          // Populate language select with options
          commonLanguages.forEach((lang) => {
            const option = document.createElement("option");
            option.value = lang.mode;
            option.textContent = lang.caption;
            languageSelect.appendChild(option);
          });

          choicesEditorRef.current = new Choices(languageSelect, {
            searchEnabled: true,
            shouldSort: false,
            itemSelectText: "",
            placeholder: true,
            placeholderValue: "Chọn ngôn ngữ...",
          });
        }

        if (interviewLanguageSelect) {
          choicesInterviewRef.current = new Choices(interviewLanguageSelect, {
            searchEnabled: true,
            shouldSort: false,
            itemSelectText: "",
            placeholder: true,
            placeholderValue: "Chọn ngôn ngữ phỏng vấn...",
          });
        }
      };

      setTimeout(initChoices, 500);
    }
  }, [selectedLanguage]);

  // Handle language selection change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value;
    setSelectedLanguage(newMode);
    if (editorRef.current) {
      editorRef.current.session.setMode(newMode);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    }
  };

  // Remove PDF file
  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  // Handle JD form submission
  const handleJdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await generateQuestion(jdText, pdfFile, interviewLanguage);

      if (result.error) {
        alert(result.error);
      } else {
        setQuestion(result.question);
        setShowQuestionSection(true);
      }
    } catch (error) {
      console.error("Error generating question:", error);
      alert("An error occurred while generating the question.");
    } finally {
      setLoading(false);
    }
  };

  // Handle answer form submission
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluating(true);

    // Get answer from Ace Editor
    const editorAnswer = editorRef.current
      ? getEditorValue(editorRef.current)
      : "";

    try {
      const result = await evaluateAnswer(jdText, question, editorAnswer);

      if (result.error) {
        alert(result.error);
      } else {
        setEvaluation(result.evaluation);
        setShowEvaluationSection(true);
      }
    } catch (error) {
      console.error("Error evaluating answer:", error);
      alert("An error occurred while evaluating the answer.");
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Title */}
      <h2 className="mb-4">Nhập JD hoặc Upload File PDF</h2>

      {/* JD Form */}
      <form id="jdForm" onSubmit={handleJdSubmit}>
        {/* Textarea for JD input */}
        <div className="mb-3">
          <textarea
            id="jdText"
            className="form-control"
            placeholder="Nhập JD ở đây..."
            rows={10}
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          />
        </div>

        {/* PDF Upload */}
        <div className="mb-3">
          <label htmlFor="pdfFile" className="form-label">
            Upload File PDF
          </label>
          <input
            type="file"
            id="pdfFile"
            accept="application/pdf"
            className="form-control"
            onChange={handleFileChange}
          />
          {pdfFile && (
            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={handleRemovePdf}
            >
              Xóa file PDF
            </button>
          )}
        </div>

        {/* Interview Language Selection */}
        <div className="mb-3">
          <label htmlFor="interviewLanguage" className="form-label">
            Chọn ngôn ngữ phỏng vấn:
          </label>
          <select
            id="interviewLanguage"
            className="form-select"
            style={{ width: "100%" }}
            value={interviewLanguage}
            onChange={(e) => setInterviewLanguage(e.target.value)}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Cho tôi câu hỏi
          </button>
          {loading && (
            <span
              className="spinner-border spinner-border-sm ms-2"
              role="status"
              aria-hidden="true"
            />
          )}
        </div>
      </form>

      {/* Question Section */}
      {showQuestionSection && (
        <div id="questionSection" className="mt-4">
          <h3>Câu hỏi được tạo:</h3>
          <div
            id="generatedQuestion"
            className="mb-3"
            dangerouslySetInnerHTML={{ __html: question }}
          />

          {/* Answer Form */}
          <form id="answerForm" onSubmit={handleAnswerSubmit}>
            {/* Language Selection Dropdown */}
            <div className="mb-3">
              <label htmlFor="languageSelect" className="form-label">
                Chọn ngôn ngữ lập trình cho editor (nếu cần):
              </label>
              <select
                id="languageSelect"
                className="form-select"
                style={{ width: "100%" }}
                value={selectedLanguage}
                onChange={handleLanguageChange}
              />
            </div>

            {/* Ace Editor */}
            <div className="mb-3">
              <label htmlFor="codeEditor" className="form-label">
                Nhập câu trả lời:
              </label>
              <div
                id="codeEditor"
                style={{
                  height: "500px",
                  width: "100%",
                  border: "1px solid #ced4da",
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-success"
                disabled={evaluating}
              >
                Gửi câu trả lời
              </button>
              {evaluating && (
                <span
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                  aria-hidden="true"
                />
              )}
            </div>
          </form>
        </div>
      )}

      {/* Evaluation Section */}
      {showEvaluationSection && (
        <div id="evaluationSection" className="mt-4">
          <h3>Kết quả đánh giá:</h3>
          <div
            id="evaluationResult"
            dangerouslySetInnerHTML={{ __html: evaluation }}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
