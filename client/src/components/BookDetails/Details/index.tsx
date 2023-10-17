import { Text } from "@chakra-ui/react";

import _ from "lodash";
import { DetailsConfig } from "..";

interface IProps {
  detailsConfig: DetailsConfig[];
  detailsObject: { [x: string]: any };
}
const Details = (props: IProps) => {
  const { detailsConfig, detailsObject } = props;

  const mapValue = (value: string, mappingObject?: { [x: string]: string }) => {
    return mappingObject && mappingObject[value] ? mappingObject[value] : value;
  };

  const isFieldDisplayable = (
    details: DetailsConfig,
    field: string
  ): [x: boolean, y: any] => {
    if (_.isEmpty(detailsObject[field])) return [false, null];

    const subField = details.subfield;
    const displayValues = subField
      ? !details.isList
        ? mapValue(detailsObject[field][subField] || "", details.mapping)
        : detailsObject[field].map((value: any) =>
            mapValue(value[subField] || "", details.mapping)
          )
      : mapValue(detailsObject[field] || "", details.mapping);
    if (_.isEmpty(displayValues)) return [false, displayValues];

    if (
      _.isArray(displayValues) &&
      displayValues.every((value) => value === null)
    ) {
      return [false, displayValues];
    }

    return [true, displayValues];
  };

  return (
    <>
      {detailsConfig.map((detail) =>
        isFieldDisplayable(detail, detail.field)[0] ? (
          <>
            <Text fontSize="lg" fontWeight="bold">
              {_.capitalize(detail.field).split("_").join("")}
              {detail.isList ? "(s)" : ""}
            </Text>
            <Text>
              {detail.isList
                ? isFieldDisplayable(detail, detail.field)[1].join(",")
                : isFieldDisplayable(detail, detail.field)[1]}
            </Text>
          </>
        ) : (
          ""
        )
      )}
    </>
  );
};

export default Details;
