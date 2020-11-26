import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import _ from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { createSubscription } from "../firebase/FirestoreMethods";
import useUser from "../hooks/useUser";
import {
  Subscription,
  SubscriptionRecurrence,
  SubscriptionType,
} from "../typeDefs";

const NewSubscriptionDrawer = () => {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors, setError } = useForm<Subscription>();
  const [loading, setLoading] = useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: Subscription) => {
    setLoading(true);
    try {
      await createSubscription(user.uid, data);
      setLoading(false);
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <IconButton
        p={5}
        m={5}
        aria-label="Add Subscription"
        icon={<FaPlus />}
        ref={btnRef}
        variant="solid"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DrawerCloseButton />
              <DrawerHeader>Add a new subscription</DrawerHeader>

              <DrawerBody>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Netlix"
                    ref={register}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.cost}>
                  <FormLabel htmlFor="cost">Cost</FormLabel>
                  <Input
                    name="cost"
                    type="number"
                    placeholder="79"
                    ref={register}
                  />
                  <FormErrorMessage>{errors.cost?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.recurring}>
                  <FormLabel htmlFor="recurring">Recurring</FormLabel>
                  <Select
                    name="recurring"
                    placeholder="-- Select payment frequency --"
                    ref={register}
                  >
                    {Object.keys(SubscriptionRecurrence).map((rec) => (
                      <option key={rec} value={rec.toLocaleLowerCase()}>
                        {_.startCase(_.toLower(rec))}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.recurring?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.type}>
                  <FormLabel htmlFor="type">Type</FormLabel>
                  <Select
                    name="type"
                    placeholder="-- Select type --"
                    ref={register}
                  >
                    {Object.keys(SubscriptionType).map((type) => (
                      <option key={type} value={type.toLocaleLowerCase()}>
                        {_.startCase(_.toLower(type))}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>
                    {errors.recurring?.message}
                  </FormErrorMessage>
                </FormControl>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button isLoading={loading} type="submit" color="blue">
                  Save
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default NewSubscriptionDrawer;
