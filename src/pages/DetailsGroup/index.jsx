import {
  Container,
  ContainerBody,
  ContainerTitle,
  ContainerButton,
  ContainerTitleNotParticipant,
  ContainerBodyNotParticipant,
} from "./styles";
import { useContext, useEffect, useState } from "react";
import { GroupsContext } from "../../providers/groups";
import { Redirect, useHistory, useParams } from "react-router-dom";
import CardGroups from "../../components/CardGroups";
import Button from "../../components/Button";
import ModalLeave from "../../components/ModalLeave";
import ModalEditGroup from "../../components/ModalEditGroup";
import { motion } from "framer-motion";
import HeaderInitial from "../../components/HeaderInitial";

const DetailsGroup = () => {
  const { id: groupId } = useParams();
  const [update, setUpdate] = useState(false);

  const [modalLeave, setModalLeave] = useState(false);
  const [modalEditGroup, setModalEditGroup] = useState(false);

  const history = useHistory();
  const {
    groupParticipants,
    getGroupAllParticipants,
    groupGoals,
    getGoalsGroup,
    groupActivities,
    getActivitiesGroup,
    isCreator,
    inscribeGroup,
    dataGroup,
    isParticipant,
    setIsCreator,
  } = useContext(GroupsContext);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("@Anima/authenticated"))) {
      return <Redirect to="/" />;
    }
    getGroupAllParticipants(groupId);
    getGoalsGroup(groupId);
    getActivitiesGroup(groupId);
  }, [update]);

  if (!JSON.parse(localStorage.getItem("@Anima/authenticated"))) {
    return <Redirect to="/" />;
  }

  const updateActivitiesGoals = () => {
    setUpdate(!update);
  };

  return isParticipant ? (
    <>
      <HeaderInitial />
      <motion.div
        initial={{ x: -900 }}
        animate={{ x: 0 }}
        exit={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <Container>
          {modalLeave && (
            <ModalLeave groupId={groupId} setModalLeave={setModalLeave} />
          )}
          {modalEditGroup && (
            <ModalEditGroup
              groupId={groupId}
              setModalEditGroup={setModalEditGroup}
              updateActivitiesGoals={updateActivitiesGoals}
            />
          )}

          <ContainerTitle>
            <h1>
              <div>
                {dataGroup.name}
                <p>Category: {dataGroup.category}</p>
              </div>
            </h1>
            <p>Description: {dataGroup.description}</p>
          </ContainerTitle>
          <ContainerBody>
            <CardGroups title="Participants" list={groupParticipants} />
            <CardGroups
              updateActivitiesGoals={updateActivitiesGoals}
              groupId={groupId}
              title="Goals"
              list={groupGoals}
            />
            <CardGroups
              updateActivitiesGoals={updateActivitiesGoals}
              groupId={groupId}
              title="Activities"
              list={groupActivities}
            />
            <ContainerButton>
              <Button
                onClick={() => {
                  setIsCreator(false);
                  history.push(
                    `/dashboard/${JSON.parse(
                      localStorage.getItem("@Anima/token")
                    )}`
                  );
                }}
              >
                Back
              </Button>
              {isCreator ? (
                <Button onClick={() => setModalEditGroup(true)}>Edit</Button>
              ) : (
                <Button onClick={() => setModalLeave(true)}>Leave</Button>
              )}
            </ContainerButton>
          </ContainerBody>
        </Container>
      </motion.div>
    </>
  ) : (
    <>
      <HeaderInitial />
      <motion.div
        initial={{ x: -900 }}
        animate={{ x: 0 }}
        exit={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <Container>
          <ContainerTitleNotParticipant>
            <h1>
              <div>
                {dataGroup.name}
                <p>Category: {dataGroup.category}</p>
              </div>
            </h1>
            <p>Description: {dataGroup.description}</p>
          </ContainerTitleNotParticipant>
          <ContainerBodyNotParticipant>
            <CardGroups title="Participants" list={groupParticipants} />
            <ContainerButton>
              <Button
                onClick={() => {
                  setIsCreator(false);
                  history.push(
                    `/dashboard/${JSON.parse(
                      localStorage.getItem("@Anima/token")
                    )}`
                  );
                }}
              >
                Back
              </Button>
              {isCreator ? (
                <Button onClick={() => setModalEditGroup(true)}>Edit</Button>
              ) : (
                <Button
                  onClick={() => {
                    inscribeGroup(groupId)
                      .then((_) => updateActivitiesGoals())
                      .catch((err) => console.log(err));
                  }}
                >
                  Join
                </Button>
              )}
            </ContainerButton>
          </ContainerBodyNotParticipant>
        </Container>
      </motion.div>
    </>
  );
};

export default DetailsGroup;
