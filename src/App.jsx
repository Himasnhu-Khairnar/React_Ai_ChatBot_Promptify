import { FaSearch } from "react-icons/fa";
import { IoCompassOutline } from "react-icons/io5";
import { SiAudiotechnica } from "react-icons/si";
import { PiBowlFoodLight } from "react-icons/pi";
import { useAppContext } from "./Context/GeminiAi";

function App() {
  const { loading, apiData, data, setData, fetchData } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(data);
  };

  const handleQuestionClick = async (question) => {
    setData(question);
    await fetchData(question);
    setData("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl w-full">
        <h3 className="text-5xl font-extrabold text-center text-gray-800 mb-8 bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
        Promptly
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            {loading ? (
              <p className="text-xl font-semibold text-gray-700">Loading...</p>
            ) : (
              <div className="bg-white p-4   mb-6 w-full">
                <p
                  dangerouslySetInnerHTML={{ __html: apiData }}
                  className="text-gray-800 text-base"
                ></p>
              </div>
            )}
            {!loading && !apiData && (
              <ul className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: "Foods with Protein", icon: PiBowlFoodLight },
                  { label: "Suggest me a good phone in midrange", icon: SiAudiotechnica },
                  { label: "Suggest some beaches to visit in a city, including details", icon: IoCompassOutline },
                  { label: "Hello World Code in Python", icon: SiAudiotechnica },
                ].map(({ label, icon: Icon }, index) => (
                  <li
                    key={index}
                    onClick={() => handleQuestionClick(label)}
                    className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                  >
                    <Icon className="text-4xl mb-4" />
                    <span className="text-lg">{label}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter Your Prompt"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-"
              />
              <button
                type="submit"
                className="absolute right-5 top-6 hover:text-gray-400 transform -translate-y-1/2p-3 rounded-full text-black    transition-colors duration-300"
              >
                <FaSearch className="text-xl" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
