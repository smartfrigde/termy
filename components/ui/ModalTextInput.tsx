import isMobile from "@/constants/isMobile";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native";

export function ModalTextInput(props: React.ComponentProps<typeof TextInput>) {
    const InputComponent = isMobile() ? BottomSheetTextInput : TextInput;
    return <InputComponent {...props} />;
}
