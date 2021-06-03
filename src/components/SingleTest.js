import React, { useState } from "react";
import { Container, Form, Header, Button } from "semantic-ui-react";
import AddQuestion from "./AddQuestion";

function SingleTest({ _id, userType, name, questions }) {
    const [questionList, setQuestionList] = useState([...questions]);
    const [isError, setisError] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const handleChange = (questionId, selectedId) => {
        setQuestionList(
            questionList.map((question) => {
                if (question._id === questionId) {
                    question.selectedId = selectedId;
                }
                return question;
            })
        );
    };
    const handleSave = () => {};
    const handleSubmit = () => {
        // evaluation logic
        const marks = questionList.reduce((a, question) => {
            if (
                question.answerId !== undefined &&
                question.answerId === question.selectedId
            ) {
                return a + 1;
            } else return a;
        }, 0);
        alert(`You scored ${marks} out of ${questionList.length}`);
    };
    return (
        <div>
            SinglePost
            <p>testId= {_id}</p>
            <p>name={name}</p>
            <p>userType = {userType}</p>
            <Container>
                <Header as="h1">{name}</Header>
                <Form>
                    {questionList.map((question, index) => {
                        return (
                            <Form.Group key={question._id} grouped>
                                <Form.Field>{question.title}</Form.Field>
                                {question.choices.map((choice) => {
                                    return (
                                        <Form.Field key={choice._id}>
                                            <Form.Field
                                                name={`${question._id}`}
                                                label={choice.choice}
                                                value={choice._id}
                                                control="input"
                                                type="radio"
                                                checked={
                                                    question.selectedId
                                                        ? choice._id ===
                                                          question.selectedId
                                                        : userType ===
                                                              "teacher" &&
                                                          choice._id ===
                                                              question.answerId
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        question._id,
                                                        choice._id
                                                    )
                                                }
                                            />
                                        </Form.Field>
                                    );
                                })}
                            </Form.Group>
                        );
                    })}
                </Form>
                {isError && (
                    <Message negative>
                        <Message.Header>Error while Saving</Message.Header>
                    </Message>
                )}
                {userType === "teacher" && (
                    <AddQuestion
                        testId={_id}
                        setQuestionList={setQuestionList}
                    />
                )}
                {userType === "student" && (
                    <Button onClick={handleSubmit}>Submit</Button>
                )}
            </Container>
        </div>
    );
}

export default SingleTest;
