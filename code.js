
var a=[];
const  n=54;
const m=19;
var vis=[];
var k=0;
var dis=[];
var g=[];
var list=[];
var list_contain=[];
var par=[];
const container=document.querySelector('.container');
//broad creation  
for(var i=0;i<n*m;i++){
    const square=document.createElement('div');
    square.classList.add('block');
    square.setAttribute('id',i);

    a.push(square);
    container.appendChild(square);
    vis.push(0);
    dis.push(1000000);
    par.push(-1);
    g.push(0);
    list_contain.push(0);
        
}    

var s=document.getElementById("502");
s.classList.add("start");
var d=document.getElementById("518");
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

function run_bfs(){
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
    bfs(s,d);

}

async function run_dfs(){
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
    k=0;
    await dfs(s,d); 
    if(d.classList.contains("vis"))
    path();
    return ;
}

function run_astar(){
    
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
    while(list.length>0)
    list.pop();

    for(var i=0;i<n*m;i++)
    {
        dis[i]=1000000;
        par[i]=-1;
        g[i]=0;
        list_contain[i]=0;
    }
    console.log(list.length);
    astar(s,d);
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
            }, 50)
        );
        
        
        
    
    }
    //path
    if(!d.classList.contains("vis"))
    return;
    var path=[];
    var v=vis[d.id]-1;
    for(;v!=s.id;v=vis[v]-1)
    {
        path.push(a[v]);
    }
    path.reverse();
    for(i=0;i<path.length;i++)
    {
        path[i].classList.add("path");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 50)
        );
    }


}

//dfs algo
async function dfs(s1,d1){
    s1.classList.add("vis");
    
    
    
    await new Promise(resolve =>
        setTimeout(() => {
            resolve();
        }, 15)
    );
    if(s1==d1)
    {
        k=1;
        return;
    }
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

// astar algo
function heuristic(x1,y1){
    return Math.abs(x1-Math.floor(d.id/n))+Math.abs(y1-d.id%n);
}
async function astar(s,d){
    
    dis[s]=heuristic(Math.floor(s.id/n),s.id%n);
    g[s]=0;
    list.push(s.id);
    list_contain[s.id]=1;
    while(list.length>=1){
        var curr=0;
        for(let i=0;i<list.length;i++){
            if(dis[list[curr]]>dis[list[i]])
            curr=i;
        }
        
        if(list[curr]==d.id)
        {
            break;
        }
        var p=list[curr];
        list.splice(curr,1);
        list_contain[p]=0;            
        if(vis[p])
        continue;
        
        vis[p]=1;
        a[p].classList.add("vis");

        var x=Math.floor(p/n)
        var y=p%n;
        
        if(x+1<m&&!vis[(x+1)*n+y])
        {
            if(dis[(x+1)*n+y]>g[x*n+y]+1+heuristic(x+1,y))
            {
                dis[(x+1)*n+y]=g[x*n+y]+1+heuristic(x+1,y);
                g[(x+1)*n+y]=g[x*n+y]+1;
                par[(x+1)*n+y]=x*n+y;
                if(list_contain[(x+1)*n+y]==0)
                list.push((x+1)*n+y);
            }
        }
        if(x-1>=0&&!vis[(x-1)*n+y])
        {
            if(dis[(x-1)*n+y]>g[x*n+y]+1+heuristic(x-1,y))
            {
                dis[(x-1)*n+y]=g[x*n+y]+1+heuristic(x-1,y);
                g[(x-1)*n+y]=g[x*n+y]+1;
                par[(x-1)*n+y]=x*n+y;
                if(list_contain[(x-1)*n+y]==0)
                list.push((x-1)*n+y);
            }
        }
        if(y+1<n&&!vis[x*n+y+1])
        {
            if(dis[x*n+y+1]>g[x*n+y]+1+heuristic(x,y+1))
            {
                dis[x*n+y+1]=g[x*n+y]+1+heuristic(x,y+1);
                g[x*n+y+1]=g[x*n+y]+1;
                par[x*n+y+1]=x*n+y;
                if(list_contain[x*n+y+1]==0)
                list.push(x*n+y+1);
            }
        }
        if(y-1>=0&&!vis[x*n+y-1])
        {
            if(dis[x*n+y-1]>g[x*n+y]+1+heuristic(x,y-1))
            {
                dis[x*n+y-1]=g[x*n+y]+1+heuristic(x,y-1);
                g[x*n+y-1]=g[x*n+y]+1;
                par[x*n+y-1]=x*n+y;
                if(list_contain[x*n+y-1]==0)
                list.push(x*n+y-1);
            }
        }
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 10)
        );



    }
    //path
    var path=[];
    var i=par[d.id];
    for(;i!=s.id;i=par[i])
    {
        path.push(a[i]);
    }
    path.reverse();
    for(i=0;i<path.length;i++)
    {
        path[i].classList.add('path');
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 50)
        );

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
//...............maze algo..............///
async function recr_maze(){
    var dir=['u','d','l','r'];
    for(i=0;i<n;i++){
        vis[i]=1;
        a[i].classList.add("wall");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 15)
        );
    }
    for(i=107;i<n*m;i+=n){
        vis[i]=1;
        a[i].classList.add("wall");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 15)
        );
    }
    for(i=n*m-1;i>=972;i--){
        vis[i]=1;
        a[i].classList.add("wall");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 15)
        );
    }
    for(i=918;i>0;i-=n){
        vis[i]=1;
        a[i].classList.add("wall");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 15)
        );
    }
    
    

    var s=document.getElementById("110");
    async function maze_dfs(s)
    {
        vis[s.id]=1;
        s.classList.add("wall");
        await new Promise(resolve =>
            setTimeout(() => {
                resolve();
            }, 15)
        );
        dir.sort(()=>Math.random()-0.5);
        var p=parseInt(s.id);
        var x=Math.floor(p/n);
        x=x*p;
        var y=(x+1)*n;
        for(let i=0;i<4;i++)
        {
            if(dir[i]=='u')
            {
                let flag=1;
                for(let j=-1;j<=1;j++)
                {
                    for(let k=1;k<=2;k++)
                    {
                        var cor=p-k*n+j;
                        if(vis[cor])
                        {
                            flag=0;
                            break;
                        }
                    }
                    if(!flag)
                    break;
                }
                if(flag)
                {
                    await maze_dfs(a[p-n]);
                }
            }
            if(dir[i]=='d')
            {
                let flag=1;
                for(let j=-1;j<=1;j++)
                {
                    for(let k=1;k<=2;k++)
                    {
                        var cor=p+k*n+j;
                        if(vis[cor])
                        {
                            flag=0;
                            break;
                        }
                    }
                    if(!flag)
                    break;
                }
                if(flag)
                await maze_dfs(a[p+n]);

            }
            if(dir[i]=='l')
            {
                let flag=1;
                for(let j=-1;j<=1;j++)
                {
                    for(let k=1;k<=2;k++)
                    {
                        var cor=p-j*n-k;
                        if(vis[cor])
                        {
                            flag=0;
                            break;
                        }
                    }
                    if(!flag)
                    break;
                }
                if(flag)
                await maze_dfs(a[p-1]);

            }
            if(dir[i]=='r')
            {
                let flag=1;
                for(let j=-1;j<=1;j++)
                {
                    for(let k=1;k<=2;k++)
                    {
                        var cor=p-j*n+k;
                        if(vis[cor])
                        {
                            flag=0;
                            break;
                        }
                    }
                    if(!flag)
                    break;
                }
                if(flag)
                await maze_dfs(a[p+1]);
            }
        }
        
    }
    maze_dfs(s);

}

function rand_maze()
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

function clear_path(){
    for(let i=0;i<n*m;i++)
    {
        
        if(a[i].classList.contains("vis"))
        {
            a[i].classList.remove("vis");
            vis[i]=0;
            
            if(a[i].classList.contains("path"))
            a[i].classList.remove("path");
        }
    }
}
function clear_board(){
    clear_path();
    for(i=0;i<n*m;i++)
    {
        vis[i]=0;
        if(a[i].classList.contains("wall"))
        {
            a[i].classList.remove("wall");
        }
    }
}



