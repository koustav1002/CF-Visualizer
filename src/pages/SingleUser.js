import React, { useEffect, useRef, useState } from "react";
import styles from "./SingleUser.module.css";
import Grid from "@mui/material/Grid";
import axios from "axios";
// import {Alert, AlertTitle} from "@mui/material";
import { Button, TextField } from "@mui/material";
import ContestRatingGraph from "../Components/SingleUser/ContestRatingGraph/ContestRatingGraph";
import ProblemIndexGraph from "../Components/SingleUser/ProblemIndexGraph/ProblemIndexGraph";
import ProblemLanguageChart from "../Components/SingleUser/ProblemLanguageChart/ProblemLanguageChart";
import ProblemRatingGraph from "../Components/SingleUser/ProblemRatingGraph/ProblemRatingGraph";
import ProblemTagGraph from "../Components/SingleUser/ProblemTagGraph/ProblemTagGraph";
import ProblemVerdictChart from "../Components/SingleUser/ProblemVerdictChart/ProblemVerdictChart";
import SubmissionsGraph from "../Components/SingleUser/SubmissionsGraph/SubmissionsGraph";
import UserInfo from "../Components/SingleUser/UserData/UserInfo";
import ContestInfo from "../Components/SingleUser/UserData/ContestInfo";
import { toast } from "material-react-toastify";

const SingleUser = () => {
  const inp = useRef(null);
  const [username, setUsername] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userContests, setUserContests] = useState("");
  const [userSubmissions, setUserSubmissions] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(inp.current.value);
  };

  const renderData = () => {
    if (userInfo) {
      return (
        <>
          <div className={styles.narrowOuter}>
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} sm={8} md={6} lg={6}>
                <div className={styles.narrowComponent}>
                  <UserInfo userInfo={userInfo} />
                </div>
              </Grid>
              <Grid item xs={12} sm={8} md={6} lg={6}>
                <div className={styles.narrowComponent}>
                  <ContestInfo userContests={userContests} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className={styles.broadComponent}>
            <ContestRatingGraph
              userContests={userContests}
              maxRating={userInfo.maxRating}
            />
          </div>

          <div className={styles.broadComponent}>
            <ProblemTagGraph userSubmissions={userSubmissions} />
          </div>

          <div className={styles.narrowOuter}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <div className={styles.narrowComponent}>
                  <ProblemVerdictChart userSubmissions={userSubmissions} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <div className={styles.narrowComponent}>
                  <ProblemLanguageChart userSubmissions={userSubmissions} />
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={4}>
                <div className={styles.narrowComponent}>
                  <SubmissionsGraph userSubmissions={userSubmissions} />
                </div>
              </Grid>
            </Grid>
          </div>

          <div className={styles.broadComponent}>
            <ProblemRatingGraph userSubmissions={userSubmissions} />
          </div>
          <div className={styles.broadComponent}>
            <ProblemIndexGraph userSubmissions={userSubmissions} />
          </div>
        </>
      );
    }
  };

  // const renderError = () => {
  //   return (
  //     <div className={styles.invalid}>
  //       <Alert severity="error">
  //         <AlertTitle>
  //           {" "}
  //           <strong>Oops!</strong>{" "}
  //         </AlertTitle>
  //         It seems like you entered an <strong>invalid username</strong>.
  //       </Alert>
  //     </div>
  //   );
  // };

  useEffect(() => {
    const fetchData = async () => {
      //   console.log(username);
      try {
        const responseUI = await axios(
          `https://codeforces.com/api/user.info?handles=${username}`
        );
        // console.log(responseUI);
        let user = responseUI.data.result[0];
        setUserInfo(user);
        setError(false);
      } catch (err) {
        // console.log(`Error occured : ${err}`);
        setError(true);
        toast.error("Oops! It seems like you entered an invalid username...");
        setError(false);
      }

      try {
        const responseUC = await axios(
          `https://codeforces.com/api/user.rating?handle=${username}`
        );
        console.log(responseUC);
        let userRatings = responseUC.data.result;
        setUserContests(userRatings);
        setError(false);
      } catch (err) {
        setError(true);
      }

      try {
        const responseUS = await axios.get(
          `https://codeforces.com/api/user.status?handle=${username}`
        );
        let userSubs = responseUS.data.result;
        setUserSubmissions(userSubs);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };

    if (username !== "") fetchData();
  }, [username]);
  return (
    <div>
      <form
        className={styles.form}
        noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <div className={styles.flexContainer}>
          <TextField
            className={styles.textInput}
            label="Codeforces Username"
            variant="outlined"
            color="primary"
            inputRef={inp}
            required
          />
          <Button
            className={styles.btn}
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </form>
      {/* {username !== "" ? (error === true ? toast.error('Oops! Invalid username!') : renderData()) : null} */}
      {username !== "" && error === false && renderData()}
    </div>
  );
};

export default SingleUser;
