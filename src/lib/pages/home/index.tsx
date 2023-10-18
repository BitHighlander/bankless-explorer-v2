import {
  Button,
  useDisclosure,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { usePioneer } from "@pioneer-sdk/pioneer-react";
import { useEffect, useState } from "react";

// import AssetSelect from "lib/components/AssetSelect";
// import OutputSelect from "lib/components/OutputSelect";
// import BlockchainSelect from "lib/components/BlockchainSelect";
import MapWithPins from "lib/components/Map";
// import Basic from "./components/Basic";
// import Balances from "./components/Balances";
// // import Pubkeys from "./components/Pubkeys";
// import Transfer from "./components/Transfer";
// import Swap from "./components/Swap";

const Home = () => {
  const { state } = usePioneer();
  const {
    // api,
    // app,
    // context,
    // assetContext,
    // blockchainContext,
    pubkeyContext,
    // modals,
  } = state;
  const [address, setAddress] = useState("");
  const [modalType] = useState("");
  const { isOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (pubkeyContext)
      setAddress(
        pubkeyContext?.master || pubkeyContext?.pubkey || pubkeyContext
      );
  }, [pubkeyContext]);

  // const openModal = (type: any) => {
  //   setModalType(type);
  //   onOpen();
  // };

  // const refresh = async () => {
  //   // TODO why do I need to press refresh?
  //   // console.log("2 pubkeyContext: ", pubkeyContext);
  //   // console.log("2 balances: ", app.balances);
  //   if (pubkeyContext)
  //     setAddress(
  //       pubkeyContext?.master || pubkeyContext?.pubkey || pubkeyContext
  //     );
  //   // console.log("pubkeyContext: ", pubkeyContext);
  // };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render content based on modalType */}
            {/* {modalType === "Select wallet" && ( */}
            {/*  <div> */}
            {/*    <WalletSelect onClose={onClose}></WalletSelect> */}
            {/*  </div> */}
            {/* )} */}
            {/* {modalType === "Select Asset" && ( */}
            {/*  <div> */}
            {/*    <AssetSelect onClose={onClose} onlyOwned={true}></AssetSelect> */}
            {/*  </div> */}
            {/* )} */}
            {/* {modalType === "Select Blockchain" && ( */}
            {/*  <div> */}
            {/*    <BlockchainSelect onClose={onClose}></BlockchainSelect> */}
            {/*  </div> */}
            {/* )} */}
            {/* {modalType === "View Address" && ( */}
            {/*  <div> */}
            {/*    {JSON.stringify(pubkeyContext)} address: {address} */}
            {/*  </div> */}
            {/* )} */}
            {/* {modalType === "Select Outbound" && ( */}
            {/*  <div> */}
            {/*    <OutputSelect onClose={onClose} onlyOwned={false}></OutputSelect> */}
            {/*  </div> */}
            {/* )} */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {address}
      <MapWithPins />
    </div>
  );
};

export default Home;
