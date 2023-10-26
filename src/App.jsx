import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";

ReactDOM.render(
    <div className="h-100">
        <MapContent
            mapIsReadyCallback={trySampleRequest}
            vars={mapIsReadyCallback} />
    </div>
    , document.getElementById("root"));