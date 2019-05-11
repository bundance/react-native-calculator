import React from 'react';
import { mount, shallow } from 'enzyme/build'
import { CalculatorState } from './calculator-state';
import { states } from '../../constants/calculator-states';

describe('CalculatorState', () => {
    describe('formatOperandString', () => {
        it('should format an operand string correctly', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);

            expect(wrapper.instance().formatOperandString(1, 1)).toEqual('11');
            expect(wrapper.instance().formatOperandString(0, 1)).toEqual('1');
        });
    });

    describe('updateOperand', () => {
       it('should return a correctly-formatted component state property', () => {
           const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);

           expect(wrapper.instance().updateOperand(states.OPERAND1, { name: '1' }, { operand1: '2'} ))
               .toEqual({ current: states.OPERAND1, display: '21', operand1: '21' });
       });
    });

    describe('displayResult', () => {
        it('should return the correctly-calculated value to display', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: '1',
                operand2: '2',
                operator: '+',
                display: '0',
                current: states.DISPLAY_RESULT,
            });

            expect(wrapper.instance().displayResult(states.OPERAND1))
                .toEqual({ display: '3', current: states.OPERAND1 });
        });

        it('should handle a NaN being calculated', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: 'Infinity',
                operand2: '2',
                operator: 'X',
                display: 'Infinity',
                current: states.DISPLAY_RESULT,
            });

            expect(wrapper.instance().displayResult(states.OPERAND1))
                .toEqual({ display: 'ERROR', current: states.ERROR });
        });
    });

    describe('calculateResult', () => {
       it('should handle addition', () => {
           const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
           wrapper.setState({
               operand1: '1',
               operand2: '2',
               operator: '+',
           });

           expect(wrapper.instance().calculateResult()).toEqual(3);
       });

        it('should handle subtraction', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: '3',
                operand2: '1',
                operator: '-',
            });

            expect(wrapper.instance().calculateResult()).toEqual(2);
        });

        it('should handle multiplication', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: '3',
                operand2: '2',
                operator: 'X',
            });

            expect(wrapper.instance().calculateResult()).toEqual(6);
        });

        it('should handle division', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: '10',
                operand2: '2',
                operator: '/',
            });

            expect(wrapper.instance().calculateResult()).toEqual(5);
        });

        it('should handle an error', () => {
            const wrapper = shallow(<CalculatorState>{() => <div>Calculator</div>}</CalculatorState>);
            wrapper.setState({
                operand1: '1',
                operand2: '2',
                operator: '',
            });

            expect(wrapper.instance().calculateResult()).toEqual(Number.NaN);
        });
    });
});
