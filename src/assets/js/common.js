function common(){

}
let g=new common()
common.prototype.setTime=function () {
  let  date=new Date();
  let  year=date.getFullYear();
  let mouth=date.getMonth()+1>=10?Number(date.getMonth()+1):"0"+Number(date.getMonth()+1);
  let day=date.getDate()>=10?date.getDate():"0"+date.getDate();
  let hour=date.getHours()>=10?date.getHours():"0"+date.getHours();
  let min=date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
  let sco=date.getSeconds()>=10?date.getSeconds():"0"+date.getSeconds()
  return year+"-"+mouth+"-"+day+" "+hour+":"+min+":"+sco
}

common.prototype.setXueh=()=> {
  let i=0
     let time=setInterval(()=>{
       let k=(Math.random()*10000).toFixed(0)
       let left=(Math.random()*Number($(window).width()-50)).toFixed(0)
      // console.log(k, left)
       $("body").append(
         '<div class="x'+k+'"/>')
       $('.x'+k+'').css({
         "position":"absolute",
         "z-index":"9999",
         "border-radius":"3px",
         "top":"0px",
         "width":"6px",
         "height":"6px",
         "left":''+left+'px',
         'background':"#fff"
       })
       $('.x'+k+'').animate({
         "top":''+Number($(window).height()-30)+'px',

       },6000,"linear",()=>{
         $('.x'+k+'').remove()
       })

       if (i>=1000){
         i = 0;
         clearInterval(time);
         g.setXueh();
       }
       i++

     },500)

}
common.prototype.dateDiffer1 =(sDate1,  sDate2)=> {
  let  iDays  = (( Date.parse(sDate1) -  Date.parse(sDate2))/  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
  return  iDays+1
}
export  default g;
