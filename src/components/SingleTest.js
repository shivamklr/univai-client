import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Header, Button, Message } from "semantic-ui-react";
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
    const handleSave = () => {
        try {
            setisError(false);
            setisLoading(true);
            questionList.forEach(async (question) => {
                if (
                    question.selectedId &&
                    question.answerId !== question.selectedId
                ) {
                    await axios.patch("/test/question/answer", {
                        testId: _id,
                        questionId: question._id,
                        answerId: question.selectedId,
                    });
                }
            });
            throw new Error();
        } catch (error) {
            setisError(true);
        } finally {
            setisLoading(false);
        }
    };
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
            <Container>
                <Header as="h1">{name}</Header>
                <Form>
                    {questionList.map((question) => {
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
                {userType === "teacher" && questionList.length > 0 && (
                    <Button loading={isLoading} onClick={handleSave}>
                        Save
                    </Button>
                )}
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
