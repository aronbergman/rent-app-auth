import React from "react";
import {dateParser} from "./dateParser";

export const parseAds = (data) => {
    const {ads} = data
    let parseAds = []

    if (ads) {
        ads.map(ad => adParser(ad, true))
        return {
            ads: parseAds,
            count: data.count ? data.count : null
        }
    } else {
        return adParser(data, false)
    }

    function adParser(ad, many) {
        const parseAd = {
            ...ad,
            city: +ad.city,
            typeOfApplicant: +ad.typeOfApplicant,
            images: many ? JSON.parse(ad.images) : ad.images,
            updatedAt: dateParser(ad.updatedAt),
            createdAt: dateParser(ad.createdAt)
        }

        if (ad.metroStations) {
            const stations = JSON.parse(ad.metroStations)
            const all = []
            for (let i = 0; i < stations.length; i++) {
                let parseColor = stations[i].split('|')
                all.push({name: parseColor[0], color: parseColor[1]})
            }
            parseAd.metroStations = all
        }

        if (ad.distanceMetro) {
            parseAd.distanceMetro = parseDistanceMetro(ad.distanceMetro)
        }

        if (ad.renovation) {
            parseAd.renovation = renovationParser(ad.renovation)
        }

        if (ad.infrastructure) {
            parseAd.infrastructure = infrastructureParcer(ad.infrastructure)
        }

        if (ad.price) {
            parseAd.price = ad.price.toLocaleString('ru')
        }

        if (many) {
            parseAds.push(parseAd)
        } else {
            return parseAd
        }
    }
}

export const RENOVATION_0 = '📦 Голые стены'
export const RENOVATION_1 = '👵 Бабушкин'
export const RENOVATION_2 = '🛏 Косметический'
export const RENOVATION_3 = '🛋 Евроремонт'
export const RENOVATION_4 = 'Срем в кухне'

export const renovationParser = renovation => {
    switch (renovation) {
        case '0':
            return RENOVATION_0
        case '1':
            return RENOVATION_1
        case '2':
            return RENOVATION_2
        case '3':
            return RENOVATION_3
        case '4':
            return RENOVATION_4
        default:
            return '–'
    }
}

export const CITY_77 = 'в Москве'
export const CITY_78 = 'в Санкт-Петербурге'
export const CITY_66 = 'в Екатеринбурге'

export const cityParser = city => {
    switch (city) {
        case '77':
            return CITY_77
        case '78':
            return CITY_78
        case '66':
            return CITY_66
        default:
            return 'не указан'
    }
}

export const INFRASTRUCTURE_A = 'Спортзал, качалка'
export const INFRASTRUCTURE_B = 'Продукты и тд'
export const INFRASTRUCTURE_C = 'Торговый центр'
export const INFRASTRUCTURE_D = 'Парк'
export const INFRASTRUCTURE_E = 'Футбольное поле'
export const INFRASTRUCTURE_F = 'Тихое место'

export const infrastructureParcer = infrastructure => {
    const infrastructures = [];

    JSON.parse(infrastructure).map(infra => {
        switch (infra) {
            case 'A':
                infrastructures.push(INFRASTRUCTURE_A)
                break
            case 'B':
                infrastructures.push(INFRASTRUCTURE_B)
                break
            case 'C':
                infrastructures.push(INFRASTRUCTURE_C)
                break
            case 'D':
                infrastructures.push(INFRASTRUCTURE_D)
                break
            case 'E':
                infrastructures.push(INFRASTRUCTURE_E)
                break
            case 'F':
                infrastructures.push(INFRASTRUCTURE_F)
                break
            default:
                return ''
        }
    })
    return infrastructures
}

export const DISTANCE_TO_METRO_1 = '100 метров (у дома)'
export const DISTANCE_TO_METRO_2 = '300 метров (в моем квартале)'
export const DISTANCE_TO_METRO_3 = '500 метров (в соседнем квартале)'
export const DISTANCE_TO_METRO_4 = '1 км (10 минут пешком)'
export const DISTANCE_TO_METRO_5 = '2 км (пара остановок)'
export const DISTANCE_TO_METRO_6 = 'более 2 км (дохрена далеко)'

export const parseDistanceMetro = distanceMetro => {
    switch (distanceMetro) {
        case 1:
            return DISTANCE_TO_METRO_1
        case 2:
            return DISTANCE_TO_METRO_2
        case 3:
            return DISTANCE_TO_METRO_3
        case 4:
            return DISTANCE_TO_METRO_4
        case 5:
            return DISTANCE_TO_METRO_5
        case 6:
            return DISTANCE_TO_METRO_6
        default:
            return ''
    }
}