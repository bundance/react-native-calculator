import React from "react";
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Styled from "styled-components";
import { buttonTypes } from '../../constants/button-types';

const buttonColourLookupTable = {
    [buttonTypes.OPERATOR]: '#232B35',
    [buttonTypes.OPERAND]: '#3A4654',
    [buttonTypes.CONTROL]: 'red',
}

const ButtonsContainer = Styled.View`
    alignItems: flex-start;
    flexDirection: row;
    flexWrap: wrap;
    width: 400px;
`;

const CalculatorButton = Styled(View)`
    backgroundColor: ${props => buttonColourLookupTable[props.buttonType]};
    width: ${props => (100 * props.width)};
    alignSelf: center;
    height: 100;
    justifyContent: center;
    borderWidth: 1;
    borderColor: #2C3643;
`;

const CalculatorKey = Styled(Text)`
    color: white;
    fontSize: 28;
    textAlign: center;
`;

export const CalculatorButtons = ({
        buttons,
        onClick,
    }) => (
    <ButtonsContainer>
        {buttons.map(button =>
            <TouchableNativeFeedback
                key={`id${button.id || button.name}`}
                onPress={onClick(button)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <CalculatorButton id={`id${button.id || button.name}`} width={button.width || 1} buttonType={button.buttonType}>
                    <CalculatorKey>{button.name}</CalculatorKey>
                </CalculatorButton>
            </TouchableNativeFeedback>
        )}
    </ButtonsContainer>
);