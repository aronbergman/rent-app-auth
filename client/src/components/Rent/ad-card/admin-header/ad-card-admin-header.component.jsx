import React from 'react';
import classes from './styles.module.scss'
import dateParser from "../../../../helpers/dateParser";

const AdCardAdminHeader = ({ad}) => {
    return (
        <div className={classes.Header}>
            <div>
                <div>Создано: {dateParser(ad.createdAt)}</div>
                {ad.createdAt !== ad.updatedAt && <div>Изменено: {dateParser(ad.updatedAt)}</div>}
            </div>

            {/*TODO: Добавить удаленое и узменение объявления из админки*/}
            <div>
                <div>Изменить</div>
                <div>Удалить</div>
            </div>
        </div>
    );
};

export default AdCardAdminHeader;
