import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { GenerateKeyView } from "./modalViews/GenerateKeyView";

interface GenerateKeyModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function GenerateKeyModal({ modalVisible, setModalVisible }: GenerateKeyModalProps) {
    const bgColor = useThemeColor({}, "background");
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    if (modalVisible) {
        bottomSheetModalRef.current?.present();
    }

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setModalVisible(false);
        }
    }, []);
    return (
        <>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor: bgColor,
                }}
                snapPoints={["90%"]}
                enableDynamicSizing={false}
            >
                <BottomSheetView style={[styles.view, { backgroundColor: bgColor }]}>
                    <GenerateKeyView setModalVisible={setModalVisible} />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
}
const styles = StyleSheet.create({
    view: {
        margin: 10,
    },
});
