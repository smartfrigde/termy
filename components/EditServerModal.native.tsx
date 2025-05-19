import type { ServerType } from "@/types/Server";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet } from "react-native";
import { EditServerView } from "./modalViews/EditServerView";

interface EditServerModalProps {
    item: ServerType;
    setModalVisible: (e: boolean) => void;
    modalVisible: boolean;
}

export function EditServerModal({ item, modalVisible, setModalVisible }: EditServerModalProps) {
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
                    backgroundColor: "#121212",
                }}
                snapPoints={["90%"]}
                enableDynamicSizing={false}
            >
                <BottomSheetView style={styles.view}>
                    <EditServerView item={item} setModalVisible={setModalVisible} />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    );
}
const styles = StyleSheet.create({
    view: {
        margin: 10,
        backgroundColor: "#121212",
    },
});
