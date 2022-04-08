// import axios from 'axios'
import {useState, useEffect} from 'react';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"

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
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import { GoogleLoginButton } from "react-social-login-buttons"
import { GoogleLogoutButton } from '../../../button/GoogleLogoutButton'
import { toast } from "react-toastify";



const Register = ({ session }) => {
// const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const router = useRouter()

  // const { data: session } = useSession()
  const cookies = parseCookies();
  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;
  // console.log({user})


  useEffect(() => {
    if(session || user) {
      router.push('/src/user/login')
    } 
  },[session, user, router])


  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    // let config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };

    try {  
      if (password.length < 6) {
        toast.error("password must be at least 6 characters in length" + " 🤯", {
          // background: '#EE0022'
        })
        return
      }

      if (password !== conPassword) {
        toast.error("passwords do not match!" + " 🤯", {
          // background: '#EE0022'
        })
        // console.log("passwords do not match")
        return
      }

        // const { data } = await axios.post('/api/register', 
        //   { email, password },
        //   config
        // )
        // console.log({data})

      const res = await fetch('/api/user/register', { 
        method: 'POST', 
        body: JSON.stringify({ email, password, firstName, lastName }),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await res.json();
      // console.log(data);

      if (data.error) {
        console.log({error: data.error})
        toast.error(data.error + " 🤯", {
          // background: '#EE0022'
        })
      }
    
      if (data && !data.error) {
        setEmail("");
        setPassword("");
        setConPassword("");
        setFirstName("");
        setLastName("");

        toast.success(data.success + " 🚀", {
          // background: '#34A853'
        });
        router.push('/src/user/login')
      }

    } catch (error) {
      console.log(error)
    }
    
  };


  // return ( 
    // <>
    //   <form onSubmit={submitHandler}>
    //     <h1>Register</h1>
    //     <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //     <button type="submit">Register</button>
    //   </form>
    // </>
  //  );



  // if(session || user) {
  //   router.push('/login')
  // }




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
          Sign up
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                id="confirm password"
                autoComplete="current-password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
              />
            </Grid>
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
            <GoogleLoginButton onClick={() => signIn("google")} >
              Sign up with Google
            </GoogleLoginButton>
            {/* <GoogleLogoutButton onClick={() => signIn("google")}/> */}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/src/user/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  )


}
 
export default Register;




export const getServerSideProps = async(context) => {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}