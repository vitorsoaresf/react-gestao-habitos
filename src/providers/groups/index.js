import { createContext, useState } from "react";
import api from "../../services/api";
import jwt_decode from "jwt-decode";

export const GroupsContext = createContext();

export const GroupsProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("@Anima/token"));

  const [groups, setGroups] = useState([]);
  const getAllGroups = () => {
    api
      .get("/groups/")
      .then((response) => {
        setGroups(response.data.results);
      })
      .catch((err) => console.log(err));
  };

  const getGroupsUser = (token) => {
    api
      .get("/groups/subscriptions/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const [groupParticipants, setGroupParticipants] = useState([]);
  const [groupCreator, setGroupCreator] = useState([]);
  const [dataGroup, setSpecificGroup] = useState([]);

  const getGroupAllParticipants = (groupId) => {
    const { user_id } = jwt_decode(token);
    api
      .get(`/groups/${groupId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGroupParticipants(response.data.users_on_group);
        setSpecificGroup(response.data);

        if (user_id === response.data.creator.id) {
          setGroupCreator(response.data.creator);
        }
      })
      .catch((err) => console.log(err));
  };

  const [groupGoals, setGroupGoals] = useState([]);
  const getGoalsGroup = (groupId) => {
    api
      .get(`/goals/?group=${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setGroupGoals(response.data.results);
      })
      .catch((err) => console.log(err));
  };

  const createGoalsGroup = (groupId, data) => {
    console.log("provider", data);
    api
      .post(`/goals/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));

    getGoalsGroup(groupId);
  };

  const updateGoalsGroup = (goalId, data) => {
    api
      .patch(`/goals/${goalId}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const deleteGoalsGroup = (goalId) => {
    api
      .delete(`/goals/${goalId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const [groupActivities, setGroupActivities] = useState([]);
  const getActivitiesGroup = (groupId) => {
    api
      .get(`/activities/?group=${groupId}`)
      .then((response) => {
        setGroupActivities(response.data.results);
      })
      .catch((err) => console.log(err));
  };

  const createActivitiesGroup = (groupId, data) => {
    api
      .post(`/activities/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));

    getActivitiesGroup(groupId);
  };

  const updateActivitiesGroup = (activitiesId, data) => {
    api
      .patch(`/activities/${activitiesId}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const deleteActivitiesGroup = (activitiesId) => {
    api
      .delete(`/activities/${activitiesId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  const createGroup = (token, data) => {
    api
      .post("/groups/", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const updateGroup = (groupId, data) => {
    console.log(data);
    api
      .patch(`/groups/${groupId}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const inscribeGroup = (token, groupId) => {
    api
      .post(`/groups/${groupId}/subscribe/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const unsubscribeGroup = (groupId) => {
    api
      .delete(`/groups/${groupId}/unsubscribe/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <GroupsContext.Provider
      value={{
        groups,
        groupParticipants,
        groupGoals,
        groupActivities,
        groupCreator,
        dataGroup,
        getAllGroups,
        getGroupsUser,
        getGroupAllParticipants,
        getGoalsGroup,
        createGoalsGroup,
        updateGoalsGroup,
        deleteGoalsGroup,
        getActivitiesGroup,
        createActivitiesGroup,
        updateActivitiesGroup,
        deleteActivitiesGroup,
        createGroup,
        updateGroup,
        inscribeGroup,
        unsubscribeGroup,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};
