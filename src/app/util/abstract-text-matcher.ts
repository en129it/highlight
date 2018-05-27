import {Accessible} from './accessible.model';

export class MatchingSplitParts {
    isMatchStart: boolean;
    parts: string[];
}


export interface AbstractTextMatcher {

    isFilterMatching(accessible: Accessible, filter: string): boolean;

    split(aValue: string, filter: string): MatchingSplitParts;

}