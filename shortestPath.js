var V = 5

function minDistance(dist, sptSet){
    var min = 9999
    var min_index
    for(var v = 0; v< V; v++){
        if(sptSet[v] == false && dist[v] <= min)
             min = dist[v], min_index = v;
    }
    return min_index
}

function printPath(parent, j){
    if(parent[j] == -1)
          return

    printPath(parent, parent[j]);

    console.log(j);
}

function printSolution(dist, n, parent){
    var src = 0;
    console.log("vertex Distance Path")
    for(var i = 1; i<V; i++){
        console.log(`${src} -> ${i}  ${dist[i]}\n`)
        console.log( src)
        printPath(parent, i)
    }
}

function dijkstra(graph, src) 
{ 
	
	// The output array. dist[i] 
	// will hold the shortest 
	// distance from src to i 
	let dist = []

	// sptSet[i] will true if vertex 
	// i is included / in shortest 
	// path tree or shortest distance 
	// from src to i is finalized 
	let sptSet = []

	// Parent array to store 
	// shortest path tree 
	let parent = []

	// Initialize all distances as 
	// INFINITE and stpSet[] as false 
	for (let i = 0; i < V; i++) 
	{ 
		parent[0] = -1; 
		dist[i] = 9999; 
		sptSet[i] = false; 
	} 

	// Distance of source vertex 
	// from itself is always 0 
	dist[src] = 0; 

	// Find shortest path 
	// for all vertices 
	for (let count = 0; count < V - 1; count++) 
	{ 
		// Pick the minimum distance 
		// vertex from the set of 
		// vertices not yet processed. 
		// u is always equal to src 
		// in first iteration. 
		let u = minDistance(dist, sptSet); 

		// Mark the picked vertex 
		// as processed 
		sptSet[u] = true; 

		// Update dist value of the 
		// adjacent vertices of the 
		// picked vertex. 
		for (let v = 0; v < V; v++) 

			// Update dist[v] only if is 
			// not in sptSet, there is 
			// an edge from u to v, and 
			// total weight of path from 
			// src to v through u is smaller 
			// than current value of 
			// dist[v] 
			if (!sptSet[v] && graph[u][v] && 
				dist[u] + graph[u][v] < dist[v]) 
			{ 
				parent[v] = u; 
				dist[v] = dist[u] + graph[u][v]; 
			} 
	} 

	// print the constructed 
	// distance array 
	printSolution(dist, V, parent); 
} 



let graph =   [
    [0,99,99,99,1],
    [99,0,99,5,2],
    [3,99,0,99,4],
    [2,5,99,0,99],
    [99,2,4,99,0]
]

	dijkstra(graph, 0); 
	return 0; 