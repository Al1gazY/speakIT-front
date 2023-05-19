import React, { FC, useEffect, useState } from "react";
import { Definition, Topic } from "../api/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import topic from "../api/services/topic";
import {
  Box,
  IconButton,
  Paper,
  useTheme,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import { tokens } from "../context/useMode";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Flashcard from "../components/Flashcard/Flashcard";
const FlashcardPage: FC = () => {
  // theme
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  // states
  const [topicId, setTopicId] = useState<string>(location.state.id);
  const [definitions, setDefinitons] = useState<Map<number, Definition>>(
    new Map()
  );

  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const [current, setCurrent] = useState<number>(0);

  // hooks
  const { data } = useQuery(
    "topic_definitions",
    () => topic.topicDefinitionsById(topicId),
    {
      refetchInterval: 1000,
    }
  );
  const { data: currentTopic } = useQuery("topic", () =>
    topic.getTopic(topicId)
  );
  const navigate = useNavigate();

  // side effects
  useEffect(() => {
    setTopicId(location.state.id);
    if (data?.data.length) {
      const definitions = [...data.data];
      definitions.forEach((definition: Definition, index: number) => {
        setDefinitons((prev) => {
          return prev?.set(index + 1, definition);
        });
      });
    }
  }, [data?.data, definitions, location.pathname, location.state.id]);

  useEffect(() => {
    setTopicId(location.state.id);
    setCurrent(1);
  }, [location.state.id]);
  // handlers
  const handleNext = () => {
    if (current == data?.data.length) {
      return;
    }
    setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current == 1) {
      return;
    }
    setCurrent(current - 1);
  };
  useEffect(() => {
    if (current - 1 == 0) {
      setPrev(true);
    } else {
      setPrev(false);
    }

    if (current + 1 > data?.data.length) {
      setNext(true);
    } else {
      setNext(false);
    }
  }, [current, next, prev, data?.data.length]);
  return (
    <Container
      sx={{
        width: "100%",
        height: "90%",
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <IconButton
        onClick={() => navigate("/flashcards")}
        sx={{
          position: "absolute",
          left: "20px",
        }}
      >
        <ArrowBackIcon
          sx={{
            width: "40px",
            height: "40px",
          }}
        />
      </IconButton>
      <Typography
        variant="h1"
        sx={{
          justifySelf: "center",
        }}
      >
        {currentTopic?.data.name}
      </Typography>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "70%",
          marginTop: "32px",
          borderColor: colors.primary[400],
          padding: 2,
          borderRadius: 5,
          border: 1,
          background: "none",
          justifySelf: "center",
          justifyContent: "space-between",
        }}
      >
        {data && <Flashcard definition={definitions.get(current) || null} />}

        {definitions.get(current) ? (
          <Box
            display="flex"
            gap={2}
            width="100%"
            height="10%"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              sx={{ width: "40px", height: "40px" }}
              disabled={prev}
              onClick={handlePrev}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                userSelect: "none",
              }}
            >
              {current} / {data?.data.length}
            </Typography>
            <IconButton
              sx={{ width: "40px", height: "40px" }}
              disabled={next}
              onClick={handleNext}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Skeleton variant="rounded" width="100%" height="10%" />
        )}
      </Paper>
    </Container>
  );
};

export default FlashcardPage;
