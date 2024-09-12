import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { SearchTypes } from "../types/SearchTypes";
import { CiSearch } from "react-icons/ci";
import { BsBookmarkCheck } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { ThemeContext } from "../context/Theme";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchTypes>();
  const { id } = useParams<{ id: string }>();
  const { theme } = useContext(ThemeContext); 
  const  navigate = useNavigate()

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://api.tavily.com/search', {
        api_key: import.meta.env.VITE_API_KEY,
        query: id,
        search_depth: "basic",
        include_answer: true,
        include_images: false,
        include_raw_content: false,
        max_results: 5,
        include_domains: [],
        exclude_domains: []
      });
      setResults(response.data);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSearchResults();
    }
  }, [id]);

  return (
    <div className="py-12 md:max-w-3xl lg:max-w-5xl mx-auto pb-12">
      {loading ? (
        <div className={theme === 'dark' ? 'h-screen w-full' : ""}>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div 
                key={index}
                className={`${theme === 'dark' ? 'bg-[#202222]' : 'bg-[#E5E7EB]'} h-20 w-full animate-pulse`}
              /> 
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold lg:text-4xl">{results?.query}</h1>
          
          <div className="mt-5 inline-flex items-center gap-x-2">
            <span><CiSearch size={22}/></span>
            <h1>{results?.query}</h1>
          </div>

          <div className="mt-3">
            <div className="inline-flex items-center gap-x-2">
              <BsBookmarkCheck size={24}/>
              <h1 className="text-lg font-bold">Answer</h1>
            </div>
            
            <div className="mt-1">
              <h1>{results?.answer}</h1>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-x-2">
                <VscLibrary size={24}/>
                <h1 className="text-lg font-bold">Sources</h1>
              </div>
              
              <div className="mt-3 grid grid-cols-1 items-center gap-6">
                {results?.results.map((info) => (
                  <div key={info.title} className={`space-y-1 ${theme === 'dark' ? 'p-2 bg-[#202222] rounded-md lg:p-4' : 'p-2 md:p-4 rounded-md bg-gray-100'}`}>
                    <h1 className="font-bold">{info.title}</h1>
                    <h1>{info.content}</h1>
                    <a href={info.url} className="text-blue-600 break-words">{info.url.split('//')[1].split('/')[0]}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* new search */}
      <div className="fixed bottom-3 right-1/2"> 
        <div className={theme === 'dark' ? 'p-2.5 px-4 border bg-[#202222] rounded-full' : 'p-2.5 px-4 border bg-[#E5E7EB] rounded-full'}> 
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 font-bold">New <BsPlusLg size={20}/></button>
        </div>
      </div> 

    </div>
  );
};

export default Search;