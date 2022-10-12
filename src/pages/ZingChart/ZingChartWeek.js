import classNames from 'classnames/bind';
import styles from './ZingChartWeek.mudulo.scss';
import { useEffect, useState } from 'react';
import { getChartHomeAPI, useGetChartHome } from '@/services/ChartService';
import _ from 'lodash';
import MediaList from '@/components/MediaList/MediaList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/features/Song/SongSlice';

const cx = classNames.bind(styles);

function ZingChartWeek() {
    let [weekChart, setWeekChart] = useState({});
    let [country, setCountry] = useState('vn');

    let params = useParams();
    let slug = params.slug.slice(8);
    let dispatch = useDispatch();

    let { chartHome } = useGetChartHome();

    useEffect(() => {
        dispatch(setIsLoading(true));

        if (chartHome?.err === 0) {
            setWeekChart(chartHome.data.weekChart);
            dispatch(setIsLoading(false));
        }
    }, [dispatch, chartHome]);

    console.log('re-render');

    useEffect(() => {
        if (slug === 'US-UK') {
            setCountry('us');
        } else if (slug === 'KPop') {
            setCountry('korea');
        }
    }, [slug]);

    useEffect(() => {
        let elementActive = document.querySelector(`.${country}`);
        if (elementActive) {
            elementActive.classList.add('active');
        }
    });

    let handleCategory = (country, e) => {
        setCountry(country);
        let elementActive = document.querySelector('.active');
        elementActive.classList.remove('active');
        e.target.classList.add('active');
    };

    return (
        <>
            <div className={cx('week-chart-wrapper')}>
                <div className={cx('week-chart-alpha')}>
                    <div className={cx('week-chart-header')}>
                        <span>Bảng xếp hạng tuần</span>
                        <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                    </div>

                    <div className={cx('category-box')}>
                        {!_.isEmpty(weekChart) && (
                            <Link
                                to={weekChart.vn.link}
                                className={cx('category-item', 'vn')}
                                onClick={(e) => handleCategory('vn', e)}
                            >
                                Việt Nam
                            </Link>
                        )}
                        {!_.isEmpty(weekChart) && (
                            <Link
                                to={weekChart.us.link}
                                className={cx('category-item', 'us')}
                                onClick={(e) => handleCategory('us', e)}
                            >
                                US-UK
                            </Link>
                        )}
                        {!_.isEmpty(weekChart) && (
                            <Link
                                to={weekChart.korea.link}
                                className={cx('category-item', 'korea')}
                                onClick={(e) => handleCategory('korea', e)}
                            >
                                K-POP
                            </Link>
                        )}
                    </div>

                    {!_.isEmpty(weekChart) && <MediaList data={weekChart[country].items} type="rank" />}
                </div>
            </div>
        </>
    );
}

export default ZingChartWeek;
