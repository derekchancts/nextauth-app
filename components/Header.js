import {useState, useEffect} from 'react';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import cookie from 'js-cookie';
import { toast } from "react-toastify";

import { loadUser } from "../redux/userAction"
import { useDispatch, useSelector  } from "react-redux"
import { wrapper } from "../redux/store"



export default function ButtonAppBar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector(state => state.profile)
  const { loading, error, dbUser } = profile;
  // console.log({dbUser})
  
  
  const { data: session } = useSession();
  // console.log({session})


  const cookies = parseCookies();
  // console.log({ cookies })
  // const user = cookies?.user ? JSON.parse(cookies.user) : "";
  // const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
  const user = dbUser ? dbUser : cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
  // console.log({ user })


  useEffect(() => {
    dispatch(loadUser(user?.email, user))
  },[])



  const logoutHandler = () => {
    if (session) {
      signOut()
    }
    cookie.remove('token');
    cookie.remove('user');
    toast.success('Logout success 👌');
    router.push('/src/user/login')
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <Link href="/" passHref>
              <LockOutlinedIcon />
            </Link>
          </IconButton>

          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AuthApp
          </Typography>

          <Typography variant="h6" component="div" >
            {/* {user && <p> user: {user.email} </p>} */}
            {user && <p> user: {user.name} </p>}
          </Typography>


          <Box sx={{ ml: 2 }}>
            {user || session ? (
              <>
                <Button color="inherit" onClick={() => logoutHandler()}>Logout</Button>
                {/* <Button color="inherit" >Logout</Button> */}
              </>
            ) : (
              <>
                <Link href="/src/user/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href="/src/user/register" passHref>
                  <Button color="inherit">Register</Button>
                </Link>
              </>
            )}
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}