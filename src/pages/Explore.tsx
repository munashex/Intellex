import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/Theme';
import { TbWorldHeart } from "react-icons/tb";

interface NewsTypes {
  title: string;
  description: string;
  image: string;
  url: string;
  source: { name: string; url: string };
}

const Explore = () => {
  const [news, setNews] = useState<NewsTypes[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  const category = 'technology';
  const apikey = import.meta.env.VITE_NEWS;
  const apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apikey}`;

  const getNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setNews(response.data.articles);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="py-12 md:max-w-xl lg:max-w-2xl mx-auto pb-12">
      <div className="text-xl font-bold md:text-2xl lg:text-3xl inline-flex items-center gap-3 mb-6">
        <TbWorldHeart size={30} />
        <h1 className="text-xl md:text-2xl font-semibold">Explore</h1>
      </div>

      {loading ? (
        <div className={`space-y-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {[...Array(5)].map((_, index) => (
            <div key={index} className={`animate-pulse ${theme === 'dark' ? 'bg-[#202222]' : 'bg-[#E5E7EB]'} p-4 rounded-lg`}>
              <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
              <div className="h-20 bg-gray-400 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-400 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {news?.map((info) => (
            <div key={info.title} className={`${theme === 'dark' ? 'bg-[#202222]' : 'bg-[#E5E7EB]'} rounded-lg overflow-hidden shadow-md`}>
              <img src={info.image} alt={info.title} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">{info.title}</h2>
                <p className="text-sm">{info.description.slice(0, 120)}...</p>
                <div className="flex justify-between items-center pt-2">
                  <a href={info.source.url} className="text-blue-600 hover:underline text-sm">
                    {info.source.name}
                  </a>
                  <a href={info.url} className="text-sm font-medium hover:underline">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;