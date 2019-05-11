import React from 'react';
import { mount, shallow } from 'enzyme/build'
import { Calculator } from './calculator';

// Integration tests to ensure the calculator calculates correctly when controlled by the UI
describe('calculator', () => {
    it('should render and match snapshots', () => {
        const tree = shallow(<Calculator />);
        expect(tree).toMatchSnapshot();
    });

    it('should change the display when a number button is clicked', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');
        wrap.find('button#id2').simulate('click');
        expect(wrap.state('display')).toEqual('2');
    });

    it('should add new digits to the right of the display when number buttons are continually clicked', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id2').simulate('click');
        wrap.find('button#id7').simulate('click');
        wrap.find('button#id5').simulate('click');
        wrap.find('button#id9').simulate('click');
        wrap.find('button#id8').simulate('click');
        expect(wrap.state('display')).toEqual('27598');
    });


    it('should add two numbers together', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id2').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id3').simulate('click');
        wrap.find('button#idequals').simulate('click');
        expect(wrap.state('display')).toEqual('5');
    });

    it('should subtract two numbers', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id5').simulate('click');
        wrap.find('button#idminus').simulate('click');
        wrap.find('button#id2').simulate('click');
        wrap.find('button#idequals').simulate('click');
        expect(wrap.state('display')).toEqual('3');
    });

    it('should multiply two numbers together', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id2').simulate('click');
        wrap.find('button#idX').simulate('click');
        wrap.find('button#id3').simulate('click');
        wrap.find('button#idequals').simulate('click');
        expect(wrap.state('display')).toEqual('6');
    });

    it('should divide two numbers', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id8').simulate('click');
        wrap.find('button#iddivide').simulate('click');
        wrap.find('button#id4').simulate('click');
        wrap.find('button#idequals').simulate('click');
        expect(wrap.state('display')).toEqual('2');
    });

    // To Do
    it.skip('should calculate a set percentage of a number', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        // Test 50% of 8
        wrap.find('button#id5').simulate('click');
        wrap.find('button#id0').simulate('click');
        wrap.find('button#idpercent').simulate('click');
        wrap.find('button#id8').simulate('click');
        wrap.find('button#idequals').simulate('click');

        expect(wrap.state('display')).toEqual('4');
    });

    it('should handle multiple numbers separated by operators', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id1').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id2').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id3').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id4').simulate('click');
        wrap.find('button#idequals').simulate('click');

        expect(wrap.state('display')).toEqual('10');
    });

    it('should display ERROR when a NaN result is produced', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        wrap.find('button#id1').simulate('click');
        wrap.find('button#iddivide').simulate('click');
        wrap.find('button#id0').simulate('click');
        wrap.find('button#idequals').simulate('click');
        wrap.find('button#idX').simulate('click');
        wrap.find('button#id3').simulate('click');
        wrap.find('button#idequals').simulate('click');

        expect(wrap.state('display')).toEqual('ERROR');
    });

    it('should reset the operands, operator and display state when Clear All (C) button is pressed', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '0', operator: '', operand2: '0', display: '0' }));

        wrap.find('button#id1').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id2').simulate('click');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '1', operator: '+', operand2: '2', display: '2' }));
        wrap.find('button#idC').simulate('click');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '0', operator: '', operand2: '0', display: '0' }));
    });

    it('should reset operand1 when CE button is pressed', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '0', operator: '', operand2: '0', display: '0' }));

        wrap.find('button#id1').simulate('click');
        wrap.find('button#idCE').simulate('click');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '0', operator: '', operand2: '0', display: '0' }));
    });

    it('should reset operand2 when CE button is pressed', () => {
        const wrap = mount(<Calculator />).find('CalculatorState');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '0', operator: '', operand2: '0', display: '0' }));

        wrap.find('button#id1').simulate('click');
        wrap.find('button#idplus').simulate('click');
        wrap.find('button#id2').simulate('click');
        wrap.find('button#idCE').simulate('click');

        expect(wrap.state()).toEqual(expect.objectContaining({ operand1: '1', operator: '+', operand2: '0', display: '0' }));
    });
});