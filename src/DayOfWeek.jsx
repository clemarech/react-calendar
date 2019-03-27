import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DayOfWeek = ({date}) => {

    const dayInFrench = (date) =>{
        if(date.format('dddd') === "Monday")
            return "Lundi"
        else if (date.format('dddd') === "Tuesday")
            return "Mardi"
        else if (date.format('dddd') === "Wednesday")
            return "Mercredi"
        else if (date.format('dddd') === "Thursday")
            return "Jeudi"
        else if (date.format('dddd') === "Friday")
            return "Vendredi"
        else if (date.format('dddd') === "Saturday")
            return "Samedi"
        else if (date.format('dddd') === "Sunday")
        return "Dimanche"
        }

    return (
        <th className="DayOfWeek">
            {dayInFrench(date)}
        </th>
    );
    }

    DayOfWeek.propTypes = {
    date: PropTypes.instanceOf(moment).isRequired,
    format: PropTypes.string,
};

export default DayOfWeek;
