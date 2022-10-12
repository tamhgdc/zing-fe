import classNames from 'classnames/bind';
import styles from './NewReleaseChart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getNewReleaseChartAPI, useGetNewReleaseChartAPI } from '@/services/ChartService';
import MediaList from '@/components/MediaList/MediaList';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

const cx = classNames.bind(styles);

function NewReleaseChart() {
    let [newRelease, setNewRelease] = useState({});
    let [showTop100, setShowTop100] = useState(false);

    let dispatch = useDispatch();
    let playlist = [];

    let { chartNewRelease } = useGetNewReleaseChartAPI();

    useEffect(() => {
        dispatch(setIsLoading(true));
        if (chartNewRelease?.err === 0) {
            setNewRelease(chartNewRelease.data);
            dispatch(setIsLoading(false));
        }
    }, [chartNewRelease, dispatch]);

    let handlePlaylist = () => {
        if (newRelease.items) {
            let items = newRelease.items;
            playlist = showTop100 ? items : items.slice(0, 10);
        }
    };

    handlePlaylist();

    return (
        <div className={cx('new-release-wrapper')}>
            <div className={cx('new-release-header')}>
                <span>Mới phát hành</span>
                <FontAwesomeIcon icon={faCirclePlay} className={cx('icon-play')} />
            </div>

            {playlist && <MediaList data={playlist} type="rank" />}

            <div className={cx('new-release-showtop')} onClick={() => setShowTop100(!showTop100)}>
                <div className={cx('show-more')}>{showTop100 ? 'Xem top 10' : 'Xem top 100'}</div>
            </div>
        </div>
    );
}

export default NewReleaseChart;
