import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageAnalysis from '../components/ImageAnalysis';
import { colors } from '../constants/colors';
import { primaryShadow, secondaryShadow } from '../constants/shadows';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const iconNames = ['home', 'calendar', 'add', 'rose-outline', 'person']; // Add more icon names as needed

    const slideUp = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1200, 0],
    });

    const TabBarContainer = () => {
        const insets = useSafeAreaInsets();

        return (
            <View style={[styles.container, { paddingBottom: insets.bottom, height: 50 + insets.bottom }]}>
                {state.routes.map((route: { key: string; name: string; }, index: number) => {
                    const { options } = descriptors[route.key];
                    let label: string | undefined;

                    if (typeof options.tabBarLabel === 'function') {
                        const isFocused = state.index === index;
                        const color = isFocused ? colors.primary : colors.secondary;
                        const result = options.tabBarLabel({
                            focused: isFocused, color,
                            position: 'beside-icon',
                            children: ''
                        });
                        label = typeof result === 'string' ? result : undefined;
                    } else {
                        label = options.tabBarLabel || options.title || route.name;
                    }

                    const isFocused = state.index === index;

                    const onPress = () => {
                        if (route.name === 'ADD') {
                            setModalVisible(true);
                            slideUp();
                        } else {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        }
                    };

                    const isAddButton = route.name === 'ADD';
                    const buttonStyle = isAddButton ? styles.addButton : styles.tabButton;
                    const iconName = isAddButton ? 'add-circle' : iconNames[index];

                    return (
                        <TouchableOpacity onPress={onPress} key={route.key} style={buttonStyle}>
                            <Icon name={iconName} style={isAddButton ? styles.addIcon : styles.icon} color={isAddButton ? colors.primary : (isFocused ? colors.darkerTertiary : colors.secondary)} />
                            {isAddButton ? null : <Text style={[{ color: isFocused ? colors.darkerTertiary : colors.secondary }, styles.text]}>
                                {label}
                            </Text>}
                            {isAddButton && <Text style={[{ color: colors.primary }, styles.addButtonText]}>
                                {label}
                            </Text>}
                        </TouchableOpacity>
                    );
                })}
                <Modal visible={modalVisible} transparent>
                    <Animated.View style={{ transform: [{ translateY }] }}>
                        <ImageAnalysis close={slideDown} />
                    </Animated.View>
                </Modal>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...secondaryShadow,
        },
        tabButton: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        addButton: {
            width: 70,
            height: 70,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            backgroundColor: colors.darkerTertiary,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
            marginRight: 8,
            color: colors.primary,
            ...primaryShadow,
            paddingBottom: 4,
        },
        icon: {
            fontSize: 30,
        },
        addIcon: {
            fontSize: 40,
        },
        text: {
            fontSize: 10,
        },
        addButtonText: {
            fontSize: 10,
            fontWeight: 'bold',
        },
    });

    return <TabBarContainer />;
}