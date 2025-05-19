import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { CreateServerView } from "./modalViews/CreateServerView";

interface ServerModalProps {
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
    refresh: () => void;
}

export function CreateServerModal({ modalVisible, setModalVisible, refresh }: ServerModalProps) {
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
                    <CreateServerView refresh={refresh} setModalVisible={setModalVisible} />
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
