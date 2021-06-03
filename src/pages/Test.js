import React from "react";
import {Loader, Message} from "semantic-ui-react"
import SingleTest from "../components/SingleTest";
import { useFetchTest } from "../utils/hooks";

function Test(props) {
    const pathName = window.location.pathname;
    const userType = pathName.split("/")[1];
    const testId = props.match.params.testId;
    const [test, { isError, isLoading }] = useFetchTest(testId);
    return (
        <div>
            {isLoading && <Loader active={isLoading} />}
            {!isLoading && !isError && (
                <SingleTest userType={userType} {...test} />
            )}
            {isError && <Message negative><Message.Header>Error while fetching test</Message.Header></Message>}
        </div>
    );
}

export default Test;
