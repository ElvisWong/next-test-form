import React, { Fragment, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../src/Link';
import QuestionList from '../components/QuestionList';
import Copyright from '../src/Copyright';
import {
  Box, Button,
} from '@material-ui/core';
import { server } from '../config';
import { AnswerContext } from '../src/answerReducer';

const useStyles = makeStyles(theme => ({
  textBody: {
    whiteSpace: "pre-line"
  },
  button: {
    width: "30%",
    margin: "20px 35%"
  }
}));

function Index({ title, questions }) {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [state, dispatch] = useReducer(AnswerReducer, answerInitialState);
  const { ans, ansDispatch } = useContext(AnswerContext);

  const classes = useStyles();

  useEffect(() => {
    if (currentIndex > -1 && currentIndex < questions.length) {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [currentIndex]);

  const handleSubmit = (event, answer) => {
    if (answer.length) {
      ansDispatch({ type: "ADD_ANSWER", value: answer });
      setCurrentIndex(x => x + 1);
    }
  }

  return (
    <Container>
      <Box maxWidth="sm" m={2} p={2}>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            { title }
          </Typography>
          {
            currentIndex >= questions.length ? 
            <>
              <Typography variant="h4" component="h4" gutterBottom>
                "You have answered all the questions"
              </Typography>
              <Link href="/result" color="secondary">
                check result
              </Link>
            </>
            : 
            (
              currentIndex < 0 ?
                <>
                  <p>This repo is inspired by: Ben Awad - <a href="https://www.youtube.com/watch?v=bx3--22D4E4&t=54s&ab_channel=BenAwad" target="_blank">Coding Interviews are Broken</a></p>
                  <Typography variant="body1" component="body1" className={classes.textBody}>
                    {`The purpose of this test is to show what 's the best way to test whether the developer are managed to know React.js.
                    \n
                    Actually why technical test for developers will be like the exam I have in university that I hated most ?
                    If you want to test the concept for developers using MC questions, at least you should provide enough time to think instead of having less than 1 minute for each questions.
                    \n
                    Better way to test a developer is suggested to have a short(ard 20 mins) coding test.And ask them about why you would deal with the problem like this, which is better to show their problem - solving skills.And Google search is necessary
                    for every developers to do their daily work.
                    \n
                    So..., does cheating matter for developer to work on their technical test ? ?`}
                  </Typography>
                  <Button variant="contained" className={classes.button} onClick={(e) => setCurrentIndex(x => x + 1)}>Start</Button>
                </>
                :
                <QuestionList
                  numOfQuestions={questions.length}
                  index={currentIndex}
                  currentQuestion={currentQuestion}
                  handleSubmit={handleSubmit}
                  />
            )
          }
        </Container>
      </Box>
      <Copyright />
    </Container>
  );
}

export default Index;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export const getStaticProps = async(req) => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${server}/json/test.json`);
  let test = await res.json();

  // random shuffle answer order
  test.questions.forEach((q, idx) => q.choices = q.choices.sort(() => .5 - Math.random()));

  return {
    props: {
      title: test.title,
      questions: test.questions
    },
  }
}