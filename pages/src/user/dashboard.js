import {useState, useEffect} from 'react';
import axios from 'axios'
import cookie from 'js-cookie';
import { parseCookies } from "nookies";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router";
// import styles from '../../styles/Toast.module.css'

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

// import { loadUser } from "../../../redux/userAction"
// import { useDispatch } from "react-redux"
// import { wrapper } from "../../../redux/store"



// const Dashboard = ({ session }) => {
const Dashboard = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session, status } = useSession()
  // console.log({session})

  const cookies = parseCookies();
  // const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
  const user = cookies?.user ? JSON.parse(cookies.user) : "" ;

  
  // const dispatch = useDispatch();

  useEffect(() => {
    if(!session && !user) {
      router.push("/src/user/login")
    }
  }, [])


  if (status !== "authenticated" && !user) {
    return <h2>Loading...</h2>;
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Dashboard
      </Typography>
      <h3>This is secret page</h3>
    </>
  );

}
 
export default Dashboard;



export const getServerSideProps = async(context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}


// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session
//     }
//   }
// }