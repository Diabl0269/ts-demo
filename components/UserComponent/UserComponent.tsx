import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { User } from "../../types";

const createClasses = makeStyles((theme) => ({
  root: (props: { color: string }) => {
    const { color } = props;
    return {
      border: `1px solid ${color}`,
      padding: theme.spacing(2)
    };
  }
}));

interface Props {
  user: User;
  color: string;
  /*
    All not required props must have a default prop 
    as you can see at the bottom of the file
  */
  extraData?: string;
}

const UserComponent = (props: Props) => {
  const { user, color, extraData } = props;
  const { id, name } = user;
  const classes = createClasses({ color });
  return (
    <Grid container item spacing={1} className={classes.root}>
      <Grid item>
        <Typography>ID: {id}</Typography>
      </Grid>
      <Grid item>
        <Typography>Name: {name}</Typography>
      </Grid>
      {extraData && (
        <Grid item>
          <Typography>Extra Data: {extraData}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

UserComponent.defaultProps = {
  extraData: ""
};

export default UserComponent;
