import React from "react";
import "./styles.scss";
import { ErrorBoundary } from "react-error-boundary";
import { displayError } from 'common/functions';

function ComponentContent({ vars }) {
    return (
        <ErrorBoundary FallbackComponent={displayError}>
            <div className="container-fluid bg-white p-2 h-100 d-flex flex-column">
                // component content
            </div>
        </ErrorBoundary>
    );
}

export default ComponentContent;