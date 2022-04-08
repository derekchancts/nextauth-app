import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material//CssBaseline"
import theme from "../theme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { wrapper } from "../redux/store"


// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SessionProvider>
//   );
// }


// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
function MyApp({ Component, pageProps }) {

  // useEffect(() => {
  //   const jssStyles = document.querySelector("#jss-server-side")
  //   if (jssStyles) {
  //     jssStyles.parentElement.removeChild(jssStyles)
  //   }
  // }, [])


  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <ToastContainer 
              theme="dark"
              autoClose={3000}
              hideProgressBar={true}
              closeOnClick
              // toastStyle={{ backgroundColor: "crimson" }}
            />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

 
// export default MyApp
export default wrapper.withRedux(MyApp)
