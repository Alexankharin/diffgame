var rightanswer;
var righ;
var initcolor = 'rgba(0,0,0,0.5)' ;
var wincolor = 'green' ;
var loosecolor = 'red' ;
var rightcolor = 'rgba(181,208,6,0.7)' ;
var difficulty = 100;
var inrow = 0;
var checker = 1;
var answnum = 1;
var top5 = 0;
rightanswer = Math.floor(Math.random() * 4 + 1);
var difflevel = 1;
var diffdict = { 0: "VERY EASY", 1: "EASY", 2: "MEDIUM", 3: "HARD", 4: "VERY HARD", 5: "IMPOSSIBLE" };
var difflevelmap = { 0: 50, 1: 100, 2: 200, 3: 300, 4: 600, 5: 1000};
function chgmode()
{
    difflevel = (difflevel + 1) % 6;
    document.getElementById('changemode').innerHTML = diffdict[difflevel];
    difficulty = difflevelmap[difflevel];
    inrow = 0;
    checker = 1;
    next();
}           
/*check win/fail*/
function ans(answ)
{
    if (checker == 0)
    {
        answnum = answ;
        if (inrow == 10)
        {
            document.getElementById('inrow').innerHTML='You win';
            inrow=0;
        }
    if (answnum == rightanswer)
        {
            inrow = inrow + 1;
            
            for (i=1; i<5; i++)
            {
                document.getElementById(i * 10).style.background = initcolor;
            }
        document.getElementById(answnum*10).style.background = wincolor;
        }
        else
        {
            inrow=0;
            for (i=1; i<5; i++)
            {
                document.getElementById(i * 10).style.background = initcolor
            }
                document.getElementById(answnum*10).style.background = loosecolor;
                document.getElementById(rightanswer*10).style.background = rightcolor;             
        }
    document.getElementById('inrow').innerHTML = inrow;
    checker=1;
    }
}
function getTop5ind(listtosort)
{
    var top5sel = [0, 0, 0, 0, 0];
    var top5selind = [0, 0, 0, 0, 0];
    for (var i = 0; i < listtosort.length; i++)
    {
        for (var j = 0; j < top5sel.length; j++)
        {
            if (top5sel[j] < listtosort[i])
            {
                top5sel[j] = listtosort[i];
                top5selind[j] = i;
                break;
            }
        }
    }
    return top5selind
}
/*next question*/
function next()
{
    if (checker == 1)
    {
        checker = 0;
        var righn = Math.floor(Math.random() * difficulty);
        document.getElementById("img_guess").src ="1000movies/" + righn.toString()+".png";
        rightlabel = movieslist[righn];
        rightanswer = Math.floor(Math.random() * 4 + 1);
        document.getElementById(rightanswer*10).innerHTML = rightlabel;
        top5 = getTop5ind(similarity[righn].slice(0, difficulty));
        const index = top5.indexOf(righn);
        if (index > -1)
        {
            top5.splice(index, 1);
        }

        for (i = 1; i < 5; i++)
        {
            document.getElementById(i * 10).style.background = initcolor;
            if (i != rightanswer && i != 5)
            {
                document.getElementById(i * 10).innerHTML = movieslist[top5[i-1]];
            }
        }
    }
}
function Startapp()
{
    next();
      document.getElementById('next').style.display = 'block';
      document.getElementById('startap').style.display = 'none';
}