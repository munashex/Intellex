import { doc, getDoc } from 'firebase/firestore'
import { db, auth} from '../config/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { SearchTypes } from "../types/SearchTypes";
import { CiSearch } from "react-icons/ci";
import { BsBookmarkCheck } from "react-icons/bs";
import { VscLibrary } from "react-icons/vsc";
import { ThemeContext } from "../context/Theme";
import { BsPlusLg } from "react-icons/bs";


const Chats = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()


  const [chat, setChat] = useState<SearchTypes | null>(null)
  const { theme } = useContext(ThemeContext);

  const [loading, setLoading] = useState(true)

  const getChat = async (chatId: string) => {
    try {
      setLoading(true)
      const docRef = doc(db, "prompts", chatId)
      const chatDoc = await getDoc(docRef)
      const chatData = chatDoc.data() as SearchTypes | undefined
      setChat(chatData || null)
    } catch (err) {
      console.log(err)
      setChat(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (auth.currentUser?.uid && id) {
      getChat(id)
    } else {
      navigate('/')
    }
  }, [id, navigate])

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
      ) : chat ? (
        <div>
          <h1 className="text-2xl font-bold lg:text-4xl">{chat.query}</h1>
          
          <div className="mt-5 inline-flex items-center gap-x-2">
            <span><CiSearch size={22}/></span>
            <h1>{chat.query}</h1>
          </div>
          
          <div className="mt-3">
            <div className="inline-flex items-center gap-x-2">
              <BsBookmarkCheck size={24}/>
              <h1 className="text-lg font-bold">Answer</h1>
            </div>
            
            <div className="mt-1">
              <h1>{chat.answer}</h1>
            </div>

            <div className="mt-6">
              <div className="inline-flex items-center gap-x-2">
                <VscLibrary size={24}/>
                <h1 className="text-lg font-bold">Sources</h1>
              </div>
              
              <div className="mt-3 grid grid-cols-1 items-center gap-6">
                {chat.results.map((info) => (
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
      ) : (
        <div>No chat data available.</div>
      )}

      {/* New search */}
      <div className="fixed bottom-3 right-1/2">
        <div className={theme === 'dark' ? 'p-2.5 px-4 border bg-[#202222] rounded-full' : 'p-2.5 px-4 border bg-[#E5E7EB] border-[#4a4d51] rounded-full'}>
          <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 font-bold">
            New <BsPlusLg size={20}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chats