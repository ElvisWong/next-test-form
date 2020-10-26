import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@material-ui/core';
import Timer from './Timer';
import WindowFocusHandler from "../src/WindowFocusHandler";

const useStyles = makeStyles(theme => ({
  cheatText: {
    color: "#f00",
    fontWeight: 700
  },
  multipleText: {
    width: "180px",
    color: "#555",
    display: "inline-block",
    position: "relative",
    padding: "0px 10px",
    zIndex: "1",
    "&::after": {
      content: "''",
      width: "100%",
      height: "30%",
      position: "absolute",
      bottom: "0%",
      left: "0",
      background: "#4dd0e1",
      zIndex: "-1",
    },
  },
  button: {
    margin: "20px 0"
  }
}));

const QuestionList = ({
    numOfQuestions,
    index,
    currentQuestion,
    handleSubmit
  }) => {
  const [timeEnd, setTimeEnd] = useState(false);
  const [caughtCheated, setCaughtCheated] = useState(false);
  const [yourChoice, setYourChoice] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (timeEnd) {
      setYourChoice([-1]);
    }
  }, [timeEnd]);

  useEffect(() => {
    // reset item
    setTimeEnd(false);
    setYourChoice([]);
    setCaughtCheated(false);
  }, [index]);

  const handleChange = (event) => {
    if (event.target.checked) {
      const result = Number(event.target.name.replace("checkbox_", ""));
      setYourChoice(prev => currentQuestion.isMultiple ? [...prev, result] : [result]);
    }
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setCaughtCheated(true);
    // set answer to invalid
    setYourChoice([-1]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event, yourChoice);
  };

  return (
    <form>
      <FormGroup row={false}>
        <Typography variant="h4" component="h1" gutterBottom>
          { `Question(${index + 1} / ${numOfQuestions}): ${currentQuestion.question}` } 
        </Typography>
        {
          currentQuestion.isMultiple ? <Typography variant="h6" component="h6" className={classes.multipleText}>
            Multiple Choice 
          </Typography> : null
        }
        {
          caughtCheated ? <Typography variant="h4" component="h3" className={classes.cheatText}>
            (Caught Cheated!!! You will get no marks on this question)
          </Typography>: null
        }
        {
          !caughtCheated ?
            !timeEnd ?
              <Timer seconds={currentQuestion.time} timeEnd={timeEnd} setTimeEnd={setTimeEnd} />
              : <Typography variant="h5" component="h4">Time end</Typography>
          : null
        }
        {
          currentQuestion.choices ?
          currentQuestion.choices.map((item, idx) => (
            <FormControl key={idx} fullWidth={true} disabled={caughtCheated || timeEnd}>
              <FormControlLabel
                control={<Checkbox checked={yourChoice.includes(item.index)} onChange={handleChange} name={`checkbox_${item.index}`} />}
                label={item.value}
              />  
            </FormControl>
          ))
        : null }
        <Button className={classes.button} type="submit" variant="contained" color="primary" onClick={onSubmit} disabled={!yourChoice.length}>
          Submit
        </Button>
        {!caughtCheated ? <WindowFocusHandler onBlur={onBlur} /> : null }
      </FormGroup>
    </form>
  );
};

export default QuestionList;