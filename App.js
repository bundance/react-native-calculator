/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Calculator } from "./src/components/calculator/calculator";
import Styled from 'styled-components';

const AppContainer = Styled.View`
    flex: 1;
    alignItems: center;
    backgroundColor: #000000;
`;

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer>
        <Calculator />
      </AppContainer>
    );
  }
}
