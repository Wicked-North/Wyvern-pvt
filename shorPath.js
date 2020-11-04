const INFINITY = 9999

//dijkstra(G, n, startnode)
var G = [
    [0, 1, 2, 3, 4, 5, 6],
    [1, 0, 2, 3, 4, 5, 6],
    [3, 1, 0, 99, 4, 6, 5],
    [5, 4, 1, 0, 2, 6, 3],
    [6, 5, 3, 2, 0, 4, 1],
    [2, 3, 4, 5, 1, 0, 6],
    [6, 5, 3, 2, 1, 4, 0],
];


var n = 7;
var u = 2;


dijkstra(G, n, u);


function dijkstra(G, n, startnode) {
    var pred = [0, 0, 0, 0, 0]
    var visited, count, mindistance, nextnode, i, j
    var cost = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]

    var distance = [0, 0, 0, 0, 0, 0, 0]
    var visited = [0, 0, 0, 0, 0, 0, 0]

    for (i = 0; i < n; i++)
        for (j = 0; j < n; j++)
            if (G[i][j] == 0)
                cost[i][j] = INFINITY;
            else
                cost[i][j] = G[i][j];



    for (i = 0; i < n; i++) {
        distance[i] = cost[startnode][i];
        pred[i] = startnode;
        visited[i] = 0;
    }
    distance[startnode] = 0;
    visited[startnode] = 1;
    count = 1;


    while (count < n - 1) {
        mindistance = INFINITY;
        for (i = 0; i < n; i++)
            if (distance[i] < mindistance && !visited[i]) {
                mindistance = distance[i];
                nextnode = i;
            }
        visited[nextnode] = 1;
        for (i = 0; i < n; i++)
            if (!visited[i])
                if (mindistance + cost[nextnode][i] < distance[i]) {
                    distance[i] = mindistance + cost[nextnode][i];
                    pred[i] = nextnode;
                }
        count++;
    }


    for (i = 0; i < n; i++)
        if (i != startnode) {
            //cout<<"\nDistance of node"<<i<<"="<<distance[i];
            console.log(`Distance from node ${u} to node ${i} = ${distance[i]}`)
            // cout<<"\nPath="<<i;
            let path = []
          path.push(i)
            j = i;
            do {
                j = pred[j];
                // cout<<"<-"<<j;
               path.push(j)
            } while (j != startnode);
            path.reverse()
            console.log(path)
            path = path.join('->')
          console.log(`shortest path : ${path}`)
          console.log('')
        }
}