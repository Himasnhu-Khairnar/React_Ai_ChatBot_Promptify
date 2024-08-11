import { createContext, useState, useContext } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PropTypes from "prop-types";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
  const [data, setData] = useState("");
  const [questions, setQuestions] = useState("");

  const fetchData = async (prompt) => {
    setLoading(true);
    const key = import.meta.env.VITE_REACT_APP_API_KEY;

    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();

      let formattedResponse = text.replace(/\*\*(.*?)\*\*/g, `<b>$1</b>`); // Replace **text** with <b>text</b>
      let newResponse = formattedResponse.split("*").join("<br/>");
      let newResponse1 = newResponse.split("```").join("<br/>");
      let newResponse2 = newResponse1.split(";").join(";<br/>");
      setApiData(newResponse2);
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiData("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        apiData,
        data,
        questions,
        setData,
        setQuestions,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider };
