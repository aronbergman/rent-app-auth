import React from 'react';
import classes from './Loader.module.scss'

const cls = [classes.loader, classes.loader4]

export default () => (
    <div className={cls.join(' ')}>
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div>&nbsp;</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
