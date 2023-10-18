/*
    ATM Map with pins
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, Spinner, Box, Button, Stack, Text } from "@chakra-ui/react";
import { usePioneer } from "@pioneer-sdk/pioneer-react";
import { useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

const MapWithPins = () => {
  const { state } = usePioneer();
  const { api } = state;
  const [locations, setLocations] = useState([]);
  // const [defaultLocation, setDefaultLocation] = useState([]);
  const navigate = useNavigate();

  const onStart = async () => {
    try {
      if (api) {
        // Make REST calls to fetch the locations data
        let terminals = await api.BanklessInfo();
        terminals = terminals.data;
        // eslint-disable-next-line no-console
        console.log("terminals: ", terminals);

        // check that atm is online
        let users = await api.Online();
        users = users.data;
        console.log("users: ", users);

        terminals.forEach((terminal: any) => {
          const isOnline = users.indexOf(terminal.terminalName) > -1;
          console.log(`${terminal.terminalName} isOnline: `, isOnline);
          // eslint-disable-next-line no-param-reassign
          terminal.isOnline = isOnline;
        });
        console.log("terminals: ", terminals);
        setLocations(terminals);
        // setLocations(locationsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const handleLPProvideClick = (terminalName: string) => {
    navigate(`/lp/${terminalName}`);
  };

  const getStatusIcon = (isOnline: any) => {
    return isOnline ? (
      <CheckCircleIcon color="green.500" />
    ) : (
      <CloseIcon color="red.500" />
    );
  };

  if (!api) {
    return <Spinner size="xl" />;
  }

  return (
    <Box textAlign="center">
      {/* <MapContainer */}
      {/*  {...({ center: [51.505, -0.09] } as any)} */}
      {/*  zoom={13} */}
      {/*  style={{ height: "400px", zIndex: 0 }} */}
      {/* > */}
      {/*  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      {/*  {locations.map((location: any) => ( */}
      {/*    <Marker position={location.location} key={location.terminalId}> */}
      {/*      <Popup>{location.terminalName}</Popup> */}
      {/*    </Marker> */}
      {/*  ))} */}
      {/* </MapContainer> */}
      <Stack spacing={4} marginTop={4}>
        {locations.map((terminal: any) => (
          <Box
            key={terminal.terminalName}
            borderWidth="1px"
            borderRadius="md"
            padding={4}
          >
            <Avatar size="md" bg={terminal.isOnline ? "green.100" : "red.100"}>
              {getStatusIcon(terminal.isOnline)}
            </Avatar>
            <Text fontWeight="bold">{terminal.terminalName}</Text>
            <Text>online: {terminal.isOnline.toString()}</Text>
            <Text>tradePair: {terminal.tradePair}</Text>
            <Text>Rate: {terminal.rate}</Text>
            <Text>atmAddress: {terminal.pubkey}</Text>
            <Text>usd: {terminal.TOTAL_CASH}</Text>
            <Text>dai: {terminal.TOTAL_DAI}</Text>
            <Button
              colorScheme="teal"
              mt={2}
              onClick={() => handleLPProvideClick(terminal.terminalName)}
            >
              LP Provide
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MapWithPins;
