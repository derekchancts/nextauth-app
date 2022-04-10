import { useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

import { parseCookies } from "nookies";

import { loadUser } from "../../../redux/userAction";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../../redux/store";

import { Button, Typography } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";



const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const { loading, error, dbUser } = profile;

  // console.log("profile", dbUser)

  // const { data: session } = useSession();
  // const cookies = parseCookies();
  // const user = dbUser ? dbUser : cookies?.user ? JSON.parse(cookies.user) : session?.user ? session.user : "" ;

  // useEffect(() => {
  //   dispatch(loadUser(user.email, user))
  // },[])

  const emailReset = async () => {
    // console.log("submit")

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `/api/user/emailReset`,
        { dbUser },
        config
      );

      if (data.error) {
        toast.error(data.error.message);
      }

      toast.success(data.success);
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div>
      <h1>Profile </h1>

      {dbUser && (
        <>
          <Typography component="h1" variant="h5">
            {dbUser.name}
          </Typography>
          <Typography component="h1" variant="h5">
            {dbUser.email}
          </Typography>
          <Typography component="h1" variant="h5">
            {dbUser.validEmail && " "}
            {dbUser.validEmail === "not" && (
              <Button onClick={emailReset}>Click here to Verify Email Address</Button>
            )}

            {/* {
              (dbUser.validEmail =
                (dbUser.validEmail === "not") ? (
                  <Button onClick={emailReset}>
                    Click here to Verify Email Address
                  </Button>
                ) : (
                  " "
                ))
            } */}

          </Typography>
        </>
      )}
    </div>
  );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req }) => {
//       const session = await getSession({ req })
//       const cookies = parseCookies()

//       const user = cookies?.user ? JSON.parse(cookies.user) : session?.user

//       await store.dispatch(loadUser(user?.email, user))

//       return {
//         props: {
//           session,
//         },
//       }
//     }
// )

export default Profile;
