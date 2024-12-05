import CreatedAt from './CreatedAt';
import FormKeyValues from './FormKeyValues';

export default interface TeaSpotObj {
    _index: string;
    _type: string;
    _id: string;
    _score: any | null;
    _source: {
        createdAt: CreatedAt;
        firebaseUserId: string;
        formKeyValues: FormKeyValues;
        id: string;
        imagePath: string;
        isDeleted: boolean;
        reactions: typeof Object;
        updatedAt: typeof Object;
        imageDetection: typeof Object;
        isInReview: boolean;
    };
    sort: number[];
};