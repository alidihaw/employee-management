export function clone(items: any): any[] {
    if (!items) {
        return items;
    }
    const newItems = JSON.parse(JSON.stringify(items));
    return newItems;
}

export function monthText(month: number) {
    const toText = ["","JANUARY", "FEBURARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    const integer = month;
    if (integer > 0 && integer < 13) {
      return toText[integer];
    } else {
      return "Invalid Selection";
    }
};
export function timeFormat(timeInSeconds: any) {
  let htmlOutput = '';
  const output = [];
  const time = [0, 0, 0];
  time[0] = Math.floor(timeInSeconds / 3600);
  time[1] = Math.floor((timeInSeconds - (time[0] * 3600)) / 60);
  time[2] = Math.floor(timeInSeconds - (time[0] * 3600) - (time[1] * 60));
  if (time[0] >= 10) {
    output.push('' + time[0] + ':');
  } else if (time[0] < 10) {
    output.push('0' + time[0] + ':');
  } else if (time[0] = 0) {
    output.push('00:');
  }
  if (time[1] >= 10) {
    output.push('' + time[1] + ':');
  } else if (time[1] < 10) {
    output.push('0' + time[1] + ':');
  } else if (time[1] = 0) {
    output.push('00:');
  }
  if (time[2] >= 10) {
    output.push('' + time[2]);
  } else if (time[2] < 10) {
    output.push('0' + time[2]);
  } else if (time[2] = 0) {
    output.push('00');
  }
  output.forEach((value) => {
    htmlOutput += '' + value;
  });
  return htmlOutput;
};
