import { List, ListItem, ListIcon, Spinner, Text } from "@chakra-ui/react";
import { usePioneer } from "@pioneer-sdk/pioneer-react";
import { useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

const Sessions = (terminalName: any) => {
  const { state } = usePioneer();
  const { api } = state;
  const [sessions, setSessions] = useState([]);

  const onStart = async () => {
    try {
      console.log("terminalName: ", terminalName);
      console.log("terminalName: ", terminalName?.terminalName);
      // get private info
      let terminalInfo = await api.TerminalPrivate({
        terminalName: terminalName?.terminalName,
      });
      terminalInfo = terminalInfo.data;
      console.log("terminalInfo: ", terminalInfo);

      setSessions(terminalInfo.sessions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onStart();
  }, []);

  if (!api) {
    return <Spinner size="xl" />;
  }

  return (
    <List spacing={3}>
      {sessions.map((session: any) => (
        <ListItem key={session.sessionId}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          <Text>{session.time}</Text>
          <Text>{session.sessionId}</Text>
          <Text>{session.rate}</Text>
          <Text>{session.type}</Text>
          <Text>{session.event}</Text>
          <Text>
            total value:{" "}
            {parseFloat(session.TOTAL_USD) + parseFloat(session.TOTAL_DAI)}
          </Text>
        </ListItem>
      ))}
    </List>
  );
};

export default Sessions;
