import React from "react";

interface IDate {
    date: string | typeof Date;
}

const formatDate = (date: string | typeof Date) => {
    return date.toString().replaceAll(' ', '/')
}

const MyDate: React.FC<IDate> = (props: IDate) => {
    const date = props.date;

    return (
        <div className={'text-2xl italic'}>{formatDate(date.toString())}</div>
    )
}


export default MyDate