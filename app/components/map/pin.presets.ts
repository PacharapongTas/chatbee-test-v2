export const pinPresets = {
    myPin: {
        radius: 6,
        bottomMargin: 18,
        shouldShowBorder: true
    },
    friendPin: {
        radius: 4,
        bottomMargin: 12,
        shouldShowBorder: false
    }
}


export type PinPresetNames = keyof typeof pinPresets