import React from "react";
import {Loader} from "semantic-ui-react"
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
            {isError && <p>Error while fetching test</p>}
        </div>
    );
}

export default Test;
