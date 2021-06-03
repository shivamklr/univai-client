import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";

function AddQuestion({ testId, setQuestionList }) {
    const [question, setQuestion] = useState("");
    const [choice, setchoice] = useState("");
    const [choices, setchoices] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const addChoice = () => {
        if (choice.trim() === "") return;
        setchoices([...choices, { choice }]);
        setchoice("");
    };
    const submitHandler = async () => {
        try {
            setIsError(false);
            setisLoading(true);
            console.log(choices);
            const res = await axios.patch("/test/question", {
                testId,
                choices,
                title: question,
            });
            const newQuestion = res.data.data.question;
            if (newQuestion) {
                setQuestionList((prevList) => {
                    return [...prevList, { ...newQuestion }];
                });
            }
        } catch (e) {
            console.log({ e });
            setIsError(true);
        } finally {
            setisLoading(false);
            setchoices([]);
            setQuestion("");
        }
    };
    return (
        <Form loading={isLoading}>
            <Form.Field>
                <label>Question</label>
                <input
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Question Title"
                    value={question}
                />
            </Form.Field>
            <Form.Field>
                <label>choice:</label>
                <input
                    onChange={(e) => setchoice(e.target.value)}
                    placeholder={`choice ${choices.length + 1}`}
                    value={choice}
                />
            </Form.Field>
            {choices.map((choice, index) => {
                return <p key={index}>{choice.choice}</p>;
            })}
            <Button onClick={addChoice}>Add choice</Button>
            <Button onClick={submitHandler}>Create Question</Button>
            {isError && (
                <Message negative>
                    <Message.Header>
                       Error while submitting
                    </Message.Header>
                </Message>
            )}
        </Form>
    );
}

export default AddQuestion;
