from datetime import datetime

def parse_time(t):
    return datetime.strptime(t, "%H:%M")

def is_timing_conflict(f1, f2):
    """
    Standard overlap detection: 
    True if one flight starts before the other ends, and vice versa[cite: 6].
    """
    return parse_time(f1['arrival']) < parse_time(f2['departure']) and \
           parse_time(f2['arrival']) < parse_time(f1['departure'])