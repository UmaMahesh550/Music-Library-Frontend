import axios from "axios";
import { createContext , useState ,useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user , setUser] = useState(null);
    const [count,setCount]=useState(0);

    useEffect(()=>{
        try {
            const loggedInUser = localStorage.getItem('user');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
            }
        } catch (error) {
            console.log("Error in Authorization : "+error)
        }
    },[]);

    const login = async(user) => {

        try {
            setUser(user);
            localStorage.setItem('user',JSON.stringify(user));
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const getCount=async ()=>{
        if(user){
            await axios.get('http://localhost:5000/api/notifications/notifications/unreadCount',{
              headers:{
                Authorization: `Bearer ${user.token}`, // Send the token in the Authorization header
              }
            })
            .then(response=>{
              setCount(response.data.unreadCount);
            })
            .catch(error=>{
              console.error('Error fetching unread notifications',error);
            })
          }
    }

    return (
        <AuthContext.Provider value={{user , login  , logout, count, getCount}}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext , AuthProvider};