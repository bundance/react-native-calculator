import React, { Component } from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components';
import { CalculatorState } from './calculator-state';
import { CalculatorButtons } from '../calculator-buttons/calculator-buttons';
import { eventTypes } from '../../constants/event-types';

////// CALCULATOR STYLES //////

const CalculatorContainer = Styled.View`
    margin: 30px;
    padding: 20px;
`;


const DisplayContainer = Styled.View`
    width: 400;
    justifyContent: center;
`;

const Display = Styled.Text`
    backgroundColor: #2C3643;
    color: white;
    height: 100px;
    fontSize: 60;
    fontWeight: 100;
    width: 400;
    textAlign: right;
    paddingRight: 10;
    paddingTop: 8;
`;

const Header = Styled.View`
    backgroundColor: #232B35;
    padding: 30px;
`;

const HeaderText = Styled.Text`
    fontSize: 28;
    color: white;
    justifyContent: center;
    textAlign: center;
`;


/**
 * Calculator - A presentational component that renders the calculator's UI, passes user input to
 * CalculatorState, and renders the value determined by CalculatorState. This component is purely
 * presentational, and contains no logic.
 */
export class Calculator extends Component {
    buttons = [{
        eventType: eventTypes.ON_CLEAR_ALL,
        name: 'C',
        width: 2,
    }, {
        name: 'CE',
        eventType: eventTypes.ON_CLEAR,
    }, {
        id: 'divide',
        name: '/',
        eventType: eventTypes.ON_OPERATOR,
    }, {
        name: '7',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '8',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '9',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: 'X',
        eventType: eventTypes.ON_OPERATOR,
    }, {
        name: '4',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '5',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '6',
        eventType: eventTypes.ON_OPERAND,
    }, {
        id: 'minus',
        name: '-',
        eventType: eventTypes.ON_OPERATOR,
    }, {
        name: '1',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '2',
        eventType: eventTypes.ON_OPERAND,
    }, {
        name: '3',
        eventType: eventTypes.ON_OPERAND,
    }, {
        id: 'plus',
        name: '+',
        eventType: eventTypes.ON_OPERATOR,
    }, {
        name: '0',
        eventType: eventTypes.ON_OPERAND,
    }, {
        id: 'point',
        name: '.',
        eventType: eventTypes.ON_OPERAND,
    }, {
        id: 'equals',
        name: '=',
        eventType: eventTypes.ON_CALCULATE,
    }, {
        id: 'percent',
        name: '%',
        eventType: eventTypes.ON_OPERATOR,
    }];

    render() {
        return (
            <CalculatorState>
                {(display, onClick) => {
                return (
                    <CalculatorContainer>
                        <Header>
                            <HeaderText>Mike's Magical Calculator</HeaderText>
                        </Header>
                        <DisplayContainer>
                            <Display id="outlined-dense">{display}</Display>
                        </DisplayContainer>
                        <CalculatorButtons buttons={this.buttons} onClick={onClick}/>
                    </CalculatorContainer>
                )
                }}
            </CalculatorState>
        );
    }
}