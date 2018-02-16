var fs = require('fs');

var data = fs.readFileSync("ResultsHaraj.json");
var result = JSON.parse(data);
var finalresult = [];

function ConvertDate(date){
    var datenow = new Date();
    var year = datenow.getFullYear();
    var month = (datenow.getMonth()<10) ? '0'+(datenow.getMonth()+1) : (datenow.getMonth()+1);
    var day = (datenow.getDate()<10) ? '0'+datenow.getDate() : datenow.getDate();
    var hour = datenow.getHours();

    var today = year+"-"+month+"-"+day;
    var yesterday = year+"-"+month+"-"+(day-1);

    var lengthofDate = date.split(' ').length;
    var splitofDate = date.split(' ');

    /*
    قبل دقيقه
    قبل ساعه
    قبل 6 دقيقه
    */
    if(lengthofDate==2 || lengthofDate==3){
        if(splitofDate[1]=="ساعه"){
            if ((hour-1)<0)
                return yesterday;
            else
                return today;
        }
        else
            return today;
    }

    /*
    قبل ساعه و دقيقه
    قبل أسبوع و يوم
    قبل شهر و أسبوع
    قبل سنه و شهر
    */
    else if(lengthofDate==4){
        if(splitofDate[1]=="ساعه"){
            if ((hour-1)<0)
                return yesterday;
            else
                return today;
        }

        else if (lengthofDate[1]=="أسبوع" && splitofDate[3]=="يوم"){
            var NumDays= 8;
            if(day-NumDays<=0){
                var newmonth = month-1;
                var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+snewmonth+"-"+snewday;
                return newdate;
            }
            else{
                var newday = day-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate= year+"-"+month+"-"+snewday;
                return newdate;
            }
        }

        else if (splitofDate[1]=="شهر" && splitofDate[3]=="أسبوع"){
            var NumDays= 7;
            var newmonth = month-1;
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            if(day-NumDays<=0){
                var newmonth = snewmonth-1;
                var newmonth2 = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newdate = year-1+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+newmonth2+"-"+snewday;
                    return newdate;
                }
            }
            else{
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newdate = year-1+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[1]=="سنه" && splitofDate[3]=="شهر"){
            var newmonth = month-1;
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            var newdate = (year-1)+"-"+snewmonth+"-"+day;
            return newdate;
        }

        else
            return date;
    }

    /*
    قبل ساعه و 9 دقيقه
    قبل أسبوع و 2 يوم
    قبل شهر و 3 أسبوع
    قبل سنه و 2 شهر
    قبل 2 أسبوع و يوم
    */
    else if(lengthofDate==5){
        if(splitofDate[2]=="ساعه"){ 
            if ((hour-splitofDate[1])<0)
                return yesterday;
            else
                return today;
        }

        else if(splitofDate[1]=="ساعه" && splitofDate[4]=="دقيقه"){ 
            if ((hour-1)<0)
                return yesterday;
            else
                return today;
        }

        else if (splitofDate[1]=="أسبوع" && splitofDate[4]=="يوم"){
            var NumDays= 7+splitofDate[3];
            if(day-NumDays<=0){
                var newmonth = month-1;
                var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+snewmonth+"-"+snewday;
                return newdate;
            }
            else{
                var newday = day-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+month+"-"+snewday;
                return newdate;
            }
        }

        else if (splitofDate[2]=="أسبوع" && splitofDate[4]=="يوم"){
            var NumDays= 7*splitofDate[1]+1;
            if(day-NumDays<=0){
                var newmonth = month-1;
                var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+snewmonth+"-"+snewday;
                return newdate;
            }
            else{
                var newday = day-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+month+"-"+snewday;
                return newdate;
            }
        }

        else if (splitofDate[1]=="شهر" && splitofDate[4]=="أسبوع"){ 
            var NumDays= 7*splitofDate[3];
            var newmonth = month-1;
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            if(day-NumDays<=0){
                var newmonth = snewmonth-1;
                var newmonth2 = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newdate = year-1+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+newmonth2+"-"+snewday;
                    return newdate;
                }
            }
            else{
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newday = 30-NumDays;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[1]=="سنه" && splitofDate[4]=="شهر"){
            var newmonth = month-splitofDate[3];
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            var newdate = (year-1)+"-"+snewmonth+"-"+day;
            return newdate;
        }

        else
            return date;
    }

    /*
    قبل 2 ساعه و 29 دقيقه
    قبل 3 أسبوع و 4 يوم
    قبل 2 شهر و 4 أسبوع
    قبل 2 سنه و 2 شهر
    */
    else if(lengthofDate==6){
        if(splitofDate[2]=="ساعه"){
            if ((hour-splitofDate[1])<0)
                return yesterday;
            else
                return today;
        }

        else if (splitofDate[2]=="يوم" && splitofDate[5]=="ساعه"){
            var NumDays= splitofDate[1];
            if(day-NumDays<=0){
                var newmonth = month-1;
                var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+snewmonth+"-"+snewday;
                return newdate;
            }
            else{
                var newday = day-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                var newdate = year+"-"+month+"-"+snewday;
                return newdate;
            }
        }

        else if (splitofDate[2]=="أسبوع" && splitofDate[5]=="يوم"){
            var NumDays= (7*splitofDate[1])+splitofDate[4];
            if(day-NumDays<=0){
                var newmonth = month-1;
                var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newdate = year+"-"+snewmonth+"-"+(30-NumDays);
                return newdate;
            }
            else{
                var newdate = year+"-"+month+"-"+(day-NumDays);
                return newdate;
            }
        }

        else if (splitofDate[2]=="شهر" && splitofDate[5]=="أسبوع"){
            var NumDays= 7*splitofDate[4];
            var newmonth = month-splitofDate[1];
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            if(day-NumDays<=0){
                var newmonth = snewmonth-1;
                var newmonth2 = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newdate = year-1+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+newmonth2+"-"+snewday;
                    return newdate;
                }
            }
            else{
                var newday = 30-NumDays;
                var snewday = (newday<10) ? '0'+newday : newday;
                if(newmonth<=0){
                    var newmonth = 12-newmonth;
                    var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
                    var newdate = year-1+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
                else{
                    var newdate = year+"-"+snewmonth+"-"+snewday;
                    return newdate;
                }
            }
        }

        else if (splitofDate[2]=="سنه" && splitofDate[5]=="شهر"){
            var newmonth = month-splitofDate[4];
            var snewmonth = (newmonth<10) ? '0'+(newmonth) : (newmonth);
            var newdate = (year-splitofDate[1])+"-"+snewmonth+"-"+day;
            return newdate;
        }

        else
            return date;
    }

    else
        return date;
}

for(var i = 0 ; i < Object.keys(result).length; i++){

    finalresult.push({
        name: result[i].name,
        link: result[i].link,
        price: result[i].price,
        date: ConvertDate(result[i].date),
        city: result[i].city,
        section: result[i].section
        });

        fs.writeFileSync('./d-ResultsHaraj.json',JSON.stringify(finalresult));

}

