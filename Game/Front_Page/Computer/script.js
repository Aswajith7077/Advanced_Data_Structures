
// Confirmation before reloading the page 

window.onbeforeunload=function(event)
{
    return confirm("Confirm Refresh")
}

function pause_animations()
{
    for(var i=1;i<=9;i++)
    {
        document.getElementById('XRL'+i).style.animationPlayState='paused';
        document.getElementById('XLR'+i).style.animationPlayState='paused';
        document.getElementById('circle'+i).style.animationPlayState='paused';
    }
}

function hide_elements()
{
    for(var i=1;i<=9;i++)
    {
        const X=document.getElementById("Ex"+i);
        const O=document.getElementById("Oh"+i);
        X.style.visibility='hidden';
        O.style.visibility='hidden';
    }
}

class CLLNode                  // Circular Linked List Node declaration
{
    constructor(element)
    {
        this.data=element;
        this.next=null;
    }
}

class Circular_Linked_list           // A Circular Linked List for determining the current player
{
    static count=0;
    constructor()
    {
        let node1=new CLLNode('X')
        let node2=new CLLNode('O')
        this.head=node1;
        this.head.next=node2
        node2.next=this.head
        this.current=this.head
    }
    return_not(data)
    {
        if(data=='X')
            return 'O';
        else
            return 'X';
    }
    currently_in()
    {
        return this.current.data;
    }
    reset_current()                 // A function to reset the current player to head
    {
        this.current=this.head;
    }
    update_current()                // A function to Update the current player
    {
        this.current=this.current.next;
    }
    get_current()                   // A function that returns the current player
    {
        let return_value=this.current.data;
        this.update_current();
        return return_value;
    }
}

let object=new Circular_Linked_list()        // An Object for the Circular Linked List
direction=[-4,-3,-2,-1,1,2,3,4]     

range=[]                //Generating the Range of 
for(var i=1;i<=9;i++)
    range.push(i)


var map={}              // Hash-Maps for finding a free box
for(var i=1;i<=9;i++)   //Totally there are 9 free boxes at the initial stage
    map[i]='-';

let game_over={value:false}
let game_winner={value:'-'};


var count = 0;
pause_animations();     // Calling pause animations function


var decision = function (id)        // A function that decides whether the game gets over by the current move of the player
{
    if(game_over.value==false)
    {
        const index=(id!=null)?id.charAt(id.length-1):0
        if(map[index]!=='-')
            return null;
        let current_player=object.get_current();

        if(current_player==='X')
        {
            const temp=document.getElementById("Ex"+index);
            if(temp!=null)
            {
                var audio=new Audio('resources/Audio/Tac.wav');
                audio.play();
                document.getElementById('XLR'+index).style.animationPlayState = 'running';
                document.getElementById('XRL'+index).style.animationPlayState = 'running';
                temp.style.visibility='visible';
                map[index]='X';
               
                

                
                object.update_current();
            }
            else
                console.log("Undefined!")
        }
        // else if(current_player==='O')
        // {

        //     const temp=document.getElementById("Oh"+index);
        //     if(temp!=null)
        //     {
        //         var audio=new Audio('resources/Audio/Tic.mp3');
        //         audio.play();
        //         document.getElementById('circle'+index).style.animationPlayState = 'running';
        //         temp.style.visibility='visible';
        //         map[index]='O';
        //     }
        //     else
        //         console.log("Undefined!!")
        // }
        check(game_over,game_winner);
        if(game_over.value==true)               //Announce the Winner when the game gets over
        {
            //console.log(game_winner.value);
            announce_winner(game_winner.value);
        }
    } 
};



var check=function(game_over,game_winner)        // A function to check the game is over or not
{
    for(var i=1;i<=3;i++)
    {
        if(map[i] == map[i+3] && map[i+3] == map[i+6] && map[i]=='X')
        {
            console.log("////////////////Row-wise X State!");
            console.log(map)
            game_over.value=true;
            game_winner.value='X';
            return;
        }
        else if(map[i] == map[i+3] && map[i+3] == map[i+6] && map[i]=='O')
        {
            console.log("////////////////Row-wise O State!");
            console.log(map)
            game_over.value=true;
            game_winner.value='O';
            return;
        }
    }
    var factor=0;
    for(var i=1;i<=3;i++)
    {
        if(map[1+factor] == map[factor+2] && map[factor+2] == map[factor+3] && map[factor+1]=='X')
        {
            console.log("////////////////Columnwise X State!");
            console.log(map)
            game_over.value=true;
            game_winner.value='X';
            return;
        }
        else if(map[1+factor] == map[factor+2] && map[factor+2] == map[factor+3] && map[factor+1]=='O')
        {
            console.log("////////////////Columnwise O State!");
            console.log(map)
            game_over.value=true;
            game_winner.value='O';
            return;
        }
        factor+=3;
    }
    if(map[1]==map[5] && map[5]==map[9] && map[1]=='X')
    {
        console.log("////////////////Diagonal X State!");
        console.log(map)
        game_over.value=true;
        game_winner.value='X';
        return;
    }
    if(map[1]==map[5] && map[5]==map[9] && map[1]=='O')
    {
        console.log("////////////////Diagonal O State!");
        console.log(map)
        game_over.value=true;
        game_winner.value='O';
        return;

    }
    
    if(map[7]==map[5] && map[5]==map[3] && map[7]=='X')
    {
        console.log("////////////////Diagonal Opposite X State!");
        console.log(map)
        game_over.value=true;
        game_winner.value='X';
        return;
    }
    if(map[7]==map[5] && map[5]==map[3] && map[7]=='O')
    {
        console.log("////////////////Diagonal Opposite O State!");
        console.log(map)
        game_over.value=true;
        game_winner.value='O';
        return;

    }
    var count=0;
    for(var i=1;i<=9;i++)
    {
        if(map[i]!='-')
            count++;
    }
    if(count==9)
    {
        console.log("////////////////Draw State!");
        console.log(map);
        game_over.value=true;
        game_winner.value='D';
    }
    return;
}


let announce_winner=function(value)             // A function for Announcing the winner
{
    var img_source='resources/images/';
    var winning_string;
    var comment;
  


    // function createpopup(id)
    // {
    //     let popupNode=document.querySelector(id);
    //     let dummy=popupNode.querySelector(".dummy");
    //     let close=popupNode.querySelector(".pop_up_close");

    //     function open_popup()
    //     {
    //         let gamearea=document.querySelector("#game_area");
    //         let pop=document.querySelector('#pop_up');
    //         pop.classList.add("align");
    //         gamearea.classList.add("hide");
    //         popupNode.classList.add("active");
    //     }
    //     function close_popup()
    //     {
    //         popupNode.classList.remove("active");
    //     }
    //     dummy.addEventListener("click",close_popup);
    //     close.addEventListener("click",close_popup);
    //     return open_popup();
    // }


    switch(value)
    {
        case 'X':
        {

            img_source=img_source+'close.png';
            winning_string='X Gets the Game';
            comment='YOU WIN';
            var img=document.getElementById("pop_up_img");
            img.src=img_source;
            var heading=document.getElementById("pop_up_h1");
            heading.innerHTML=winning_string;
            var paragraph=document.getElementById("pop_up_p");
            paragraph.innerHTML=comment;


            createpopup('#container');

            break;
        }
        case 'O':
        {
            img_source=img_source+'o.png';
            var winning_string='O Gets the Game';
            var comment='COMPUTER WINS';
            var img=document.getElementById("pop_up_img");
            img.src=img_source;
            var heading=document.getElementById("pop_up_h1");
            heading.innerHTML=winning_string;
            var paragraph=document.getElementById("pop_up_p");
            paragraph.innerHTML=comment;


            createpopup('#container');

            break;
        }
        case 'D':
        {
            img_source=img_source+'hand-shake.png';
            var winning_string='The Game is a Draw';
            var comment='DRAW';
            var img=document.getElementById("pop_up_img");
            img.src=img_source;
            var heading=document.getElementById("pop_up_h1");
            heading.innerHTML=winning_string;
            var paragraph=document.getElementById("pop_up_p");
            paragraph.innerHTML=comment;


            createpopup('#container');

            break;
        }
    }
}


function createpopup(id) {
    let popupNode = document.querySelector(id);
    document.getElementById("pop_up").style.pointerEvents='auto';
    let dummy = popupNode.querySelector(".dummy");
    let close = popupNode.querySelector(".pop_up_close");
    let rematch=popupNode.querySelector('.pop_up_rematch');

    function open_popup() {
        let gamearea = document.querySelector("#game_area");
        let pop = popupNode.querySelector('.pop_up'); // select the .pop_up element
        pop.classList.remove("align"); // remove the 'align' class
        popupNode.classList.add("active");
    }

    function close_popup() {
        popupNode.classList.remove("active");
    }

    rematch.addEventListener("click",close_popup);
    dummy.addEventListener("click", close_popup);
    close.addEventListener("click", close_popup);
    return open_popup();
}


function reset_game()
{
    document.getElementById("pop_up").style.pointerEvents='none';
    for(var i=1;i<=9;i++)
    {
        map[i]='-';
        document.getElementById("Oh"+i).style.visibility='hidden';
        document.getElementById("Ex"+i).style.visibility='hidden';
        object.reset_current();
    }
    
    game_over.value=false;
    game_winner.value='-';
}

















let ai='O';
let human='X';


function best_move()
{
    console.log("AI : ",ai)
    var best_score=Infinity;
    var move;
    for(var i=1;i<=9;i++)
    {
        if(map[i]=='-')
        {
            map[i]=ai;
            let score=minimax(0,true);
            map[i]='-';
            if(score < best_score)
            {
                best_score=score;
                move=i;
            }
        }
    }
    console.log("Move_outer : ",move)
    const element=document.getElementById("Oh"+move);
    if(element!=null)
    {
        var audio=new Audio('resources/Audio/Tic.mp3');
        audio.play();
        document.getElementById('circle'+move).style.animationPlayState = 'running';
        element.style.visibility='visible';
        map[move]='O';
    }
    
}



let scores = { X : 1, O : -1 , D : 0};

function minimax(depth,is_maximizer)
{
    let local_game_over={value : false};
    let local_game_winner={value : '-'};
    check(local_game_over,local_game_winner);
    if(local_game_over.value!==false)
        return scores[local_game_winner.value];
    
    if(is_maximizer)
    {
        let bestScore=-Infinity;
        for(var i=1;i<=9;i++)
        {
            if(map[i]=='-')
            {
                map[i]=human;
                let score=minimax(depth+1,false);
                map[i]='-';
                bestScore=Math.max(score,bestScore);
            }
        }
        return bestScore;
    }
    else
    {
        let bestScore=Infinity;
        for(var i=1;i<=9;i++)
        {
            if(map[i]=='-')
            {
                map[i]=ai;
                let score=minimax(depth+1,true);
                map[i]='-';
                bestScore=Math.min(score,bestScore);
            }
        }
        return bestScore;
    }
}




















