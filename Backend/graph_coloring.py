import networkx as nx
from utils import is_timing_conflict

def get_conflict_graph(flights):
    """Builds a NetworkX graph where edges represent timing conflicts[cite: 2]."""
    G = nx.Graph()
    for i, f1 in enumerate(flights):
        G.add_node(f1['id'])
        for f2 in flights[i+1:]:
            if is_timing_conflict(f1, f2):
                G.add_edge(f1['id'], f2['id'])
    return G

def run_welsh_powell(G):
    """
    Colors the graph by sorting nodes by degree (largest to smallest)[cite: 2].
    Returns a dict of {flight_id: color_index}.
    """
    return nx.coloring.greedy_color(G, strategy="largest_first")