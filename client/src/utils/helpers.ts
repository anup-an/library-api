import _ from "lodash";
import { FilterQuery, ListQuery } from "src/types/common";

const getFilterString = (filterObj: FilterQuery): string => {
  const stringArray = _.keys(filterObj).map((key) => {
    const nestedKeys = _.keys(filterObj[key]);
    return `${key}__${nestedKeys[0]}=${filterObj[key][nestedKeys[0]]}`;
  });
  return !_.isEmpty(stringArray) ? stringArray.join("&") : "";
};

export const buildQueryString = (queryObject: ListQuery): string => {
  const filterString = getFilterString(queryObject.filter);
  const filteredQueryObj: Omit<ListQuery, "filter"> = _.omit(
    queryObject,
    "filter"
  );
  const remainingString = _.keys(filteredQueryObj)
    .map(
      (key) =>
        `${key}=${filteredQueryObj[key as keyof Omit<ListQuery, "filter">]}`
    )
    .join("&");
  return `?${filterString}&${remainingString}`;
};
