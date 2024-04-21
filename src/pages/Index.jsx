import React, { useState } from "react";
import { Box, Button, Container, Flex, Input, Stack, Text, VStack, Avatar, Spacer, useToast, useColorMode } from "@chakra-ui/react";
import { FaTwitter, FaRegComment, FaRetweet, FaHeart, FaShareAlt } from "react-icons/fa";

const Tweet = ({ username, content, isDarkMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4} bg={isDarkMode ? "gray.700" : "gray.50"}>
      <Flex>
        <Avatar name={username} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTcwNDQ0NzM5M3ww&ixlib=rb-4.0.3&q=80&w=1080" />
        <Box ml={3}>
          <Text fontWeight="bold">{username}</Text>
          <Text fontSize="sm">{content}</Text>
          <Flex align="center" mt={2}>
            <Button size="sm" variant="ghost" leftIcon={<FaRegComment />}>
              Comment
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<FaRetweet />}>
              Retweet
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<FaHeart color={isLiked ? "red" : "gray"} />} onClick={handleLike}>
              {likes > 0 ? likes : ""}
            </Button>
            <Button size="sm" variant="ghost" leftIcon={<FaShareAlt />}>
              Share
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toast = useToast();
  const [tweets, setTweets] = useState([]);
  const [tweetContent, setTweetContent] = useState("");

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    toggleColorMode();
  };

  const handleTweetPost = () => {
    if (!tweetContent.trim()) {
      toast({
        title: "Can't tweet an empty message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTweets([{ username: "User", content: tweetContent }, ...tweets]);
    setTweetContent("");
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex align="center" mb={4}>
        <Button onClick={handleToggleDarkMode} colorScheme={isDarkMode ? "blue" : "gray"} mr={4}>
          {isDarkMode ? "Dark Mode Off" : "Dark Mode On"}
        </Button>
        <FaTwitter size="2em" color={isDarkMode ? "white" : "#1DA1F2"} />
      </Flex>
      <VStack spacing={4}>
        <Box borderWidth="1px" borderRadius="lg" p={4} bg="white">
          <Input placeholder="What's happening?" value={tweetContent} onChange={(e) => setTweetContent(e.target.value)} _placeholder={{ color: isDarkMode ? "gray.500" : undefined }} />
          <Button mt={2} colorScheme="twitter" onClick={handleTweetPost}>
            Tweet
          </Button>
        </Box>
        <Stack spacing={4}>
          {tweets.map((tweet, index) => (
            <Tweet key={index} username={tweet.username} content={tweet.content} isDarkMode={isDarkMode} />
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;
