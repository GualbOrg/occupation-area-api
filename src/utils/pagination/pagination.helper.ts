

import { IPaginatedType } from "./paginated.type";


export class PaginationHelper {

    public static paginate<T>(
        totalCount: number,
        result: T[],
    ): IPaginatedType<T> {

        return { nodes: result, totalCount };
    }
}


