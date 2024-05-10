import { createContext, useState, useEffect } from "react";
export const userContext = createContext({
  user: {},
  setUser: () => {},
  fullName: "",
  setFullName: () => {},
  profileImg: "",
  setProfileImg: () => {},
});
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem("userData")); 
    console.log("loggedInUserData", loggedInUserData);
    if (loggedInUserData?.user) {

      setFullName(loggedInUserData?.user?.fullName);
      setProfileImg(loggedInUserData?.user?.profileImg)
    }
  }, []);
  return (
    <userContext.Provider value={{ fullName, setFullName, user, setUser,profileImg,setProfileImg }}>
      {children}
    </userContext.Provider>
  );
};
export default userContext;