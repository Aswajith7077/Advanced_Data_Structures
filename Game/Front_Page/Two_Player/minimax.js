var map={}              // Hash-Maps for finding a free box
for(var i=1;i<=9;i++)   //Totally there are 9 free boxes at the initial stage
    map[i]='-';

function best_move()
{
    var best_score=-Infinity;
    var best_move;
    for(var i=1;i<=9;i++)
    {
        if(map[i]=='-')
        {
            map[i]=ai;
            let score=minimax(map);
            if(score > best_score)
            {
                best_score=score;
                best_move=i;
            }
        }
    }
    let element = document.getElementById("Oh")
}