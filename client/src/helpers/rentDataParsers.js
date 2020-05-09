export const renovationParser = renovation => {
    switch (renovation) {
        case '0':
            return '📦 Голые стены'
        case '1':
            return '👵 Бабушкин'
        case '2':
            return '🛏 Косметический'
        case '3':
            return '🛋 Евроремонт'
        case '4':
            return 'Срем в кухне'
        default:
            return '–'
    }
}

export const cityParser = city => {
    switch (city) {
        case 77:
            return 'Москва'
        case 78:
            return 'Санкт-Петербург'
        case 66:
            return 'Екатеринбург'
        default:
            return 'не указан'
    }
}