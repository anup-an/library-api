import {
  Avatar,
  Box,
  Card,
  CardBody,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
  Button,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "src/App";
import { fetchUser, returnBook } from "src/api/user";
import { ApiError } from "src/api/axios";
import {
  loading,
  ApiData,
  applyApiEffect,
  extractDataOrNull,
  pickDataOrDefault,
  isSuccess,
  isLoading,
  isFailure,
} from "src/types/ApiTypes";
import { isAuthenticated } from "src/types/authenticate";
import { NotificationType } from "src/types/common";
import { User } from "src/types/user";
import Notification from "src/components/ui/Notification";
import { BookInstance } from "src/types/book";
import Loader from "src/components/ui/Loader";
import ErrorFetch from "src/components/ui/ErrorFetch";

const UserInfo = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<ApiData<User, ApiError>>(loading);
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType>({
    status: null,
    description: null,
  });

  const handleReturn = async (id: string) => {
    setIsReturning(true);
    const response = await returnBook(id);
    applyApiEffect(
      response,
      () => {
        setNotification({
          ...notification,
          status: "success",
          description: "Book returned successfully.",
        });
        setIsReturning(false);
        fetchLoggedUser();
      },
      (error) => {
        setNotification({
          ...notification,
          status: "error",
          description: "Book not returned. Please try again.",
        });
        setIsReturning(false);
      }
    );
  };

  const fetchLoggedUser = async () => {
    const loggedUser = await fetchUser();
    setUser(loggedUser);
  };

  useEffect(() => {
    (async () => {
      if (!isAuthenticated(state.authStatus)) {
        navigate("/login");
        return;
      }
      await fetchLoggedUser();
    })();
  }, [state.authStatus, navigate]);

  if (isLoading(user)) {
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Loader displayText="Loading user data" />
      </Flex>
    );
  }

  if (isFailure(user)) {
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <ErrorFetch
          displayText="Failed to fetch user. Please try again"
          handleRetry={fetchLoggedUser}
        />
      </Flex>
    );
  }

  return (
    <div>
      <div>
        <div>
          <Tabs size="md" variant="enclosed">
            <TabList>
              <Tab
                _selected={{ color: "white", bg: "orange" }}
                fontWeight="bold"
                color="gray.600"
              >
                Profile
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "orange" }}
                fontWeight="bold"
                color="gray.600"
              >
                Loans
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Avatar size="lg" marginTop="20px" />
                <Divider
                  borderColor="gray.400"
                  marginTop="20px"
                  marginBottom="20px"
                />
                <div>{extractDataOrNull(user)?.username}</div>
              </TabPanel>
              <TabPanel
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Box
                  marginBottom="10px"
                  display={`${isReturning ? "none" : "block"}`}
                >
                  <Notification notificationObject={notification} />
                </Box>
                {isSuccess(user) &&
                pickDataOrDefault(user, "books_onloan", [] as BookInstance[])
                  .length === 0 ? (
                  <>
                    <Box>No books borrowed yet.</Box>
                    <Box>
                      <Button
                        colorScheme="teal"
                        variant="solid"
                        marginTop="20px"
                        onClick={() => navigate("/books")}
                      >
                        Browse
                      </Button>
                    </Box>
                  </>
                ) : (
                  ""
                )}
                <Grid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                    "2xl": "repeat(4, 1fr)",
                  }}
                  gap={6}
                  gridAutoFlow="dense"
                  justifyContent="center"
                  alignItems="center"
                >
                  {pickDataOrDefault(
                    user,
                    "books_onloan",
                    [] as BookInstance[]
                  ).map((book) => (
                    <Card borderRadius="5px" background="none" boxShadow="2xl">
                      <CardBody maxW="sm">
                        <Box display="flex" justifyContent="center">
                          <Image
                            src={book.book.book_image || ""}
                            alt={book.book.title}
                            borderRadius="lg"
                            height={[300, 300, 300, 300, 300, 400]}
                          />
                        </Box>
                        <Box
                          mt="4"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Flex justifyContent="space-between">
                            <Box fontWeight="bold">Due date:</Box>
                            <Box>{book.due_date}</Box>
                          </Flex>
                          <Button
                            variant="solid"
                            colorScheme="teal"
                            mt="4"
                            onClick={() => handleReturn(book.id)}
                          >
                            Return
                          </Button>
                        </Box>
                      </CardBody>
                    </Card>
                  ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
