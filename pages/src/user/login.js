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

import { GoogleLoginButton } from "react-social-login-buttons"
import { toast } from "react-toastify";

import { loadUser } from "../../../redux/userAction"
import { useDispatch } from "react-redux"
import { wrapper } from "../../../redux/store"



const Login = ({ session }) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { data: session } = useSession()
  // console.log({session})

  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;

  
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser(user?.email, user))
  // },[dispatch, user])



  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    try {
    const res = await fetch('/api/user/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }),
      headers: {'Content-Type': 'application/json'}
    });

      const data = await res.json();
      // console.log(data);

      if (data.error) {
        console.log({error: data.error})
        toast.error(data.error + " 🤯", {
          // background: '#EE0022 !important',
          // icon: "🤯"
        })
      }

      if (data && !data.error) { 
        cookie.set('token', data.token)
        // cookie.set('user', data.user)
        cookie.set('user', JSON.stringify(data.user))  // need to stringy the object before we can save it as a string in a cookie

        setEmail("");
        setPassword("");

        toast.success(data.success + " 🚀", {
          // background: '#34A853 !important',
          // icon: "🚀"
        })

        router.push('/src/user/login');
      }

    } catch (err) {
      console.log(err)
    }
  };



  const logoutHandler = () => {
    if (session) {
      signOut()
    }
    cookie.remove('token');
    cookie.remove('user');
    toast.success('Logout success 👌');
    router.push('/src/user/login');
  };


  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => logoutHandler()}>Sign out</button>
    </>
  }

  if(user) {
    return <>
      Signed in as {user.email} <br/>
      <button onClick={() => logoutHandler()}>Sign out</button>
    </>
  }

  // return 
  //   <>
  //   Not signed in <br/>
  //   <button onClick={() => signIn()}>Sign in</button>

  //   <form onSubmit={submitHandler}>
  //       <h1>Login</h1>
  //       <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
  //       <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
  //       <button type="submit">Login</button>
  //     </form>
  // </>

  return (
    <Container component="main" maxWidth="xs">

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={submitHandler}
        >

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            // margin="normal"
            // sx={{ marginY: '10px' }}
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            // margin="normal"
            // sx={{ marginY: '10px' }}
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>

        {/* <Grid item xs={12}
            // container
            sx={{
              maxWidth: '100%'
            }}
          >
            <GoogleLoginButton onClick={() => signIn("google")} />
        </Grid> */}
      </Grid>

          <Grid
            container
            sx={{
              mt: 2,
              mb: 2,
              border: 1,
              borderRadius: 1,
              borderColor: "grey.400",
            }}
          >
            <GoogleLoginButton onClick={() => signIn("google")} />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
            // sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/src/user/forget" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/src/user/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  );

}
 
export default Login;



// export const getServerSideProps = wrapper.getServerSideProps((store) =>
//   async ({ req }) => {
//     const session = await getSession({ req })

//     const cookies = parseCookies()
//     const user = cookies?.user ? JSON.parse(cookies.user) : session?.user
//     console.log(user)

//     await store.dispatch(loadUser(user?.email, user))

//     return {
//       props: {
//         session,
//       },
//     };

//   }
// );


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