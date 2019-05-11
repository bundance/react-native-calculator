import React, { Component, Fragment } from 'react';
import { eventTypes } from '../../constants/event-types';
import { states } from '../../constants/calculator-states';

/**
 * CalculatorState - a renderless component that manages the calculator's state in response to the user's input. This
 * component contains the logic without imposing any styling or rendering constraints.
 */

export class CalculatorState extends Component {
    state = {
        operand1: '0',
        operand2: '0',
        operator: '',
        display: '0',
        current: states.OPERAND1,
    };

    formatOperandString = (existingNumber, numberToAppend) => {
        const operandString = `${existingNumber}${numberToAppend}`;
        return operandString.charAt(0) === '0'
            ? operandString.slice(1)
            : operandString;
    };

    setOperator = (nextState, event) => ({ operator: event.name, current: nextState });

    clearOperand1 = () => ({ operand1: '0' });
    clearOperand2 = () => ({ operand2: '0' });
    clearOperator = () => ({ operator: '' });
    clearDisplay = () => ({ display: '0' });
    clearAll = () => ({
        operand1: '0',
        operand2: '0',
        operator: '',
        display: '0',
    });

    updateOperand = (nextState, event, componentState) => {
        const updatedValue = this.formatOperandString(componentState[nextState], event.name);
        return { [nextState]: updatedValue, display: updatedValue, current: nextState };
    };

    moveResultToOperand1 = nextState => ({ operand1: this.calculateResult(), current: nextState });

    displayResult = nextState => {
        const result = this.calculateResult();
        return Number.isNaN(result)
            ? this.showError()
            : { display: result.toString(), current: nextState };
    };

    calculateResult = () => {
        switch (this.state.operator) {
            case '+':
                return Number.parseInt(this.state.operand1) + Number.parseInt(this.state.operand2);
            case '-':
                return Number.parseInt(this.state.operand1) - Number.parseInt(this.state.operand2);
            case 'X':
                return Number.parseInt(this.state.operand1) * Number.parseInt(this.state.operand2);
            case '/':
                return Number.parseInt(this.state.operand1) / Number.parseInt(this.state.operand2);
            case '%':
                // ToDo
                return Number.NaN;
            default:
                return Number.NaN;
        }
    };

    showError = () => ({ display: 'ERROR', current: states.ERROR });

    computeUpdatedComponentState = (current, event) => {
        let actions = [];
        let nextState;

        switch(current) {
            case states.OPERAND1:
                switch (event.eventType) {
                    case eventTypes.ON_CLEAR:
                        actions = ['clearOperand1', 'clearDisplay'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_OPERATOR:
                        actions = ['setOperator'];
                        nextState = states.OPERATOR;
                        break;
                    case eventTypes.ON_OPERAND:
                        actions = ['updateOperand'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_CLEAR_ALL:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    default:
                        actions = ['showError'];
                        nextState = states.ERROR;
                        break;
                }
                break;
            case states.OPERATOR:
                switch (event.eventType) {
                    case eventTypes.ON_OPERAND:
                        actions = ['clearDisplay', 'updateOperand'];
                        nextState = states.OPERAND2;
                        break;
                    case eventTypes.ON_CLEAR:
                        actions = ['clearOperand1', 'clearOperator', 'clearDisplay'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_CLEAR_ALL:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    default:
                        actions = ['showError'];
                        nextState = states.ERROR;
                        break;
                }
                break;
            case states.OPERAND2:
                switch (event.eventType) {
                    case eventTypes.ON_OPERAND:
                        actions = ['updateOperand'];
                        nextState = states.OPERAND2;
                        break;
                    case eventTypes.ON_OPERATOR:
                        actions = ['moveResultToOperand1', 'setOperator', 'clearOperand2'];
                        nextState = states.OPERAND2;
                        break;
                    case eventTypes.ON_CALCULATE:
                        actions = ['displayResult'];
                        nextState = states.DISPLAY_RESULT;
                        break;
                    case eventTypes.ON_CLEAR:
                        actions = ['clearOperand2', 'clearDisplay'];
                        nextState = states.OPERAND2;
                        break;
                    case eventTypes.ON_CLEAR_ALL:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    default:
                        actions = ['showError'];
                        nextState = states.ERROR;
                        break;
                }
                break;
            case states.DISPLAY_RESULT:
                switch (event.eventType) {
                    case eventTypes.ON_OPERAND:
                        actions = ['clearAll', 'updateOperand'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_OPERATOR:
                        actions = ['moveResultToOperand1', 'setOperator', 'clearOperand2'];
                        nextState = states.OPERAND2;
                        break;
                    case eventTypes.ON_CLEAR:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_CLEAR_ALL:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    default:
                        actions = ['showError'];
                        nextState = states.ERROR;
                        break;
                }
                break;
            case states.ERROR:
                switch (event.eventType) {
                    case eventTypes.ON_CLEAR:
                        actions = ['clearAll', 'clearDisplay'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_OPERAND:
                        actions = ['clearAll', 'updateOperand'];
                        nextState = states.OPERAND1;
                        break;
                    case eventTypes.ON_CLEAR_ALL:
                        actions = ['clearAll'];
                        nextState = states.OPERAND1;
                        break;
                    default:
                        actions = ['showError'];
                        nextState = states.ERROR;
                        break;
                }
                break;

            default:
                actions = ['showError'];
                nextState = states.ERROR;
                break;
        }

        return this.runActions(actions, event, nextState);
    };

    runActions = (actions, event, nextState) =>
        actions.reduce((updatedComponentState, action) => ({
            ...updatedComponentState,
            ...this[action](nextState, event, updatedComponentState)
        }), this.state);

    onClick = button => () => this.setState(this.computeUpdatedComponentState(this.state.current, button));

    render() {
        return (
            <Fragment>
                {this.props.children(this.state.display, this.onClick) }
            </Fragment>
        )
    }
}