import React from "react";
import { View, Text } from "react-native";
import { Copyright } from "../Copyright";
import { Option } from "../Option";
import { styles } from "./styles";

import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../Widget";

interface Props{
    onFeedbackTypeChanged: (feedbackType:FeedbackType | null) => void;
}

export function Options({onFeedbackTypeChanged}:Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Deixe seu feedback
            </Text>
            <View style={styles.options}>

                {
                    Object
                    .entries(feedbackTypes)
                    .map(([key, values]) => (
                        <Option
                            key={key}
                            title={values.title}
                            image={values.image}
                            onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
                        />
                    ))
                }

            </View>

            <Copyright />
        </View>
    )
}