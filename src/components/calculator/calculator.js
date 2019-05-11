import React, { Component } from 'react';
import Styled from 'styled-components';
import { CalculatorState } from './calculator-state';
import { CalculatorButtons } from '../calculator-buttons/calculator-buttons';
import { eventTypes } from '../../constants/event-types';
import { buttonTypes } from '../../constants/button-types';

////// CALCULATOR STYLES //////

const CalculatorContainer = Styled.View`
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
    paddingTop: 14;
    height: 80px;
`;

const HeaderText = Styled.Text`
    fontSize: 30;
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
        buttonType: buttonTypes.CONTROL,
        eventType: eventTypes.ON_CLEAR_ALL,
        name: 'C',
        width: 2,
    }, {
        buttonType: buttonTypes.CONTROL,
        eventType: eventTypes.ON_CLEAR,
        name: 'CE',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_OPERATOR,
        id: 'divide',
        name: '/',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '7',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '8',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '9',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_OPERATOR,
        name: 'X',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '4',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '5',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '6',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_OPERATOR,
        id: 'minus',
        name: '-',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '1',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '2',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '3',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_OPERATOR,
        id: 'plus',
        name: '+',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        name: '0',
    }, {
        buttonType: buttonTypes.OPERAND,
        eventType: eventTypes.ON_OPERAND,
        id: 'point',
        name: '.',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_CALCULATE,
        id: 'equals',
        name: '=',
    }, {
        buttonType: buttonTypes.OPERATOR,
        eventType: eventTypes.ON_OPERATOR,
        id: 'percent',
        name: '%',
    }];

    render() {
        return (
            <CalculatorState>
                {(display, onClick) => {
                return (
                    <CalculatorContainer>
                        <Header>
                            <HeaderText>Mike's Calculator</HeaderText>
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