import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spinner,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { usePioneer } from "@pioneer-sdk/pioneer-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CapTable from "./components/CapTable";
import Sessions from "./components/Sessions";

const ASSET = "DAI";
const LP = () => {
  const { terminalName } = useParams<{ terminalName: string }>();
  const { state } = usePioneer();
  const { api, wallet, app } = state;
  const [sessionId, setSessionId] = useState<string>();
  // const [setSessionType] = useState<string>();
  const [atmAddress, setAtmAddress] = useState<string>();
  const [userBalance] = useState<string>();
  const [amount, setAmount] = useState<number>(10);
  const [rate, setRate] = useState<number>();
  const [usd, setUsd] = useState<number>();
  const [dai, setDai] = useState<number>();

  const onSend = async () => {
    try {
      console.log("TODO");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const startSession = async () => {
    try {
      if (api) {
        // Make REST calls to fetch the locations data
        console.log("app.pubkeys: ", app.pubkeys);
        // get address
        const pubkey = app.pubkeys.filter((e: any) => e.symbol === "ETH");
        // eslint-disable-next-line no-console
        console.log("pubkey: ", pubkey);
        const myAddress = pubkey[0].address;
        // eslint-disable-next-line no-console
        console.log("myAddress: ", myAddress);

        const body = {
          terminalName,
          address: myAddress,
          type: "lpAddAsym",
        };
        console.log("body: ", body);
        let sessionInfo = await api.StartSession(body);
        sessionInfo = sessionInfo.data;
        // eslint-disable-next-line no-console
        console.log("sessionInfo: ", sessionInfo);
        setSessionId(sessionInfo.sessionId);
        setAtmAddress(sessionInfo.depositAddress);
        // setSessionType(sessionInfo.type);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const startSessionRemove = async () => {
    try {
      if (api) {
        // Make REST calls to fetch the locations data
        // eslint-disable-next-line no-console
        console.log("terminalName: ", terminalName);

        // get address
        const pubkey = app.pubkeys.filter((e: any) => e.symbol === "ETH");
        // eslint-disable-next-line no-console
        console.log("pubkey: ", pubkey);
        const myAddress = pubkey[0].address;
        // eslint-disable-next-line no-console
        console.log("myAddress: ", myAddress);

        // signMessage to prove ownership
        const payload = `{"type": "lpWithrawAsym", "amount": "${amount.toString()}"}`;
        console.log("payload: ", payload);

        const signature = await wallet.ethSignMessage({
          addressNList: [2147483692, 2147483708, 2147483648, 0, 0],
          message: payload,
        });

        const body = {
          address: myAddress,
          signature: signature.signature,
          message: payload,
          terminalName,
          amount: amount.toString(),
          type: "lpWithrawAsym",
        };
        console.log("body: ", body);
        let sessionInfo = await api.StartSession(body);
        sessionInfo = sessionInfo.data;
        console.log("sessionInfo: ", sessionInfo);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const onStart = async () => {
    try {
      if (api) {
        console.log("terminalName: ", terminalName);
        // Make REST calls to fetch the locations data
        let terminalInfo = await api.TerminalPrivate({
          terminalName,
        });
        terminalInfo = terminalInfo.data;
        terminalInfo = terminalInfo.terminalInfo;
        console.log("terminalInfo: ", terminalInfo);
        console.log("terminalInfo: ", terminalInfo);
        console.log("captable: ", terminalInfo?.captable);
        console.log("pubkey: ", terminalInfo.pubkey);
        setAtmAddress(terminalInfo.pubkey);
        setRate(terminalInfo.rate);
        setUsd(terminalInfo.TOTAL_CASH);
        setDai(terminalInfo.TOTAL_DAI);
        // setLocations(locationsData);

        // get user balance
        const balance = app.balances.filter((e: any) => e.symbol === ASSET);
        console.log("balance: ", balance);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    onStart();
  }, [api, terminalName]);

  if (!api) {
    return <Spinner size="xl" />;
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      padding={4}
      maxWidth="300px"
      margin="auto"
    >
      <Tabs isLazy>
        <TabList>
          <Tab>LP</Tab>
          <Tab>Sessions</Tab>
          <Tab>Cap Table</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              terminalName: {terminalName}
            </Text>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              rate: {rate || "0"}
            </Text>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              USD: {usd || "0"}
            </Text>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              DAI: {dai || "0"}
            </Text>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              address: {atmAddress}
            </Text>
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
              Your Balance: {userBalance}
            </Text>
            {sessionId ? (
              <div>
                <Box>
                  sessionId: <small>{sessionId}</small>
                </Box>
                <Text>Select amount: ${amount}</Text>
                <Slider
                  defaultValue={amount}
                  min={10}
                  max={100}
                  step={1}
                  onChange={(value) => setAmount(value)}
                  mb={4}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Button onClick={onSend}>Send DAI</Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={startSession}
                  color="green"
                  size="lg"
                  width="100%"
                  mb={4}
                >
                  Begin LP add Session
                </Button>
                <Button
                  onClick={startSessionRemove}
                  color="teal"
                  size="lg"
                  width="100%"
                  mb={4}
                >
                  Begin LP withdrawal Session
                </Button>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            <Sessions terminalName={terminalName} />
          </TabPanel>
          <TabPanel>
            <CapTable terminalName={terminalName} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LP;
