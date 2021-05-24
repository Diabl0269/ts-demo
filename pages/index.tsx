import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import axios from "axios";
import sample from "lodash/sample";
import { useTheme } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";
import { ApiCalls, ApiRoutes, User } from "../types";
import UserComponent from "../components/UserComponent/UserComponent";

const getUsers: ApiCalls["users"] = async () =>
  (await axios.get(ApiRoutes.USERS)).data;

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const theme = useTheme();
  const colors = useMemo(
    () => [
      theme.palette.primary,
      theme.palette.secondary,
      theme.palette.warning,
      theme.palette.error
    ],
    [theme]
  );

  // The reduce function can help us rearrange arrays data
  // We could also use lodash's reduce on objects and create
  // different data structures with it
  const objectFromArray = users.reduce(
    (acc, value, index) => ({
      ...acc,
      index: value
    }),
    {}
  );

  const usersWithColors = useMemo(
    () =>
      users.map((user) => ({
        user,
        color: sample(colors).main
      })),
    [colors, users]
  );

  console.log("objectFromArray", objectFromArray);
  useEffect(() => {
    (async () => {
      const usersRes = await getUsers();
      setUsers(usersRes);
    })();
  }, []);

  return (
    <Grid className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Tooltip title="I am a tooltip">
            <Typography variant="h1">
              Welcome to my ts demonstration project!
            </Typography>
          </Tooltip>
        </Grid>

        <Grid item>
          <Tooltip
            title="Notice the arrow override in index.tsx"
            arrow={false}
            placement="bottom"
          >
            <Typography variant="h2" align="center">
              Check out the themeprovider code
            </Typography>
          </Tooltip>
        </Grid>

        <Grid container item justify="center" spacing={2}>
          <Grid item>
            <Button>Override from default theme</Button>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="outlined" disableRipple={false}>
              Local override button
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="column" item spacing={2}>
          <Grid item>
            <Typography>Users:</Typography>
          </Grid>
          {usersWithColors.map((user) => (
            <Grid item>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <UserComponent {...user} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}