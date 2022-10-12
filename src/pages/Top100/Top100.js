import classNames from 'classnames/bind';
import styles from './Top100.modulo.scss';
import { useEffect, useState } from 'react';
import Carousel from '@/components/Carousel/Carousel';

import { getTop100API, useGetTop100 } from '@/services/Top100Service';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

let cx = classNames.bind(styles);

function Top100() {
    let [top100, setTop100] = useState([]);
    let dispatch = useDispatch();

    let { Top100 } = useGetTop100();

    useEffect(() => {
        dispatch(setIsLoading(true));

        if (Top100?.err === 0) {
            setTop100(Top100.data);
            dispatch(setIsLoading(false));
        }
    }, [Top100, dispatch]);

    return (
        <>
            <div className={cx('wrapper-top100')}>
                {top100 &&
                    top100.map((item) => {
                        return <Carousel title={item.title} playlistSlider={item.items} />;
                    })}
            </div>
        </>
    );
}

export default Top100;
