import React from "react";
import Intro from "../Intro";

jest.mock("react-native-video", () => "Video");

jest.mock("Text", () => {
  const RealComponent = jest.requireActual("Text");
  const React = require("React");
  class Text extends React.Component {
    render() {
      return React.createElement("Text", this.props, <div>Mock</div>);
    }
  }
  Text.propTypes = RealComponent.propTypes;
  return Text;
});

import renderer from "react-test-renderer";

test("renders correctly", () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
