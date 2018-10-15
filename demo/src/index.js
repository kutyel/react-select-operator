import React, { Component } from "react";
import { render } from "react-dom";

import Example from "../../src";
import { niceOption } from "./data";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-select-operator Demo</h1>
        <Example options={niceOption} />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
