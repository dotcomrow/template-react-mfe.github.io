import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import { commonLogin, displayError } from 'common/functions';
import ComponentContent from "./ComponentContent";
import { ErrorBoundary } from "react-error-boundary";

commonLogin().then(() => {
    ReactDOM.render(
        <ErrorBoundary FallbackComponent={displayError}>
            <div className="d-flex" style={
                { "height": "100%" }
            }>
                <ComponentContent />
            </div>
        </ErrorBoundary>
        , document.getElementById("root"));
}).catch((err) => {
    ReactDOM.render(
        displayError({ error: err }),
        document.getElementById("root")
    );
});
