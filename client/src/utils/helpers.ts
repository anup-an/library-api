import _ from "lodash";
import { FilterQuery, ListQuery } from "src/types/common";

const getFilterString = (filterObj: FilterQuery): string => {
  const stringArray = _.keys(filterObj).map((key: keyof FilterQuery) => {
    const nestedKeys = !_.isString(filterObj[key])
      ? _.keys(filterObj[key])
      : undefined;
    return nestedKeys
      ? `${key}__${nestedKeys[0]}=${
          (filterObj[key] as { [x: string]: string })[nestedKeys[0]]
        }`
      : `${key}=${filterObj[key]}`;
  });
  return !_.isEmpty(stringArray) ? stringArray.join("&") : "";
};

const getSearchString = (search: string, search_fields: string[]) => {
  const searchFieldsString = search_fields
    .map((field) => `search_fields=${field}`)
    .join("&");
  return `search=${search}&${searchFieldsString}`;
};

export const buildQueryString = (queryObject: ListQuery): string => {
  const filterString = getFilterString(queryObject.filter);
  const searchString = getSearchString(
    queryObject.search,
    queryObject.search_fields
  );
  const filteredQueryObj: Omit<
    ListQuery,
    "filter" | "search" | "search_fields"
  > = _.omit(queryObject, ["filter", "search", "search_fields"]);
  const remainingString = _.keys(filteredQueryObj)
    .map(
      (key) =>
        `${key}=${
          filteredQueryObj[
            key as keyof Omit<ListQuery, "filter" | "search" | "search_fields">
          ]
        }`
    )
    .join("&");
  return `?${searchString}&${filterString}&${remainingString}`;
};

const createObject = (stringArray: string[]) => {
  const splitString = stringArray[0].split("__");
  const y =
    splitString.length === 1
      ? { [splitString[0]]: stringArray[1] }
      : { [splitString[0]]: { [splitString[1]]: stringArray[1] } };
  return y;
};

const getObjectFromArray = (array: { [x: string]: any }[]) => {
  return array.reduce(
    (acc: { [x: string]: any }, val: { [x: string]: any }) => ({
      ...acc,
      ...val,
    }),
    {}
  );
};

export const getObjectFromQueryString = (queryString: string) => {
  const splitString = queryString.split("&");
  const valueArray = splitString
    .map((query) => createObject(query.split("=")))
    .reverse();
  
  const filterQuery = valueArray.filter((value) =>
      !["search", "search_fields", "ordering", "page", "page_size"].includes(
        Object.keys(value)[0]
    ))
  
  return {
    search: (valueArray.find((value) => value["search"])?.search || "").toString(),
    search_fields: valueArray
      .filter((value) => value["search_fields"])
      .map((value) => value["search_fields"].toString()),
    filter: getObjectFromArray(filterQuery) as FilterQuery,
    ordering: (valueArray.find((value) => value["ordering"])?.ordering || "").toString(),
    page: Number(valueArray.find((value) => value["page"])?.page) || 1,
    page_size:
      Number(valueArray.find((value) => value["page_size"])?.page_size) || 20,
    count: 0,
  };
};
