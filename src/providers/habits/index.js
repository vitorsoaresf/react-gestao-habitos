import { createContext, useState } from "react";
import api from "../../services/api";
import jwt_decode from "jwt-decode";
export const HabitsContext = createContext();
export const HabitsProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("@Anima/token"));

  const createHabit = (data) => {
    const { user_id } = jwt_decode(token);
    data.user = user_id;
    api
      .post("/habits/", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        getHabits(token);
      })
      .catch((err) => console.log(err));
  };

  const [allHabits, setAllHabits] = useState([]);

  const getHabits = (token) => {
    api
      .get("/habits/personal/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAllHabits(response.data);
      })
      .catch((err) => console.log(err));
  };

  const updateHabit = (data, habitId) => {
    api
      .patch(`/habits/${habitId}/`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      //Adicionar toast no .then
      .then((response) => {
        console.log(response);
        getHabits(token);
      })
      .catch((err) => console.log(err));
  };

  const deleteHabit = (habitId) => {
    api
      .delete(`/habits/${habitId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((_) => {
        getHabits(token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <HabitsContext.Provider
      value={{
        allHabits,
        createHabit,
        getHabits,
        updateHabit,
        deleteHabit,
        setAllHabits,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
};
