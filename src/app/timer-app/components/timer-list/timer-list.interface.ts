export interface IntervalTimer {
    id: number; 
    title: string; 
    intervals: Array<Timer>;
    total?: number;
}

export interface Timer {
    id: number; 
    title: string; 
    time: number;
}