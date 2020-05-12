export const categoryParser = category => {
    switch (category) {
        case 1:
            return 'Путешествия'
        case 2:
            return 'Психология'
        default:
            return 'Без категории'
    }
}