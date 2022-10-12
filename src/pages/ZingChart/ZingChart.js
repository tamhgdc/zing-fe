import MediaList from '@/components/MediaList/MediaList';
import WeekChart from '@/components/WeekChart/WeekChart';
import { options } from '@/config/ConfigChart';
import { setIsLoading } from '@/features/Song/SongSlice';
import { useGetChartHome } from '@/services/ChartService';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart, registerables } from 'chart.js';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './ZingChart.modulo.scss';

const cx = classNames.bind(styles);
Chart.register(...registerables);

function ZingChart() {
    let [chart, setChart] = useState({});
    let [weekChart, setWeekChart] = useState({});
    let [items, setItems] = useState([]);
    let [showTop100, setShowTop100] = useState(false);
    let dispatch = useDispatch();

    let labels = [];
    let counter1 = [];
    let counter2 = [];
    let counter3 = [];
    let data = {};
    let playlist = [];

    let { chartHome } = useGetChartHome();

    useEffect(() => {
        dispatch(setIsLoading(true));
        if (chartHome?.err === 0) {
            setItems(chartHome.data.RTChart.items);
            setChart(chartHome.data.RTChart.chart);
            setWeekChart(chartHome.data.weekChart);
            dispatch(setIsLoading(false));
        }
    }, [chartHome, dispatch]);

    let handleTimes = (times) => {
        let labels = [];
        times.forEach((item, index) => {
            if (index % 2 === 0 && index < 23) {
                labels.push(item.hour + ':00');
            }
        });
        return labels;
    };

    let handleCounter = (items, encodeId) => {
        let counters = [];
        items[encodeId].forEach((item, index) => {
            if (index % 2 === 0 && index < 24) {
                counters.push(item.counter);
            }
        });
        return counters;
    };

    const handleChart = () => {
        if (!_.isEmpty(chart) && items) {
            options.scales.y.min = chart.minScore;
            options.scales.y.max = chart.maxScore;

            labels = handleTimes(chart.times);
            counter1 = handleCounter(chart.items, items[0].encodeId);
            counter2 = handleCounter(chart.items, items[1].encodeId);
            counter3 = handleCounter(chart.items, items[2].encodeId);

            data = {
                labels,
                datasets: [
                    {
                        label: items[0].title,
                        data: counter1,
                        backgroundColor: 'rgb(74,144,226)',
                        borderColor: 'rgb(74,144,226)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(74,144,226)',
                        pointHoverBackgroundColor: 'rgb(74,144,226)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        pointHitRadius: 8,
                        radius: 5,
                        pointHoverRadius: 8,
                        showPoint: false,
                    },

                    {
                        label: items[1].title,
                        data: counter2,
                        backgroundColor: 'rgb(39, 189, 156)',
                        borderColor: 'rgb(39, 189, 156)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(39, 189, 156)',
                        pointHoverBackgroundColor: 'rgb(39, 189, 156)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        radius: 5,
                        pointHoverRadius: 8,
                    },

                    {
                        label: items[2].title,
                        data: counter3,
                        backgroundColor: 'rgb(227, 80, 80)',
                        borderColor: 'rgb(227, 80, 80)',
                        borderWidth: 2,
                        tension: 0.3,
                        pointStyle: 'circle',
                        pointBackgroundColor: 'white',
                        pointBorderColor: 'rgb(227, 80, 80)',
                        pointHoverBackgroundColor: 'rgb(227, 80, 80)',
                        pointHoverBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointHoverBorderWidth: 3,
                        radius: 5,
                        pointHoverRadius: 8,
                    },
                ],
            };

            playlist = showTop100 ? items : items.slice(0, 10);
        }
    };

    handleChart();
    return (
        <>
            <div className={cx('wrapper-chart')}>
                <div className={cx('line-chart-wrapper')}>
                    <div className={cx('chart-header')}>
                        <span>#zingchart</span>
                        <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                    </div>

                    <div className={cx('line-chart')}>{!_.isEmpty(data) && <Line options={options} data={data} />}</div>
                </div>

                {playlist && <MediaList data={playlist} type="rank" />}

                <div className={cx('zingchart-showtop')} onClick={() => setShowTop100(!showTop100)}>
                    <div className={cx('show-more')}>{showTop100 ? 'Xem top 10' : 'Xem top 100'}</div>
                </div>
            </div>

            {!_.isEmpty(weekChart) && (
                <div className={cx('wrapper-weektop')}>
                    <div className={cx('bg-alpha')}>
                        <div className={cx('section-header')}>
                            <Link to={weekChart.vn.link}>Bảng xếp hạng tuần</Link>
                        </div>

                        <div className={cx('week-chart-box')}>
                            <div className={cx('week-chart-item')}>
                                <div className={cx('header-item')}>
                                    <Link to={weekChart.vn.link}>Việt Nam</Link>
                                    <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                                </div>
                                {!_.isEmpty(weekChart) && (
                                    <WeekChart data={weekChart.vn.items.slice(0, 5)} type="rank" />
                                )}
                                <div className={cx('weekchart-footer')}>
                                    <Link to={weekChart.vn.link} className="show-more">
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>

                            <div className={cx('week-chart-item')}>
                                <div className={cx('header-item')}>
                                    <Link to={weekChart.us.link}>US-UK</Link>
                                    <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                                </div>
                                {!_.isEmpty(weekChart) && (
                                    <WeekChart data={weekChart.us.items.slice(0, 5)} type="rank" />
                                )}
                                <div className={cx('weekchart-footer')}>
                                    <Link to={weekChart.us.link} className="show-more">
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>

                            <div className={cx('week-chart-item')}>
                                <div className={cx('header-item')}>
                                    <Link to={weekChart.korea.link}>K-POP</Link>
                                    <FontAwesomeIcon icon={faCirclePlay} className="icon-play" />
                                </div>
                                {!_.isEmpty(weekChart) && (
                                    <WeekChart data={weekChart.korea.items.slice(0, 5)} type="rank" />
                                )}
                                <div className={cx('weekchart-footer')}>
                                    <Link to={weekChart.korea.link} className="show-more">
                                        Xem thêm
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ZingChart;
