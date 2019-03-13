export function ReadStocks () {
  let name = 'stocks=';
  let decodedCookie = decodeURIComponent(document.cookie);//get all cookies
  let ca = decodedCookie.split(';');//split by ;
  for(let i = 0 ; i < ca.length ; i++){//search each cookie
    let cookie = ca[i];
    while (cookie.charAt(0) === ' '){
      cookie = cookie.substring(1);
    }
    if(cookie.indexOf(name) === 0){//if found return cookie
      return JSON.parse(cookie.substring(name.length, cookie.length));
    }
  }
  return ['F', 'SBUX', 'ATVI'];//else return default stocks
}

export function SaveStocks (stocks) {
  let date = new Date();
  date.setTime(date.getTime() + (7*24*60*60*1000));//expiration set 7 days from creation time
  let expire = 'expires=' + date.toUTCString();//format expires string

  document.cookie = 'stocks=' + JSON.stringify(stocks) + ';' + expire + ';path=/';//create cookie
}