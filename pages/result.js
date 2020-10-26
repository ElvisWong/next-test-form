import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {
  Icon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Link from '../src/Link';
import { server } from '../config';
import Copyright from '../src/Copyright';
import { AnswerContext } from '../src/answerReducer';

const useStyles = makeStyles(theme => ({
  button: {
    margin: "20px 0",
  },
}));

const About = ({ questions, answers }) => {
  const { ans, ansDispatch } = useContext(AnswerContext);
  const [score, setScore] = useState();

  useEffect(() => {
    if (ans.ans) {
      const totalScore = ans.ans.filter((x, idx) => JSON.stringify(x) === answers[idx]).length;
      setScore(totalScore);
    }
  }, [ans]);

  const classes = useStyles();
  return (
    questions ?
    <Container>
      <Box maxWidth="sm" m={2} p={2}>
        <Container>
          {
            ans.ans.length ?
            <>
              <Typography variant="h4" component="h1" gutterBottom>
                My Results: {score}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                  <TableCell>Your Answer</TableCell>
                  <TableCell>Actual Answer</TableCell>
                  <TableCell>Is Correct?</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.values(ans.ans).map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{!item.includes(-1) ? item.map(x => questions[idx].choices[Number(x)].value).join(", ") : "Did not answered"}</TableCell>
                        <TableCell>{answers[idx].map(x => questions[idx].choices[Number(x)].value).join(", ")}</TableCell>
                        <TableCell>{JSON.stringify(answers[idx]) === JSON.stringify(item) ? <Icon>check</Icon> : <Icon>close</Icon>}</TableCell>
                      </TableRow>
                    ))
                  }
                  <TableRow key={ans.ans.length}>
                    <TableCell>Total Score: </TableCell>
                    <TableCell></TableCell>
                    <TableCell>{score}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </> : null
          }
          <Button className={classes.button} variant="contained" color="primary" component={Link} href="/" onClick={() => ansDispatch({type: "CLEAR_ANSWER"})}>
            Do quiz again
          </Button>
        </Container>
        <Copyright />
      </Box>
    </Container> : null
  );
}

export default About;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export const getStaticProps = async () => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${server}/json/test.json`);
  const test = await res.json();

  return {
    props: {
      questions: test.questions,
      answers: test.questions.map(x => x.answers)
    },
  }
}