import React, { Component } from 'react';
import moment from 'moment';
import Day from './Day';
import DayOfWeek from './DayOfWeek';
import Week from './Week';

import './Calendar.css';

class Calendar extends Component {
    constructor(props) {
        super(props);
        
        let date = props.date;
        let month;

        if (date) {
            month = props.date;
        } else {
            month = props.month;
        }
        
        this.state = {
            date: date,
            month: month,
            event: false,
        };

        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.previousYear = this.previousYear.bind(this);
        this.nextYear = this.nextYear.bind(this)
    }

    componentDidMount() {
        moment.locale(this.props.locale);
        if (!!this.state.date) {
        this.state.date.locale(this.props.locale);
        }
        this.state.month.locale(this.props.locale);
    }

    onSelect(date, previousDate, currentMonth) {
        if (moment(date).isSame(previousDate)) {
            console.info('onSelect: false', date);
            return false;
        } else if (currentMonth.isSame(date, 'month')) {
            console.info('onSelect: true', date);
            alert(`you choose the ${date.format("dddd DD MMMM YYYY")}`)
            return true;
        } else {
            console.info('onSelect: none', date);
        }
    }
    
    handleClick(date) {
        const flag = this.onSelect(date, this.state.date, this.state.month);
        if (flag === true) {
        this.setState({
            date: moment(date),
        });
        } else if (flag === false) {
        this.setState({
            date: null,
        });
        }
    }

    previous() {
        this.setState({
            month: moment(this.state.month).subtract(1, 'month'),
        });
    }

    next() {
        this.setState({
            month: moment(this.state.month).add(1, 'month'),
        });
    }

    previousYear() {
        this.setState({
            month: moment(this.state.month).subtract(1, 'y'),
        })
    }

    nextYear() {
        this.setState({
            month: moment(this.state.month).add(1, 'y'),
        })
    }

    render() {
            const monthInFrench = (date) => {
                if(date.format('MMMM') === "January")
                    return "Janvier"
                else if (date.format('MMMM') === "February")
                    return "Février"
                else if (date.format('MMMM') === "March")
                    return "Mars"
                else if (date.format('MMMM') === "April")
                    return "Avril"
                else if (date.format('MMMM') === "May")
                    return "Mai"
                else if (date.format('MMMM') === "June")
                    return "Juin"
                else if (date.format('MMMM') === "July")
                    return "Juillet"
                else if (date.format('MMMM') === "August")
                    return "Août"
                else if (date.format('MMMM') === "September")
                    return "Septembre"
                else if (date.format('MMMM') === "October")
                    return "Octobre"
                else if (date.format('MMMM') === "November")
                    return "Novembre"
                else if (date.format('MMMM') === "December")
                    return "Décembre"
            }

            const { startOfWeekIndex, dayRenderer } = this.props;
            const classes = ['Calendar', this.props.className].join(' ');
            const today = moment();
            const {date, month, year} = this.state
            
            const current = month
            .clone()
            .startOf('month')
            .day(startOfWeekIndex);
            // don't know what is that !!!
            if (current.date() > 1 && current.date() < 7) {
                current.subtract(7, 'd');
            }

            const end = month
            .clone()
            .endOf('month')
            .day(7 + startOfWeekIndex);

            // not sure either
            if (end.date() > 7) {
            end.subtract(7, 'd');
            }

            let days = [];
            const day = current.clone();
            let elements = [];
            const daysOfWeek = [];
            let week = 1;
            let i = 1;
            for (let j = 0; j < 7; j++) {
                const dayOfWeekKey = 'dayOfWeek' + j;
                daysOfWeek.push(<DayOfWeek key={dayOfWeekKey} date={day.clone()} />);
                day.add(1, 'days');
            }
            while (current.isBefore(end)) {
                let dayClasses = this.props.dayClasses(current);
                if (!current.isSame(month, 'month')) {
                    dayClasses = dayClasses.concat(['other-month']);
                }
            let props = {
                date: current.clone(),
                selected: date,
                month: month,
                today: today,
                year: year,
                classes: dayClasses,
                handleClick: this.handleClick,
            };

            let children;
            if (!!dayRenderer) {
                children = dayRenderer(props);
            }

            days.push(
                <Day key={i++} {...props} event={this.state.event}>
                    {children}
                </Day>
            );

            current.add(1, 'days');
            if (current.day() === startOfWeekIndex) {
                let weekKey = 'week' + week++;
                elements.push(<Week key={weekKey}>{days}</Week>);
                days = [];
            }
            }

            let nav;
            nav = (
                <tr className="month-header">
                    <th className="nav previous">
                        <button className="nav-inner" onClick={this.previous} type="button">
                        «
                        </button>
                        <button className="nav-inner" onClick={this.previousYear} type="button">
                        ""
                        </button>
                    </th>
                    <th colSpan="5">
                        <span className="month">{monthInFrench(month)}</span>{' '}
                        <span className="year">{month.format('YYYY')}</span>
                    </th>
                    <th className="nav next">
                        <button className="nav-inner" onClick={this.next} type="button">
                        »
                        </button>
                        <button className="nav-inner" onClick={this.nextYear} type="button">
                        ""
                        </button>
                    </th>
                </tr>
            );

            return (
            <table className={classes}>
                <thead>{nav}</thead>
                <thead>
                    <tr className="days-header">{daysOfWeek}</tr>
                </thead>
                <tbody>{elements}</tbody>
            </table>
        );
    }
    }
    Calendar.defaultProps = {
    month: moment(),
    dayClasses: () => [],
    locale: 'fr',
    startOfWeekIndex: 1,
    };

export default Calendar;
