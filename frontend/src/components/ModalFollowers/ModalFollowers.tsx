/* eslint-disable react-hooks/exhaustive-deps */
import "./ModalFollowers.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalProps, UserInterface } from "./interface";
import requestToApi from "../axios";
import { NavLink } from "react-router-dom";

const ModalFollowers: React.FC<ModalProps> = ({ mode, username, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<UserInterface[]>([]);
  useEffect(() => {
    const init = async () => {
      const response = await requestToApi
        .get(
          mode === "followers"
            ? `profile/${username}/followers/`
            : `profile/${username}/following/`
        )
        .catch((err) => err.response);

      if (response.data.success) {
        setUsers(response.data.users);
      }
    };

    if (isOpen) {
      init();
    }
  }, [isOpen]);
  return (
    <>
      <div
        style={{
          width: "fit-content",
          height: "fit-content",
        }}
        onClick={onOpen}
      >
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mode === "followers" ? "Obserwujący" : "Obserwuje"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users.map((user) => (
              <div className="user-card">
                <img src="https://picsum.photos/200" alt="zdjecie profilowe" />
                <div className="user-card-text">
                  <NavLink className="first_name" to={`/${user.username}`}>
                    {user.first_name}
                  </NavLink>
                  <p>{user.username}</p>
                </div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Zamknij
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalFollowers;
