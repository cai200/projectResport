
/* eslint-disable */
require('script-loader!file-saver');
// require('script-loader!src/vendor/Blob');
require('script-loader!../../assets/js/Blob');
require('script-loader!xlsx/dist/xlsx.core.min');

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      cell.color="red"
      var colspan = Number(cell.getAttribute('colspan'));
      var rowspan = Number(cell.getAttribute('rowspan'));

      var cellValue = cell.innerText;
      console.log(colspan,rowspan,cellValue )
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        console.log(range.s.r,range.e.r,range.s.c, range.e.c)
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);

        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        console.log(outRow.length)
        ranges.push(
          {s: {r: R, c: outRow.length}, //s开始，e结束
            e: {r: R + Number(rowspan) - 1, c: outRow.length + Number(colspan) - 1}});
      }
      ;

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan) for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  // ranges = [{
  //   s:{c:1,r:0},
  //   e:{c:2,r:0}
  // },
  //   {
  //     s:{c:0,r:0},
  //     e:{c:0,r:1}
  //   },
  // ]
  // ranges=[];
  // for (var R = 0; R < rows.length; ++R) {
  //   var row = rows[R];
  //   var columns = row.querySelectorAll('td');
  //   for (var C = 0; C < columns.length; ++C) {
  //     var cell = columns[C];
  //     var colspan = cell.getAttribute('colspan');
  //     var rowspan = cell.getAttribute('rowspan');
  //     console.log(colspan,rowspan)
  //   if (colspan!==null&&rowspan==null){
  //     ranges.push({
  //         s:{c:C,r:R},
  //         e:{c:Number(colspan),r:R}
  //     })
  //   }else if (rowspan!==null&&colspan==null) {
  //     ranges.push({
  //       s:{c:C,r:R},
  //       e:{c:C,r:Number(rowspan)-1}
  //     })
  //   }
  //   }
  // }
  console.log(ranges)
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      //数据逐行填充R代表行，C代表列，cell则表示某个单元格值
      var cell = {v: data[R][C]};
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      }
      else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  // s.forEach((item,i)=>{
  //
  // })
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

export function export_table_to_excel(id) {
  var theTable = document.querySelector('#'+id+'');
  console.log('a')
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";
  console.log(data);

  var wb = new Workbook(), ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});

  saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "test.xlsx")
}

// function formatJson(jsonData) {
//   console.log(jsonData)
// };
/*配合集成一张表的算法改造：formatJson*/
function formatJson(filterVal, jsonData) {
  let y=[];
  jsonData.forEach((item)=>{
    let  h=[]
    for (let k in item) {
      h.push(item[k])
    }
    y.push(h)

  })
  return y
}
//valData=[{filterVal:[字段中文名..],tableData:[{},{}],tHeader:[字段名..]}]
export function export_json_to_excel(valData,xlsName, defaultTitle) {
/*
算法改造：
*/
  let jsonData=[];
  let th=[]
  //let val=this.alldx
  for (let i=0;i<valData.length;i++){
    jsonData.push(formatJson(valData[i].filterVal, valData[i].tableData))
    th.push(valData[i].tHeader)
  }

let wbout;
let wb = new Workbook();
jsonData.forEach((item,i)=>{
  let j=[];
  item.forEach((n,l)=>{
    j.push(n)
  })
  //再次赋值给j属于数据复制，如果直接将item[i]赋值给data，会造成源数据的污染
//data:[[字段]，[值]]
  let data = j
  //向开头加数据
  data.unshift(th[i]);
  var ws_name = xlsName[i]||(xlsName.length<valData.length?'无名'+i+'':alert("表名过多"));
  console.log(j)
  console.log(data)
   var ws = sheet_from_array_of_arrays(data);
  //表名
  wb.SheetNames.push(ws_name);
  //对应表数据填充
  //console.log(ws)
  //var xs=XLSX.w;
  wb.Sheets[ws_name] = ws;
  XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})
if (i ==jsonData.length-1){
  wbout=XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'})
}


})

/*
 var data = jsonData;
  //向开头加数据
  data.unshift(th);
  var ws_name = "SheetJS";
   console.log(data)
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  //表名
  wb.SheetNames.push(ws_name);
  //对应表数据填充
  console.log(ws)
  //var xs=XLSX.w;

  wb.Sheets[ws_name] = ws;
  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});*/
 // console.log(wbout)
  var title = defaultTitle || '列表'
  saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), title + ".xlsx")
}
