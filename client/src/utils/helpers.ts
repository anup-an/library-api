import _ from "lodash";
import { FilterQuery, ListQuery } from "src/types/common";

const getFilterString = (filterObj: FilterQuery): string => {
  const stringArray = _.keys(filterObj).map((key) => {
    const nestedKeys = _.keys(filterObj[key]);
    return `${key}__${nestedKeys[0]}=${filterObj[key][nestedKeys[0]]}`;
  });
  return !_.isEmpty(stringArray) ? stringArray.join("&") : "";
};

const getSearchString = (search: string, search_fields: string[]) => {
  const searchFieldsString = search_fields.map(field => `search_fields=${field}`).join('&')
  return `search=${search}&${searchFieldsString}`

}

export const buildQueryString = (queryObject: ListQuery): string => {
  const filterString = getFilterString(queryObject.filter);
  const searchString = getSearchString(queryObject.search, queryObject.search_fields)
  const filteredQueryObj: Omit<ListQuery, "filter" | "search" | "search_fields"> = _.omit(
    queryObject,
    ["filter", "search", "search_fields"]
  );
  const remainingString = _.keys(filteredQueryObj)
    .map(
      (key) =>
        `${key}=${filteredQueryObj[key as keyof Omit<ListQuery, "filter" | "search" | "search_fields">]}`
    )
    .join("&");
  return `?${searchString}&${filterString}&${remainingString}`;
};
