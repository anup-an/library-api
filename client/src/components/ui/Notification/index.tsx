import { Alert, AlertDescription, AlertIcon } from "@chakra-ui/react";
import { NotificationType } from "src/types/common";

interface IProps {
  notificationObject: NotificationType;
}

const Notification = (props: IProps) => {
  const { notificationObject } = props;
  const { status, description } = notificationObject;
  return (
    <>
      {status && description ? (
        <Alert status={status}>
          <AlertIcon />
          <AlertDescription display="flex">{description}</AlertDescription>
        </Alert>
      ) : (
        ""
      )}
    </>
  );
};

export default Notification;
