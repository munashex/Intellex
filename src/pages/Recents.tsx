import { useContext, useState, useEffect, useMemo } from 'react';
import { PiChatsCircleThin } from "react-icons/pi";
import { FiPlusCircle } from "react-icons/fi";
import { ThemeContext } from "../context/Theme";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, query, where, deleteDoc, doc, writeBatch, DocumentData } from "firebase/firestore";
import { auth, db } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5"
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom'


interface ChatHistoryTypes {
  createdAt: any;
  query: string;
  id: string
}

interface PromptDocument {
  userId: string;
  createdAt: any; 
  query: string;
  id: string
}

function Recents() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [chats, setChats] = useState<ChatHistoryTypes[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false) // state loading for deleting all chats histort at once
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState(''); 
  const [select, setSelect] = useState(false) //state for select all chats delection
  
  const handleSelect = () => setSelect(!select)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getChats(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const getChats = async (userId: string) => {
    try {
      const chatsData = await getDocs(query(collection(db, "prompts"), where("userId", "==", userId)));
      const formattedChats: ChatHistoryTypes[] = chatsData.docs.map(doc => {
        const data = doc.data() as PromptDocument;
        return {
          createdAt: data.createdAt,
          query: data.query,
          id: doc.id
        };
      });
      setChats(formattedChats);
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteChat = async(docId: string) => {
    try {
      const docRef = doc(db, "prompts", docId);
      await deleteDoc(docRef);
      setChats(prevChats => prevChats ? prevChats.filter(chat => chat.id !== docId) : null);
    } catch(err) {
      console.log(err);
    }
  };

  const filteredChats = useMemo(() => {
    if (!chats) return null;
    return chats.filter(chat => 
      chat.query.toLowerCase().includes(search.toLowerCase())
    );
  }, [chats, search]);



  const deleteAllChats = async () => { // Set loading state to true when starting deletion
    try {
      setLoadingDelete(true)
      const batch = writeBatch(db);
      const docRef = collection(db, "prompts");
      const getChats = await getDocs(query(docRef, where("userId", "==", auth.currentUser?.uid)));
      
      if (!getChats.empty) {
        getChats.forEach((doc: DocumentData) => {
          batch.delete(doc.ref);
        });
      }
      
      await batch.commit(); 
      setChats([]); // Clear chats from state
      toast.success('Chats deleted');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoadingDelete(false);  // Set loading state to false after completion
      setSelect(false)
    }
  };
  



  return (
    <div className="w-full md:max-w-xl lg:max-w-3xl mx-auto">
      <div className="flex justify-between mt-7">
        <h1 className="inline-flex items-center gap-x-1">
          <PiChatsCircleThin size={26} /> Your chat history
        </h1>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-x-1 font-bold bg-[#0E9272] py-1.5 px-2 rounded-lg text-white"
        >
          <FiPlusCircle size={23} /> Start New Chat
        </button>
      </div>

      <div className="mt-9">
        <input
          placeholder="Search your chats..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          className={`w-full border p-3 rounded-md outline-none placeholder:font-bold placeholder:text-lg ${
            theme === 'light' ? 'border-gray-400' : 'border-gray-700 border bg-[#202222]'
          }`}
        />
      </div>

        {/* number of chats and select all for deletion */}
      <div className="mt-3">
       {select ? 
       (
        <div className="flex flex-row justify-between animate-fade-right"> 
          <span className="text-[#1C6BBB] inline-flex items-center gap-x-1.5">
           <IoCheckmarkDoneOutline color="#1C6BBB" size={22}/>  
           <h1>{chats && chats.length} selected</h1>
            </span> 

            <div className="inline-flex items-center gap-x-3"> 
              <button onClick={handleSelect} className={theme === 'dark' ? 'py-1 px-2 bg-[#202222] rounded-lg border border-gray-700' : 'py-1 px-2 bg-[#E5E7EB] rounded-lg border border-gray-400'}>Cancel</button> 
              <button  className="bg-[rgb(14,146,114)] text-white py-1 px-2 rounded-lg" onClick={deleteAllChats}>
              {loadingDelete ? <Loader/> : 'Delete'}
              </button>
            </div>
        </div>
       ) :  
       (
      <div className="flex items-center  gap-x-4">
      <h1 className={theme === 'light' ? 'text-gray-700' : 'text-gray-400'}>
        {loading ? null : `You have ${chats && chats?.length}  previous chats  with Intellex`} 
        </h1>
      {chats && chats.length <= 1 ? null : 
      <button onClick={handleSelect} className="border-none text-[#0E9272] font-bold">
        {loading ? null : 'Select all'} 
      </button>
      }
      </div>
       )
       }
      </div>

      <div className="mt-9">
        {loading ? (
          <div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 h-16 mb-4 rounded"></div>
            ))}
          </div>
        ) : !user ? (
          <p className="text-center text-gray-500 mt-8">Please sign in to view your chat history.</p>
        ) : filteredChats && filteredChats.length > 0 ? (
          filteredChats.map((chat, index) => (
            <Link to={`/chat/${chat.id}`} key={index} className={`flex flex-col gap-y-1 py-3 md:flex-row md:justify-between px-3 border rounded-lg mt-3 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-400'} ${select ? ` border-blue-600 ${theme === 'light' ? 'bg-blue-100' : 'bg-blue-900'}` : ''}`}>
              <div> 
                <h2 className="font-semibold truncate">{chat.query.length < 51 ? chat.query : chat.query.slice(0, 48) + '..'}</h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{chat.createdAt.toDate().toLocaleString()}</p>
              </div>
              <button onClick={() => deleteChat(chat.id)}><MdDeleteOutline size={23}/></button>
            </Link>
          ))
        ) : (
          <p className="text-center mt-8">{chats  && chats.length < 1 ? null : "Not chats found"}</p>
        )}
      </div>
      <div className="py-10"/>
     
    </div>
  );
}

export default Recents;