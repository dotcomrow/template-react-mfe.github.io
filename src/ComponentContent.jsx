import React from "react";
import "./styles.scss";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
    )
}

function ComponentContent({ vars }) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="container-fluid bg-white p-2 h-100 d-flex flex-column">
                // component content
            </div>
        </ErrorBoundary>
    );
}

export default ComponentContent;