function idcardValidation(idcard)
{
    if(idcard.length!=10)
        return false;
    let sum=0;
    for(let i=0;i<9;i++)
    {
        sum+=idcard.at(i)*(10-i);
    }
    if(rem>1)
        rem=11-rem;

    if(rem==idcard.at(-1))
    return true;

    return false;
}
function usernameValidation(username)
{
    // اگر فیلد خالی بود
    if (username.trim() === '')
        return false;

    // در غیر این صورت معتبر است
    return true;
}
function passwordValidation(password)
{
    // اگر فیلد خالی بود
    if (password.trim() === '')
        return false;

    // در غیر این صورت معتبر است
    return true;
}


if((`.acc-accordion`)){
    document.getElementsByClassName(`.acc-accordion .acc-accordion-title`).onclick=function(){
    document.getElementsByClassName(`.acc-accordion .acc-accordion-collapse`).slideUp();
    document.querySelector(this).parentNode().find(`.acc-accordion-collapse`).slideDown();
    }
}
//برای اجازه ندادن تایپ انگلیسی
function isPersian(text)
{
    let l=text.length;
    for(let i=0;i<l;i++)
    {
        let charCode=text.charCodeAt(i);
        if(!(charCode>=1536 && charCode<=1791))
            return false;
    }
    return true;
}
function isidcard(text) {
    let l = text.length;
    for (let i = 0; i < l; i++) {
        let charCode = text.charCodeAt(i);
        // Check if the character code is within the range of '0' to '9'
        if (!(charCode >= 48 && charCode <= 57)) {
            return false;
        }
    }
    return true;
}
function isNumber(num)
{
    let l = text.length;
    for (let i = 0; i < l; i++) 
        {
        if (!(num[i] >= 0 && num[i] <= 9)) {
            return false;
        }
    }
    return true;
}
function digit(text,to='en')
{
    let fa = [`۰`,`۱`,`۲`,`۳`,`۴`,`۵`,`۶`,`۷`,`۸`,`۹`]; 
    let en = [`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`];
    for(let i=0;i<10;i++)
    {
        let regex;
        if(to==`en`)
        {
            regex=new RegExp(fa[i],"g");
            text=text.replace(regex,en[i]);
        }
        else
        {
            regex=new RegExp(en[i],"g");
            text=text.replace(regex,fa[i]);
        }
    }
    return text;
}

function rand(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
