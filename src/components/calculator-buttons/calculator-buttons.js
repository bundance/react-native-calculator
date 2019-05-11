import React from "react";
import { View, Text, TouchableNativeFeedback } from 'react-native';
import Styled from "styled-components";

const ButtonsContainer = Styled.View`
    alignItems: flex-start;
    flexDirection: row;
    flexWrap: wrap;
    width: 400px;
`;

const CalculatorButton = Styled(View)`
    backgroundColor: #3A4654;
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

// background: linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%);
// border: 0;
// border-radius: 0 !important;
// box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);


// alignItems: flex-start;
// border: 1px;
// borderColor: #000000;
// flex: 0;

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
                <CalculatorButton id={`id${button.id || button.name}`} width={button.width || 1} >
                    <CalculatorKey>{button.name}</CalculatorKey>
                </CalculatorButton>
            </TouchableNativeFeedback>
        )}
    </ButtonsContainer>
);