import React from 'react'
import { useRef, useState } from 'react'
import { ChatTeardropDots } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'

import BottomSheet from '@gorhom/bottom-sheet'


import { theme } from '../../theme'
import { styles } from './styles'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { Options } from '../Options'
import { Form } from '../Form'
import { Success } from '../Success'

export type FeedbackType = keyof typeof feedbackTypes;

export function Widget() {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

    function handleOpen() {
        bottomSheetRef.current?.expand();
    }

    function handleRestartFeedback(){
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    function handleFeedbackSent(){
        setFeedbackSent(true);
    }


    return (
        <>
            <TouchableOpacity style={styles.button} onPress={handleOpen}>
                <ChatTeardropDots
                    weight='bold'
                    size={24}
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}

            >
                {
                    feedbackSent ?
                        <Success onSendAnotherFeedback={handleRestartFeedback} />
                        :
                        <>
                            {
                                feedbackType ?

                                    <Form
                                        onFeedbackSend={handleFeedbackSent}
                                        onFeedbackCanceled={handleRestartFeedback}
                                        feedbackType={feedbackType}
                                    />
                                    :
                                    <Options onFeedbackTypeChanged={setFeedbackType} />
                            }
                        </>
                }
            </BottomSheet>
        </>
    )
}



