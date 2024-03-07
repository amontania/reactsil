// import { getCurrentUser } from '@/lib/appwrite/api';
import { getCurrentUser } from '@/lib/mysql/services';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER ={    
  id: '',
  email: '',
  name: '',
  username:'',
  imageUrl:'',
  bio:''

}

const INITIAL_STATE={
    user : INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser : ()=>{},
    setIsAuthenticated : ()=>{},
    checkAuthUser : async () => false as boolean,
}
 
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}: {children:React.ReactNode})=>{
  
  const [user,setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();



  const checkAuthUser= async () => {
  //  console.log(userId);
    setIsLoading(true);
    try {
      const currentUser =await getCurrentUser();
      console.log("cu"+JSON.stringify(currentUser));
      if(currentUser){
        setUser({ 
           id: currentUser.id, 
           email:currentUser.email,
           name:currentUser.name,
           username:currentUser.username,
           imageUrl:currentUser.imageUrl,
            });
      
        setIsAuthenticated(true);
   
        return true;
      }

      return false;
       
    } catch (error) {
      console.log(error);
      return false;
      
    }  finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }
     checkAuthUser();
    

  },[]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
  }

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider> 

}


export default AuthProvider;

export const useUserContext= ()=> useContext(AuthContext);



