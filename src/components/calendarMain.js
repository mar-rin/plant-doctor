import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import * as timeFunction from './timeFunctions';



export default function DateCalendarServerRequest({ usefulDates, pickedDate }) {

    const requestAbortController = React.useRef(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [highlightedDays, setHighlightedDays] = useState([1,2,3]);
    const initialValue = dayjs(new Date());


    useEffect(() => {
        fetchHighlightedDays(initialValue);
        return () => requestAbortController.current?.abort();
    }, []);


    function handleMonthChange(date) {
        if (requestAbortController.current) {
            requestAbortController.current.abort();
        }
        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
    };


    function fetchHighlightedDays (date) {
        const controller = new AbortController();
        fakeFetch(date, {signal: controller.signal,})
            .then(({ daysToHighlight }) => {setIsLoading(false);
            })
            .catch((error) => {
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });
        requestAbortController.current = controller;
    };

    function fakeFetch(date, { signal }) {
        /*

            April: 1681465305525
                   1681622193900
                   1682851227121
                   1682937710281
            May 1: 1682888400000
                    1618464600

            June 1: 1685566800000
            July 1: 1688158800000
            August: 1690837200000
            Sept: 1693515600000
            Oct 1696107600000
            Nov> 1698789600000
            Dec 1701381600000
            */

        const daysInMonth = date.daysInMonth();
        const day = timeFunction.timestampToDay(date);
        const daysTillEndOfMonth = daysInMonth - day;
        const endOfMonth = date + daysTillEndOfMonth*24*60*60000;

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("STill waiting...")
            }, 500);
            const timeout = setTimeout(() => {
                let daysToHighlight = [];
                const activeDatesInTimestamp = usefulDates.map(item => timeFunction.dateToUnixTimestamp(item));
                const relevantDatesInTimestamp = activeDatesInTimestamp.filter((item) => item < endOfMonth && item > date);

                const activeDatesToDays = relevantDatesInTimestamp.map(item => timeFunction.timestampToDay(item));

                daysToHighlight = activeDatesToDays.map(parseFloat);
                setHighlightedDays(daysToHighlight);
                resolve({ daysToHighlight });
            }, 500);

            signal.onabort = () => {
                clearTimeout(timeout);
                reject(new DOMException('aborted', 'AbortError'));
            };
        });
    }





    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '🟠' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    ServerDay.propTypes = {
        day: PropTypes.object.isRequired,
        highlightedDays: PropTypes.arrayOf(PropTypes.number),
        outsideCurrentMonth: PropTypes.bool.isRequired,
    };


    return (
        <div className="menu-bar" id="navBar">
            <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                <Paper elevation={5} sx={{p: '10px'}}>
                    <Grid item xs={3}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {(usefulDates.length>0) &&
                            <DateCalendar
                                onChange={pickedDate}
                                defaultValue={initialValue}
                                loading={isLoading}
                                onMonthChange={handleMonthChange}
                                renderLoading={() => <DayCalendarSkeleton />}
                                slots={{day: ServerDay}}
                                slotProps={{day: {highlightedDays},}}
                            />
                            }
                        </LocalizationProvider>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}
