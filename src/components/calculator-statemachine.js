import React, { Component, Fragment } from 'react';
import { interpret } from 'xstate';
import { calculatorMachine } from "../state/calculator/calculator-machine";

/**
 * CalculatorStateMachine - a renderless component that manages the calculator's state in response to the
 * user's input, according to the statechart defined in calculator-machine.js)
 */
export class CalculatorStateMachine extends Component {
    state = {
        operand1: '0',
        operand2: '0',
        operator: '',
        display: '0',
        current: calculatorMachine.initialState,
    };

    formatOperandString = (existingNumber, numberToAppend) => {
        const operandString = `${existingNumber}${numberToAppend}`;
        return operandString.charAt(0) === '0'
            ? operandString.slice(1)
            : operandString;
    };

    setOperator = (current, event) => ({ operator: event.name });

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

    updateOperand = (current, event, prevState) => {
        console.log({current, event, prevState});
        const updatedValue = this.formatOperandString(prevState[current.value], event.name);
        return { [current.value]: updatedValue, display: updatedValue };
    };

    moveResultToOperand1 = () => ({
        operand1: this.calculateResult()
    });

    displayResult = () => ({ display: this.calculateResult() });

    calculateResult = () => {
        switch (this.state.operator) {
            case '+':
                return (Number.parseInt(this.state.operand1) + Number.parseInt(this.state.operand2)).toString();
            case '-':
                return (Number.parseInt(this.state.operand1) - Number.parseInt(this.state.operand2)).toString();
            case 'X':
                return (Number.parseInt(this.state.operand1) * Number.parseInt(this.state.operand2)).toString();
            case '/':
                return (Number.parseInt(this.state.operand1) / Number.parseInt(this.state.operand2)).toString();
            case '%':
                // ToDo
                return '';
            default:
                return '';
        }
    };

    runActions = (current, event) => current.actions.reduce((updatedState, action) => ({
        ...updatedState,
        ...this[action](current, event, updatedState)
    }), this.state);

    service = interpret(calculatorMachine)
        .onTransition((current, event) => {
            this.setState({ ...this.runActions(current, event) });
        });

    componentDidMount() {
        this.service.start();
    }

    componentWillUnmount() {
        this.service.stop();
    }

    onClick = button => () => {
        this.service.send(button);
    };

    render() {
        return (
            <Fragment>
                {this.props.children(this.state.display, this.onClick) }
            </Fragment>
        )
    }
}