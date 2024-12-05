import TeaSpotObj from './TeaSpotObj';

export default interface DataType {
    took: number; // ms i think
    timed_out: boolean;
    _shards: { total: number, successful: number, skipped: number, failed: number };
    hits: {
        total: { value: number, relation: string };
        max_score: any | null;
        hits: TeaSpotObj[];
    };
};