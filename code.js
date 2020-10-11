
var a=[];
const  n=54;
const m=19;
var vis=[];
var p=[];
var k=0;
const container=document.querySelector('.container');
//broad creation  
for(var i=0;i<n*m;i++){
    const square=document.createElement('div');
    square.classList.add('block');
    square.setAttribute('id',i);

    a.push(square);
    container.appendChild(square);
    vis.push(0);
        
}    

var s=document.getElementById("342");
s.classList.add("start");
var d=document.getElementById("680");
d.classList.add("end");
var is_start_mark=1;
var is_end_mark=1;

document.addEventListener("click",function(e){
    
    var element=e.srcElement;
    if(is_start_mark==0)
    {
        a.forEach(function change(e){
           e.classList.remove("start_hov"); 
        });
        s=element;
        is_start_mark=1;
        s.classList.add("start");
        return;
    }
    if(element.classList.contains("start"))
    {
        is_start_mark=0;
        element.classList.remove("start");
        a.forEach(function change(e){
            e.classList.add("start_hov"); 
         });
        return ;

    }
    if(element.classList.contains("end"))
    {
        is_end_mark=0;
        element.classList.remove("end");
        a.forEach(function change(e){
            e.classList.add("end_hov"); 
         });
        return ;
    }
    if(is_end_mark==0)
    {
        a.forEach(function change(e){
            e.classList.remove("end_hov"); 
         });
         d=element;
         is_end_mark=1;
         d.classList.add("end");
         return;
    }


});

async function foo(){
    if(vis[s.id])
    {
        vis[s.id]=0;
        s.classList.remove("wall");

    }
    if(vis[d.id])
    {
        vis[d.id]=0;
        d.classList.remove("wall");
    }
    
    await bfs(s,d);
    // if(d.classList.contains("vis"))
    // path();
}

//bfs algo
async function bfs(s1,d1){

    let queue=[];
    queue.push(s1);
    s.classList.add("vis");
    while(queue.length!=0)
    {
        
        
        var si=queue.length;
        while(si--){
        
        let e= queue.shift();
        let p=e.id;
        let x=Math.floor(p/n);
        let y=p%n;
        if(x+1<m&&vis[(x+1)*n+y]==0)
        {
            queue.push(a[(x+1)*n+y]);
            vis[(x+1)*n+y]=parseInt(p)+1;
            a[(x+1)*n+y].classList.add("vis");
            if(a[(x+1)*n+y]==d1)
            break;
        }
        if(x-1>=0&&vis[(x-1)*n+y]==0)
        {
            queue.push(a[(x-1)*n+y]);
            vis[(x-1)*n+y]=parseInt(p)+1;
            a[(x-1)*n+y].classList.add("vis");
            if(a[(x-1)*n+y]==d1)
            break;
        }
        if(y+1<n&&vis[(x)*n+y+1]==0)
        {
            queue.push(a[(x)*n+y+1]);
            vis[(x)*n+y+1]=parseInt(p)+1;
            a[(x)*n+y+1].classList.add("vis");
            if(a[(x)*n+y+1]==d1)
            break;
        }
        if(y-1>=0&&vis[(x)*n+y-1]==0)
        {
            queue.push(a[(x)*n+y-1]);
            vis[x*n+y-1]=parseInt(p)+1;
            a[(x)*n+y-1].classList.add("vis");
            if(a[(x)*n+y-1]==d1)
            break;
        }


        }
        if(vis[d1.id])
        break;
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 100)
        );
        
        
        
    
    }
    //path
    if(!d.classList.contains("vis"))
    return;
    var v=vis[d.id]-1;
    for(;v!=s.id;v=vis[v]-1)
    {
        a[v].classList.add("path");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 100)
        );
    }


}

//dfs algo
async function dfs(s1,d1){
    s1.classList.add("vis");
    if(s1==d1)
    {
        k=1;
        return;
    }
    
    await new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, 15)
    );
    let p=s1.id;
    let x=Math.floor(p/n);
    let y=p%n;
    vis[p]=1;
    if(x+1<m&&!vis[(x+1)*n+y])
    {
        if(k==1)
        return;

        await dfs(a[(x+1)*n+y],d1);
        if(k==1)
        {
            vis[p]=(x+1)*n+y;
        }
        
        
    }
    if(x-1>=0&&!vis[(x-1)*n+y])
    {
        if(k==1)
        return;

        await dfs(a[(x-1)*n+y],d1);
        if(k==1)
        {
            vis[p]=(x-1)*n+y;
        }
       
    }
    if(y+1<n&&vis[x*n+y+1]==0)
    {
        if(k==1)
        return;
        await dfs(a[x*n+y+1],d1);
        if(k==1)
        {
            vis[p]=x*n+y+1;
        }
    }
    if(y-1>=0&&vis[(x)*n+y-1]==0)
    {
        if(k==1)
        return;
        await dfs(a[x*n+y-1],d1);
        if(k==1)
        {
            vis[p]=x*n+y-1;
        }
    }
    


}

function maze()
{
    var i;
    var cnt=300;
    for(i=0;i<cnt;i++)
    {
        vis[i]=1;
    }
    vis.sort(()=>Math.random()-0.5);
    for(i=0;i<n*m;i++)
    {
        if(vis[i])
        {
            document.getElementById(i).classList.add("wall");
        }
    }
    
}

async function path(){
    var v=vis[s.id];
    for(;v!=d.id;v=vis[v])
    {
        a[v].classList.add("path");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 50)
        );
    }

}





