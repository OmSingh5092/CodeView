const monthShort = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sept","Oct","Nov","Dec"];
const dayShort = ["Sun","Mon","Tues","Wed","Thur","Fri","Sat"];
const dayLong = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


export const parseDate = (dateISO)=>{
    var date = new Date(dateISO);

    var hour = date.getHours()+1;
    var minute = (date.getMinutes()+1)%60;
    var format =  date.getDate() + " " + monthShort[date.getMonth()] + " " + date.getFullYear() + " / "+ hour+":"+minute;
    return format;
} 

export const dayAndTime = (dateISO)=>{
    var date = new Date(dateISO);
    var format = dayShort[date.getDay()]+", " + date.getHours();
    return format;
}

export const getPresent = (arg)=>{
    const date = new Date();

    if(arg == 'day'){
        return date.getDay()
    }if(arg == 'iso'){
        return date.toISOString();
    }
}

export const getLongDays = ()=>{
    return dayLong;
}

