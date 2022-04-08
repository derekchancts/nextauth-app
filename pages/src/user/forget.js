import React from "react"

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
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox"

import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"



export default function SignIn() {
  const router = useRouter()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = new FormData(e.currentTarget)  // grabs the form
    // eslint-disable-next-line no-console
    // console.log(e.currentTarget)  // grab the form
    try {
      const email = result.get("email")
      // console.log({email})

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(`/api/user/forget`, { email }, config)

      // const res = await fetch('/api/user/forget', { 
      //   method: 'POST', 
      //   body: JSON.stringify({ email }),
      //   headers: {'Content-Type': 'application/json'}
      // });

      // const data = await res.json();
      // console.log(data);

      if (data.error) {
        toast.error(data.error.message)
      }

      toast.success(data.success)
      router.push("/src/user/login")
    } catch (error) {
      console.log(error.response)
      toast.error(error?.response?.data?.error)
    }
  }


  return (
    <>
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
            <ForwardToInboxIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Email Reset Link
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
              >
                Submit
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/src/user/login" variant="body2">
                    Have an account ? Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/src/user/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}
