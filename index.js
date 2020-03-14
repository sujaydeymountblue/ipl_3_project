const {Client}=require('pg');
const fs=require('fs')
const matches='./matches.csv'
const deliveries='./deliveries.csv'
const csv=require('csvtojson')


const client=new Client({
    username:"postgres",
    password:"postgres",
    host:"localhost",
    port:5432,
    database:"postgres"

})

client.connect()
.then(()=>console.log("connected succesfully"))
.then(()=>client.query("select season,count(team1) from matches group by season order by season asc;"))
.then(()=>client.query("select season,winner,count(winner) from matches group by season,winner order by season;"))
.then(()=>client.query("select a.batting_team,sum(a.extra_runs) from deliveries as a join (select id from matches where season=2016) as b on a.match_id=b.id group by a.batting_team;"))
.then(()=>client.query("select a.bowler,sum(a.extra_runs)+sum(wide_runs)+sum(noball_runs)+sum(penalty_runs)/(sum(a.over)/6) as Economy_Bowler from deliveries as a join (select id from matches where season=2015) as b on a.match_id=b.id group by a.bowler order by Economy_Bowler;"))
.then((message)=>console.table(message.rows))
.catch(e=>console.log(e))
.finally(()=>client.end())




// convertIntoFormatFile=((data)=>{
//     let result1=data;
//     var data1 = JSON.stringify(result1);
//     console.log(data1);
//     return data1;

// });



// csv().fromFile(matches).then((match)=>{
//     for(let i=0 ; i < match.length ; i++){
//         for(let j in match[i])
//         {
//             console.log(j)
//         }
//         console.log()
//     }


   
// });
