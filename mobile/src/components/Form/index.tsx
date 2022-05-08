import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';

import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { captureScreen } from 'react-native-view-shot'
import * as FileSystem from 'expo-file-system'

import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';

import { styles } from './styles';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSend: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend }: Props) {

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    const [comment, setComment] = useState("");
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string | null>(null);


    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
            .then(uri => { setScreenshot(uri) })
            .catch(error => console.log(error))
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return
        }
        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot,{encoding:'base64'})

        try {
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: `data:image/png;base64, ${screenshotBase64}`,
                comment
            });
            onFeedbackSend();

        } catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft
                        weight='bold'
                        size={24}
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>

                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />

                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>

                </View>

            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder='Algo não está ocorrendo bem? Queremos corrigir. Conte com detalhes o que está acontecendo...'
                placeholderTextColor={theme.colors.text_secondary}
                autoCorrect={false}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton
                    onTakeShot={handleScreenshot}
                    onRemoveShot={handleScreenshotRemove}
                    screenshot={screenshot}
                />
                <Button isLoading={isSendingFeedback} onPress={handleSendFeedback} />
            </View>
        </View>

    );
}