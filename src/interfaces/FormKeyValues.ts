import TeaSpotBusho from "../enums/TeaSpotBusho";
import Prefectures from "../enums/Prefectures";

export default interface FormKeyValues {
    bushoumei: TeaSpotBusho;
    comment: string;
    teaspotname: string;
    todoufuken: Prefectures;
};