import React, { Fragment, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import WindowFocusHandler from "../src/WindowFocusHandler";
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Button,
} from '@material-ui/core';
import { server } from '../config';

function Index({ title, questions }) {
  console.log("props: ", title, questions);
  const [answer, setQuestionAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState({ans: []});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentQuestion(questions[currentIndex]);
    console.log("setCurrentQuestion: ", currentIndex);
  }, [currentIndex]);

  const changeAnswer = (event) => {
    if (event.target.checked) {
      const result = Number(event.target.name.replace("checkbox_", ""));
      setCurrentAnswer(prev => Object.assign({}, prev, {
          ans: currentQuestion.isMultiple ? [...prev.ans, result] : [result]
        })
      );
    }
  };

  const submitAnswer = (event) => {
    if (currentAnswer.ans && currentAnswer.ans.length) {
      setQuestionAnswer([...answer, currentAnswer]);
      setCurrentAnswer({ans: []});
      setCurrentIndex(x => x + 1);
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            { title }
          </Typography>
          <FormGroup row={false}>
                {
                  currentIndex >= questions.length ? 
                  <Link href="/about" color="secondary">
                    check result
                  </Link> :
                  <>
                    <Typography variant="h4" component="h1" gutterBottom>
                      { currentQuestion.question }
                    </Typography>
                    {
                      currentQuestion.answers ?
                      currentQuestion.answers.map((item, idx) => (
                        <FormControl key={idx} fullWidth={true}>
                          <FormControlLabel
                            control={<Checkbox checked={currentAnswer.ans.includes(item.index)} onChange={changeAnswer} name={`checkbox_${item.index}`} />}
                            label={item.value}
                          />  
                        </FormControl>
                      ))
                    : null }
                    <Button variant="contained" color="primary" onClick={submitAnswer} disabled={!currentAnswer.ans.length}>
                      Submit
                    </Button>
                  </>
                }
          </FormGroup>
        </Container>
      </Paper>
      <Copyright />
      <WindowFocusHandler />
    </Container>
  );
}

export default Index;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export const getStaticProps = async() => {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${server}/json/test.json`);
  const test = await res.json();

  console.log("question: ", test, test.questions);

  return {
    props: {
      title: test.title,
      questions: test.questions
    },
  }
}