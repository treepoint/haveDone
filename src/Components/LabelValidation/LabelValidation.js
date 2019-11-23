import React from "react";
import "./LabelValidation.css";

class LabelValidation extends React.Component {
  render() {
    let error = !!this.props.value ? " error" : "";

    return <div className={"validation" + error}>{this.props.value}</div>;
  }
}

export default LabelValidation;
