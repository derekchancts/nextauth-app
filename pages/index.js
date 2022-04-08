import { useSession, signIn, signOut } from "next-auth/react"

import {useState, useEffect} from 'react';
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { loadUser } from "../redux/userAction"
import { useDispatch } from "react-redux"
import { wrapper } from "../redux/store"


export default function Component() {
  // const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  
  const { data: session } = useSession();

  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;


  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser(user?.email, user))
  // }, [dispatch, user])



  // useEffect(() => {
  //   if(!session || !user) {
  //     router.push('/src/user/login')
  //   }
  // }, [])


  
  // if(!session || !user) {
  //   router.push('/src/user/login')
  // }

  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }


  // return <>
  //   Not signed in <br/>
  //   <button onClick={() => signIn()}>Sign in</button>
  // </>


  return (
    <h1>Home</h1>
  )

}